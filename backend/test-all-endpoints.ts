import { NestFactory } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { AppModule } from './src/app.module';
import { AllExceptionsFilter } from './src/common/filters/http-exception.filter';
import { TransformInterceptor } from './src/common/interceptors/transform.interceptor';
import { runSeed } from './src/seeds/seed-brokers';
import axios, { AxiosInstance } from 'axios';

interface TestResult {
  endpoint: string;
  method: string;
  status: number;
  expectedStatus: number;
  passed: boolean;
  notes?: string;
  responseSnippet?: string;
}

const results: TestResult[] = [];

async function runTestSuite() {
  process.env.DB_TYPE = 'sqlite';
  process.env.DB_NAME = 'brokers_dev.sqlite';
  process.env.PORT = '3333';

  // 1. Ensure database is seeded with all 7 certified brokers
  console.log('🌱 Ensuring database is seeded with 7 certified brokers...');
  await runSeed();

  console.log('\n🚀 Booting NestJS Application for E2E Endpoint Testing on port 3333...');

  let app: INestApplication;
  try {
    app = await NestFactory.create(AppModule, { logger: false });
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.listen(3333);
    console.log('✅ App successfully listening on http://localhost:3333/api\n');
  } catch (err) {
    console.error('❌ Failed to start test server:', err);
    process.exit(1);
  }

  const client: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3333/api',
    timeout: 10000,
    validateStatus: () => true, // Don't throw on non-2xx so we can test error handling too
  });

  async function testEndpoint(
    name: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    expectedStatus: number,
    data?: any,
  ): Promise<any> {
    const res = await client.request({ method, url, data });
    const passed = res.status === expectedStatus;
    const resStr = JSON.stringify(res.data);
    const snippet = resStr.length > 90 ? resStr.slice(0, 90) + '...' : resStr;

    results.push({
      endpoint: url,
      method,
      status: res.status,
      expectedStatus,
      passed,
      notes: name,
      responseSnippet: snippet,
    });

    const statusBadge = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${statusBadge} [${method}] ${url} -> ${res.status} (${name})`);
    return res.data;
  }

  console.log('====================================================');
  console.log('1. TESTING PUBLIC BROKER ENDPOINTS');
  console.log('====================================================');

  // 1.1 List all brokers
  await testEndpoint(
    'Get all active brokers (default Arabic)',
    'GET',
    '/brokers',
    200,
  );

  // 1.2 Filter by category
  await testEndpoint(
    'Filter brokers by category=forex',
    'GET',
    '/brokers?category=forex',
    200,
  );

  // 1.3 Filter by category + English language
  await testEndpoint(
    'Filter brokers by category=prop & lang=en',
    'GET',
    '/brokers?category=prop&lang=en',
    200,
  );

  // 1.4 Get single broker by slug
  await testEndpoint(
    'Get broker details by slug (xm) in Arabic',
    'GET',
    '/brokers/xm?lang=ar',
    200,
  );

  await testEndpoint(
    'Get broker details by slug (xm) in English',
    'GET',
    '/brokers/xm?lang=en',
    200,
  );

  // 1.5 Non-existent broker
  await testEndpoint(
    'Request non-existent broker slug (404 expected)',
    'GET',
    '/brokers/non-existent-broker-999',
    404,
  );

  console.log('\n====================================================');
  console.log('2. TESTING VIP VERIFICATION & AGENCY CHECK ENDPOINTS');
  console.log('====================================================');

  // 2.1 Submit VIP request
  const testAccountNum = '88992244';
  const vipSubmitRes = await testEndpoint(
    'Submit VIP activation request (triggers automated Agency Check)',
    'POST',
    '/vip/verify-request',
    201,
    {
      brokerIdOrSlug: 'xm',
      accountNumber: testAccountNum,
      telegramUsername: '@test_trader',
      reviewNote: 'Automated test suite submission',
    },
  );

  const createdVipId = vipSubmitRes?.data?.request?.id;
  console.log(`   ℹ️ Created VIP Request ID: ${createdVipId}`);
  console.log(`   ℹ️ Agency Check Status: ${vipSubmitRes?.data?.verification?.status}`);
  console.log(`   ℹ️ Agency Check Message: ${vipSubmitRes?.data?.verification?.message}`);

  // 2.2 Query status by account number
  await testEndpoint(
    'Check VIP status by account number',
    'GET',
    `/vip/status/${testAccountNum}`,
    200,
  );

  console.log('\n====================================================');
  console.log('3. TESTING ADMIN PANEL & AGENCY CHECKER ENDPOINTS');
  console.log('====================================================');

  // 3.1 Admin stats
  await testEndpoint(
    'Get dashboard statistics',
    'GET',
    '/admin/stats',
    200,
  );

  // 3.2 Admin list brokers (with partner API details)
  await testEndpoint(
    'List brokers with partner dashboard URLs & API settings',
    'GET',
    '/admin/brokers',
    200,
  );

  // 3.3 Create new broker with partner API credentials
  const newBrokerRes = await testEndpoint(
    'Admin creates new broker with partner API & dashboard URLs',
    'POST',
    '/admin/brokers',
    201,
    {
      slug: 'test-broker-alpha',
      name: 'Alpha Markets Pro',
      badgeAr: 'مرخص رسمياً • سبريد خام',
      badgeEn: 'Tier-1 Regulated • Raw Spread',
      category: 'forex',
      categoryNameAr: 'وسطاء الفوركس',
      categoryNameEn: 'Forex Brokers',
      logo: 'https://example.com/alpha-logo.png',
      logoBg: '#111827',
      accentColor: '#10B981',
      rating: 4.88,
      tradersCountAr: '50K+ متداول',
      tradersCountEn: '50K+ Traders',
      descriptionAr: 'وسيط مالي معتمد يقدم رافعة 1:500 وسحب فوري.',
      descriptionEn: 'Certified broker with 1:500 leverage and instant payouts.',
      affiliateRealLink: 'https://alpha.example.com/register?ref=fxengin',
      affiliateDemoLink: 'https://alpha.example.com/demo',
      partnerDashboardUrl: 'https://partners.alpha.example.com/dashboard',
      partnerApiUrl: 'https://api.alpha.example.com/v1/mock/accounts/verify',
      partnerApiKey: 'test_secret_key_alpha_9988',
      partnerIbCode: 'FXENGIN_ALPHA',
      verificationMethod: 'API_AUTO',
      isActive: true,
      sortOrder: 10,
    },
  );

  const createdBrokerId = newBrokerRes?.data?.id;
  console.log(`   ℹ️ Created Test Broker ID: ${createdBrokerId}`);

  // 3.4 Test connection to broker partner API
  if (createdBrokerId) {
    await testEndpoint(
      'Test broker partner API connectivity & agency check function',
      'POST',
      `/admin/brokers/${createdBrokerId}/test-partner-api?testAccount=882200`,
      201,
    );

    // 3.5 Update broker partner credentials
    await testEndpoint(
      'Admin updates broker partner settings',
      'PUT',
      `/admin/brokers/${createdBrokerId}`,
      200,
      {
        partnerIbCode: 'FXENGIN_ALPHA_VIP',
        rating: 4.95,
      },
    );
  }

  // 3.6 Admin list VIP requests
  await testEndpoint(
    'Admin lists all VIP requests',
    'GET',
    '/admin/vip-requests',
    200,
  );

  // 3.7 Admin get single VIP request by ID
  if (createdVipId) {
    await testEndpoint(
      'Admin fetches single VIP request with agency verification logs',
      'GET',
      `/admin/vip-requests/${createdVipId}`,
      200,
    );

    // 3.8 Admin triggers agency recheck
    await testEndpoint(
      'Admin triggers automatic agency recheck',
      'POST',
      `/admin/vip-requests/${createdVipId}/recheck`,
      201,
    );

    // 3.9 Admin updates status (manual approve)
    await testEndpoint(
      'Admin manually approves VIP request',
      'PATCH',
      `/admin/vip-requests/${createdVipId}/status`,
      200,
      {
        status: 'APPROVED',
        reviewedBy: 'Admin Gamal',
        reviewNote: 'Verified successfully in test suite',
      },
    );
  }

  // 3.10 Admin deletes the test broker
  if (createdBrokerId) {
    await testEndpoint(
      'Admin deletes temporary test broker',
      'DELETE',
      `/admin/brokers/${createdBrokerId}`,
      200,
    );
  }

  console.log('\n====================================================');
  console.log('TEST SUMMARY REPORT');
  console.log('====================================================');

  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log(`Total Endpoints Tested: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Success Rate: ${Math.round((passed / total) * 100)}%\n`);

  if (failed > 0) {
    console.error('❌ Some endpoint tests failed:');
    results.filter((r) => !r.passed).forEach((r) => {
      console.error(`  - [${r.method}] ${r.endpoint}: got ${r.status}, expected ${r.expectedStatus}`);
    });
  } else {
    console.log('🎉 ALL ENDPOINTS TESTED AND WORKING 100% PERFECTLY!');
  }

  await app.close();
  process.exit(failed > 0 ? 1 : 0);
}

runTestSuite().catch((err) => {
  console.error('Fatal error during test suite:', err);
  process.exit(1);
});
