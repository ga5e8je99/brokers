import React from 'react';
import { Globe } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export function Header({ lang, onToggleLang }) {
  const { user, triggerHaptic } = useTelegram();

  return (
    <header className="app-header">
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <img 
              src="/assets/images/logo.png" 
              alt="FXENGIN Logo" 
              style={{ width: '34px', height: '34px', objectFit: 'contain' }} 
              onError={(e) => {
                e.currentTarget.src = 'https://fxengi.vercel.app/assets/Images/Logo/logo.png';
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="font-latin text-gradient-accent" style={{ fontWeight: 900, fontSize: '17px', letterSpacing: '0.8px', lineHeight: 1.1 }}>
                FXENGIN
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                منصة التداول والتعليم المالي
              </span>
            </div>
          </a>
        </div>

        {/* User Info & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          {/* Telegram User Badge (if inside Telegram) */}
          {user && (
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                background: 'rgba(4, 136, 248, 0.12)', 
                border: '1px solid rgba(4, 136, 248, 0.3)',
                padding: '4px 8px', 
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--primary)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }}></span>
              <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.first_name || user.username || 'VIP Trader'}
              </span>
            </div>
          )}

          {/* Language Toggle */}
          <button 
            type="button" 
            onClick={() => { triggerHaptic('light'); onToggleLang(); }}
            style={{
              background: 'rgba(6, 20, 47, 0.85)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              height: '34px',
              padding: '0 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'var(--font-latin)',
              cursor: 'pointer'
            }}
            title="تغيير اللغة / Switch Language"
          >
            <Globe size={14} style={{ color: 'var(--primary)' }} />
            <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
