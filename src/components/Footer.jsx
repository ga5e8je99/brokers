import React from 'react';

export function Footer() {
  return (
    <footer 
      style={{
        borderTop: '1px solid var(--border)',
        background: 'rgba(0, 3, 13, 0.95)',
        padding: '36px 16px 48px',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Brand & Social row */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src="/assets/images/logo.png" 
              alt="FXENGIN Logo" 
              style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
            />
            <div>
              <div className="font-latin text-gradient-accent" style={{ fontWeight: 900, fontSize: '15px' }}>
                FXENGIN
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                منصة الفوركس والتعليم المالي العالمية
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div 
          style={{
            textAlign: 'center',
            fontSize: '11px',
            color: 'var(--text-muted)',
            borderTop: '1px solid rgba(18, 49, 92, 0.3)',
            paddingTop: '16px'
          }}
        >
          جميع الحقوق محفوظة © {new Date().getFullYear()} FXENGIN Global Ltd.
        </div>

      </div>
    </footer>
  );
}
