import React from 'react';
import { Send, UserCheck, Shield, Award, ChevronLeft } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export function StepsSection({ onOpenVerify }) {
  const { triggerHaptic, openTelegramLink } = useTelegram();

  const steps = [
    {
      num: '01',
      title: 'اختر الوسيط وافتح حسابك',
      text: 'اضغط على زر "افتح حسابك" الخاص بأي من الشركاء المعتمدين (XM، MultiBank، HFM، YWO، Doo Prime، INGOT Brokers، أو PropXP) للتسجيل عبر رابط الشراكة المباشر.',
      icon: <UserCheck size={20} style={{ color: 'var(--primary)' }} />,
    },
    {
      num: '02',
      title: 'وثّق الحساب وقم بالإيداع',
      text: 'أكمل توثيق هويتك (KYC) السريع وقم بإيداع المبلغ الذي يناسبك، أو اختر حجم باقة التمويل المناسبة لك في PropXP.',
      icon: <Shield size={20} style={{ color: 'var(--accent)' }} />,
    },
    {
      num: '03',
      title: 'فعّل مزايا VIP في FXENGIN',
      text: 'أرسل رقم حساب التداول الخاص بك عبر نموذج التفعيل أو للدعم الفني، ليتم تفعيل اشتراكك في إشارات VIP وكورساتنا فوراً.',
      icon: <Award size={20} style={{ color: 'var(--success)' }} />,
    },
  ];

  return (
    <section style={{ margin: '48px 0 60px' }} aria-label="خطوات البدء">
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px' }}>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
          كيف تبدأ في <span className="text-gradient-accent">3 خطوات بسيطة</span>؟
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
          خطوات سهلة وسريعة لربط حسابك والحصول على كافة هدايا وباقات مجتمع FXENGIN
        </p>
      </div>

      {/* 3 Step Cards */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '18px',
          marginBottom: '32px'
        }}
      >
        {steps.map((step) => (
          <div
            key={step.num}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '18px',
              padding: '24px 20px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Step Number Backdrop */}
            <div 
              aria-hidden="true" 
              style={{
                position: 'absolute',
                top: '10px',
                insetInlineEnd: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '44px',
                fontWeight: 900,
                color: 'rgba(255, 255, 255, 0.04)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            >
              {step.num}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {step.icon}
              </div>
              <span 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: 'var(--accent)'
                }}
              >
                خطوة {step.num}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Support & VIP Activation Action Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(6, 20, 47, 0.95) 0%, rgba(18, 49, 92, 0.4) 100%)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            هل فتحت حسابك بالفعل وتريد تفعيل مزايا VIP؟
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            أرسل رقم حسابك واسم الوسيط وسيتم تفعيل حسابك بقناة التوصيات فوراً.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              triggerHaptic('medium');
              onOpenVerify();
            }}
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            <span>تأكيد رقم الحساب وتفعيل VIP</span>
            <ChevronLeft size={14} />
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              triggerHaptic('light');
              openTelegramLink('https://t.me/FXenginsignals');
            }}
            style={{ fontSize: '12.5px' }}
          >
            <Send size={14} />
            <span>تواصل مع الدعم الفني</span>
          </button>
        </div>
      </div>
    </section>
  );
}
