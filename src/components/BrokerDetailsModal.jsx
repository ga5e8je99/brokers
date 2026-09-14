import React, { useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, ExternalLink, Copy, Check } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export function BrokerDetailsModal({ broker, onClose, onCopyCode, copiedCode }) {
  const { tg, triggerHaptic, openLink } = useTelegram();

  // Telegram BackButton integration
  useEffect(() => {
    if (tg?.BackButton) {
      tg.BackButton.show();
      const handleBack = () => {
        triggerHaptic('light');
        onClose();
      };
      tg.BackButton.onClick(handleBack);

      return () => {
        tg.BackButton.offClick(handleBack);
        tg.BackButton.hide();
      };
    }
  }, [tg, onClose, triggerHaptic]);

  if (!broker) return null;

  const isCopied = copiedCode === broker.offer?.code;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-sheet" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Drag Handle */}
        <div className="modal-sheet-handle" />

        {/* Modal Header */}
        <div 
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            background: 'var(--surface-elevated)',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: broker.logoBg || '#000',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border)'
              }}
            >
              <img 
                src={broker.logo} 
                alt={broker.name} 
                style={{ maxWidth: '100%', maxHeight: '34px', objectFit: 'contain' }} 
              />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {broker.name}
              </h3>
              <div style={{ fontSize: '11px', color: broker.accentColor, fontWeight: 700 }}>
                {broker.badge}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: 'var(--text-primary)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="إغلاق"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Overview Intro */}
          {broker.details?.intro && (
            <div 
              style={{
                background: 'rgba(4, 136, 248, 0.08)',
                border: '1px solid rgba(4, 136, 248, 0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '13px',
                color: 'var(--text-primary)',
                lineHeight: 1.6
              }}
            >
              {broker.details.intro}
            </div>
          )}

          {/* Key Features List */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
              <span>المميزات والشروط الرئيسية</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {broker.details?.features?.map((feat, fIdx) => (
                <div 
                  key={fIdx} 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: 'rgba(1, 7, 30, 0.45)',
                    border: '1px solid rgba(18, 49, 92, 0.4)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ lineHeight: 1.5 }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          {broker.details?.paymentMethods && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={16} style={{ color: 'var(--primary)' }} />
                <span>طرق الإيداع والسحب المدعومة</span>
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {broker.details.paymentMethods.map((method, mIdx) => (
                  <span 
                    key={mIdx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Leverage Info */}
          {broker.details?.leverageInfo && (
            <div 
              style={{
                background: 'rgba(251, 135, 4, 0.08)',
                border: '1px solid rgba(251, 135, 4, 0.25)',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '12.5px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)'
              }}
            >
              <strong style={{ color: 'var(--accent)' }}>تفاصيل الرافعة والهامش: </strong>
              {broker.details.leverageInfo}
            </div>
          )}

          {/* Partner Code Box */}
          {broker.offer?.code && (
            <div className="promo-banner">
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)' }}>
                  كود الشريك الحصري
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  أدخل الكود للحصول على البونص والمزايا:
                </div>
              </div>
              <button
                type="button"
                className="coupon-copy-btn"
                onClick={() => {
                  triggerHaptic('success');
                  onCopyCode(broker.offer.code, broker.name);
                }}
              >
                {isCopied ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                <span>{broker.offer.code}</span>
              </button>
            </div>
          )}

          {/* Modal Action CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                triggerHaptic('medium');
                openLink(broker.links.real);
              }}
              style={{ height: '46px', fontSize: '14px', fontWeight: 800 }}
            >
              <span>افتح حسابك الآن في {broker.name}</span>
              <ExternalLink size={16} />
            </button>

            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
            >
              إغلاق
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
