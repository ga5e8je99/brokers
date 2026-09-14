import React from 'react';
import { Sparkles, DollarSign, Headphones, Cpu } from 'lucide-react';

export function WhyFxenginSection() {
  const benefits = [
    {
      icon: <Sparkles size={22} style={{ color: 'var(--accent)' }} />,
      title: 'إشارات VIP وكورسات مجانية',
      description: 'بمجرد توثيق حسابك وإيداع أول مبلغ، تحصل على وصول دائم لمجتمع توصيات الفوركس والذهب وقسم الأكاديمية كاملاً.',
      tag: 'وصول مجاني مدى الحياة',
    },
    {
      icon: <DollarSign size={22} style={{ color: 'var(--success)' }} />,
      title: 'استرداد عمولات وكاش باك (Rebates)',
      description: 'وفر في كل لوت تتداوله بفضل خصومات السبريد الحصرية واسترداد جزء من العمولات مباشرة إلى محفظتك.',
      tag: 'أعلى نسبة استرداد',
    },
    {
      icon: <Headphones size={22} style={{ color: 'var(--primary)' }} />,
      title: 'حماية ودعم فني مخصص',
      description: 'فريق FXENGIN يتدخل لمساعدتك مباشرة وتسريع إجراءات التحقق من الوثائق، وتسهيل عمليات الإيداع والسحب.',
      tag: 'دعم مباشر 24/7',
    },
    {
      icon: <Cpu size={22} style={{ color: '#A855F7' }} />,
      title: 'أدوات تحليل وخوارزميات مجانية',
      description: 'استمتع بمؤشرات الذكاء الاصطناعي الحصرية الخاصة بنا ومحدد مناطق السيولة الذكية (SMC) مجاناً.',
      tag: 'خوارزميات SMC الذكية',
    },
  ];

  return (
    <section style={{ margin: '48px 0' }} aria-label="لماذا تختار شراكة FXENGIN">
      <div 
        style={{
          background: 'var(--surface)',
          borderRadius: '20px',
          border: '1px solid var(--border)',
          padding: '32px 20px',
          boxShadow: '0 16px 40px rgba(0, 3, 13, 0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glow backdrop */}
        <div 
          aria-hidden="true" 
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            height: '200px',
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(4, 136, 248, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px', position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 800, marginBottom: '6px', letterSpacing: '0.4px' }}>
            مزايا حصرية لا تجدها في مكان آخر
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 10px 0', lineHeight: 1.3 }}>
            لماذا تفتح حساب تداولك عبر <span className="text-gradient-brand">شراكة FXENGIN</span>؟
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            شراكتنا المباشرة تضمن لك أفضل ظروف التداول دون أي تكلفة إضافية، مع باقة دعم وتوصيات تعليمية متقدمة.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            position: 'relative',
            zIndex: 1
          }}
        >
          {benefits.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(1, 7, 30, 0.65)',
                border: '1px solid rgba(18, 49, 92, 0.65)',
                borderRadius: '16px',
                padding: '20px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </div>
                <span 
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: 'var(--accent)',
                    background: 'rgba(251, 135, 4, 0.1)',
                    border: '1px solid rgba(251, 135, 4, 0.25)',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
