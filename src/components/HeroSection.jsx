import React from 'react';
import { ShieldCheck, Zap, Award, Sparkles } from 'lucide-react';
import { BrokerFilterTabs } from './BrokerFilterTabs';

export function HeroSection({ activeFilter, onFilterChange, counts }) {
  const highlights = [
    { label: 'وسطاء مرخصون عالمياً', value: 'تراخيص فئة أولى Tier-1', icon: <ShieldCheck size={14} style={{ color: 'var(--accent)' }} /> },
    { label: 'سبريد خام بنكي', value: 'يبدأ من 0.0 نقطة', icon: <Zap size={14} style={{ color: 'var(--primary)' }} /> },
    { label: 'بونص وإشارات مجانية', value: 'حتى 100% فور الإيداع', icon: <Sparkles size={14} style={{ color: 'var(--warning)' }} /> },
    { label: 'حسابات إسلامية', value: 'خالية من التبييت 100%', icon: <Award size={14} style={{ color: 'var(--success)' }} /> },
  ];

  return (
    <section style={{ textAlign: 'center', margin: '28px 0 36px', position: 'relative' }} aria-label="مقدمة الشركاء الرسميون">
      
      {/* Background Ambient Glows */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 100%)',
          height: '340px',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(4, 136, 248, 0.16) 0%, rgba(251, 135, 4, 0.08) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '840px', margin: '0 auto' }}>
        
        {/* Top Trust Badge */}
        <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
          <span 
            style={{
              background: 'rgba(4, 136, 248, 0.12)',
              color: 'var(--primary)',
              border: '1px solid rgba(4, 136, 248, 0.3)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.4px',
              boxShadow: '0 4px 14px rgba(4, 136, 248, 0.15)'
            }}
          >
            <ShieldCheck size={15} style={{ color: 'var(--accent)' }} />
            <span>شركاء التداول الرسميون المعتمدون لـ FXENGIN</span>
          </span>
        </div>

        {/* Main H1 Title */}
        <h1 
          style={{
            fontSize: 'clamp(24px, 5vw, 42px)',
            fontWeight: 900,
            lineHeight: 1.25,
            margin: '0 0 16px 0',
            color: 'var(--text-primary)'
          }}
        >
          افتح حساب تداولك مع{' '}
          <span className="text-gradient-brand">أقوى الوسطاء الموثوقين</span>
        </h1>

        {/* Subtitle Description */}
        <p 
          style={{
            fontSize: 'clamp(13.5px, 1.8vw, 15.5px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            margin: '0 auto 24px',
            maxWidth: '720px'
          }}
        >
          اختر الوسيط أو شركة التمويل الأنسب لخطتك الاستثمارية. احصل على أفضل شروط تداول، سبريد خام 0.0، وسحب فوري، بالإضافة إلى مزايا وعروض كاش باك حصرية عند فتح حسابك من خلال روابط شراكة FXENGIN.
        </p>

        {/* Key Highlights Metrics */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '10px',
            marginBottom: '28px',
            maxWidth: '780px',
            marginInline: 'auto'
          }}
        >
          {highlights.map((h, i) => (
            <div 
              key={i}
              style={{
                background: 'rgba(6, 20, 47, 0.65)',
                border: '1px solid rgba(18, 49, 92, 0.6)',
                borderRadius: '12px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'right'
              }}
            >
              <div 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {h.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{h.label}</div>
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {h.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <BrokerFilterTabs 
          activeFilter={activeFilter} 
          onFilterChange={onFilterChange} 
          counts={counts} 
        />

      </div>
    </section>
  );
}
