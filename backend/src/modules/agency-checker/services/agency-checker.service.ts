import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Broker } from '../../brokers/entities/broker.entity';
import { VipRequestStatus } from '../../vip-requests/entities/vip-request.entity';

export interface AgencyVerificationResult {
  isUnderAgency: boolean;
  status: VipRequestStatus;
  accountNumber: string;
  brokerId: string;
  brokerName: string;
  partnerIbCode?: string;
  partnerDashboardUrl?: string;
  depositAmount?: number;
  accountCurrency?: string;
  details: Record<string, any>;
  message: string;
  checkedAt: string;
}

@Injectable()
export class AgencyCheckerService {
  private readonly logger = new Logger(AgencyCheckerService.name);

  constructor(private readonly httpService: HttpService) {}

  /**
   * Core verification function:
   * Checks whether the given trading account is registered under our IB / Agency
   */
  async checkAccountUnderAgency(
    broker: Broker,
    accountNumber: string,
  ): Promise<AgencyVerificationResult> {
    const checkedAt = new Date().toISOString();
    const cleanAccount = accountNumber.trim();

    this.logger.log(
      `Checking agency registration for broker ${broker.name} (${broker.slug}), Account: ${cleanAccount}`,
    );

    // Case 1: Partner API URL is not configured -> Requires manual check via Partner Dashboard
    if (!broker.partnerApiUrl) {
      return {
        isUnderAgency: false,
        status: VipRequestStatus.PENDING,
        accountNumber: cleanAccount,
        brokerId: broker.id,
        brokerName: broker.name,
        partnerIbCode: broker.partnerIbCode,
        partnerDashboardUrl: broker.partnerDashboardUrl,
        details: {
          reason: 'NO_PARTNER_API_CONFIGURED',
          notice:
            'Partner API URL is not configured for this broker. Please verify manually via partner dashboard.',
          partnerDashboardUrl: broker.partnerDashboardUrl,
        },
        message: broker.partnerDashboardUrl
          ? `يرجى مراجعة الحساب يدوياً من خلال لوحة الشريك: ${broker.partnerDashboardUrl}`
          : 'يتطلب هذا الوسيط مراجعة يدوية من قبل إدارة FXENGIN.',
        checkedAt,
      };
    }

    // Case 2: Verification via Partner API
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      if (broker.partnerApiKey) {
        headers['Authorization'] = `Bearer ${broker.partnerApiKey}`;
        headers['X-API-KEY'] = broker.partnerApiKey;
      }

      // Check if testing/mock URL or real API or dev sandbox enabled
      if (
        broker.partnerApiUrl.includes('mock') ||
        broker.partnerApiUrl.includes('test') ||
        process.env.AGENCY_CHECK_SANDBOX === 'true'
      ) {
        return this.handleMockCheck(broker, cleanAccount, checkedAt);
      }

      // Format payload based on broker requirements
      const requestConfig = {
        headers,
        timeout: 10000,
        params: {
          account: cleanAccount,
          account_id: cleanAccount,
          ib_code: broker.partnerIbCode,
        },
      };

      const response = await firstValueFrom(
        this.httpService.get(broker.partnerApiUrl, requestConfig),
      );

      const data = response.data;
      const isUnderAgency = this.evaluateApiResponse(data, broker.partnerIbCode);

      return {
        isUnderAgency,
        status: isUnderAgency
          ? VipRequestStatus.VERIFIED_UNDER_AGENCY
          : VipRequestStatus.NOT_UNDER_AGENCY,
        accountNumber: cleanAccount,
        brokerId: broker.id,
        brokerName: broker.name,
        partnerIbCode: broker.partnerIbCode,
        partnerDashboardUrl: broker.partnerDashboardUrl,
        depositAmount: data?.deposit_amount || data?.balance,
        accountCurrency: data?.currency || 'USD',
        details: {
          apiStatus: response.status,
          apiResponse: data,
        },
        message: isUnderAgency
          ? 'تم التحقق بنجاح: الحساب مسجل تحت وكالة FXENGIN.'
          : 'تنبيه: الحساب غير مسجل تحت كود الوكالة الخاص بنا لدى الوسيط.',
        checkedAt,
      };
    } catch (error: any) {
      this.logger.error(
        `Error querying broker partner API for ${broker.name}: ${error.message}`,
        error.stack,
      );

      return {
        isUnderAgency: false,
        status: VipRequestStatus.PENDING,
        accountNumber: cleanAccount,
        brokerId: broker.id,
        brokerName: broker.name,
        partnerIbCode: broker.partnerIbCode,
        partnerDashboardUrl: broker.partnerDashboardUrl,
        details: {
          error: error.message,
          rawResponse: error.response?.data,
          fallbackReason: 'API_REQUEST_FAILED',
        },
        message:
          'تعذر الاتصال بـ API الوسيط آلياً. تم تحويل الطلب للمراجعة اليدوية من لوحة الشريك.',
        checkedAt,
      };
    }
  }

  /**
   * Inspects diverse API response structures to confirm if client is under this IB
   */
  private evaluateApiResponse(data: any, expectedIbCode?: string): boolean {
    if (!data) return false;

    // Direct boolean field
    if (typeof data.is_under_agency === 'boolean') return data.is_under_agency;
    if (typeof data.is_referral === 'boolean') return data.is_referral;
    if (typeof data.under_ib === 'boolean') return data.under_ib;

    // Match IB code
    if (expectedIbCode) {
      const responseIb =
        data.ib_code || data.agent_id || data.partner_code || data.ib;
      if (
        responseIb &&
        String(responseIb).toLowerCase() === expectedIbCode.toLowerCase()
      ) {
        return true;
      }
    }

    // Success code or found status
    if (data.status === 'ACTIVE' || data.status === 'SUCCESS') return true;
    if (data.found === true) return true;

    return false;
  }

  /**
   * Sandbox / Mock verification handler for development and testing
   */
  private handleMockCheck(
    broker: Broker,
    accountNumber: string,
    checkedAt: string,
  ): AgencyVerificationResult {
    // Accounts ending with even digit simulated as verified, odd as pending/not found
    const lastDigit = parseInt(accountNumber.slice(-1), 10);
    const isUnderAgency = !isNaN(lastDigit) ? lastDigit % 2 === 0 : true;

    return {
      isUnderAgency,
      status: isUnderAgency
        ? VipRequestStatus.VERIFIED_UNDER_AGENCY
        : VipRequestStatus.NOT_UNDER_AGENCY,
      accountNumber,
      brokerId: broker.id,
      brokerName: broker.name,
      partnerIbCode: broker.partnerIbCode,
      partnerDashboardUrl: broker.partnerDashboardUrl,
      depositAmount: isUnderAgency ? 500 : 0,
      accountCurrency: 'USD',
      details: {
        mode: 'SANDBOX_MOCK',
        simulated: true,
      },
      message: isUnderAgency
        ? '[تجريبي] تم تأكيد الحساب تحت الوكالة بنجاح.'
        : '[تجريبي] الحساب غير مسجل تحت الوكالة.',
      checkedAt,
    };
  }
}
