import React from 'react';
import { ExternalLink, Copy, Check, Info, Star, Sparkles } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export function BrokerCard({ broker, onOpenDetails, onCopyCode, copiedCode }) {
  const { triggerHaptic, openLink } = useTelegram();

  const isCopied = copiedCode === broker.offer?.code;

  return (
    <article 
      className="broker-card"
      style={{
        borderColor: `${broker.accentColor}40`,
      }}
    >
      {/* Accent top stripe */}
      <div 
        className="broker-top-stripe" 
        style={{
          background: `linear-gradient(90deg, transparent, ${broker.accentColor}, transparent)`
        }}
      />

      <div className="broker-card-inner">
        <div className="broker-grid-responsive">
          
          {/* Column 1: Logo, Badges & Intro */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Logo Container */}
            <div 
              className="broker-logo-box" 
              style={{ background: broker.logoBg || '#000000' }}
            >
              <img 
                src={broker.logo} 
                alt={`${broker.name} Logo`} 
                loading="lazy"
              />
            </div>

            {/* Badge & Rating */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span 
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${broker.accentColor}`,
                    color: broker.accentColor,
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {broker.badge}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontWeight: 800 }}>
                  <Star size={13} fill="currentColor" />
                  <span>{broker.rating}</span>
                </span>
                <span>•</span>
                <span>{broker.tradersCount}</span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {broker.description}
            </p>
          </div>

          {/* Column 2: 6 Specs Chips & Special Offer */}
          <div className="broker-center-col" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* 6 Specs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {broker.specs.map((spec, sIdx) => (
                <div key={sIdx} className="spec-chip">
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    {spec.label}
                  </div>
                  <div 
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: 800, 
                      color: spec.highlight ? 'var(--accent)' : 'var(--text-primary)',
                      fontFamily: spec.label.includes('الحد الأدنى') || spec.label.includes('رافعة') ? 'var(--font-mono)' : 'inherit'
                    }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Exclusive Member Offer Banner */}
            {broker.offer && (
              <div className="promo-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <div 
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'var(--accent-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0
                    }}
                  >
                    <Sparkles size={16} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', marginBottom: '2px' }}>
                      {broker.offer.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.4 }}>
                      {broker.offer.text}
                    </div>
                  </div>
                </div>

                {broker.offer.code && (
                  <button
                    type="button"
                    className="coupon-copy-btn"
                    onClick={() => {
                      triggerHaptic('success');
                      onCopyCode(broker.offer.code, broker.name);
                    }}
                    title="نسخ كود الشريك / الخصم"
                  >
                    {isCopied ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                    <span>{broker.offer.code}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Column 3: Action Buttons & Detail Trigger */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* Primary Action Button */}
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                triggerHaptic('medium');
                openLink(broker.links.real);
              }}
              style={{
                height: '46px',
                fontSize: '13.5px',
                fontWeight: 800,
                width: '100%',
              }}
            >
              <span>افتح حسابك في {broker.name}</span>
              <ExternalLink size={15} />
            </button>

            {/* Details trigger button */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                onOpenDetails(broker);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px',
                marginTop: '4px',
                transition: 'color 0.15s ease',
              }}
            >
              <Info size={14} />
              <span>عرض كافة المميزات والشروط</span>
            </button>
          </div>

        </div>
      </div>
    </article>
  );
}
