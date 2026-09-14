import React, { useEffect } from 'react';
import { X, BookOpen, TrendingUp, BarChart2, Radio, FileText, Mail, Sparkles, Send, Globe } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export function MobileMenuDrawer({ isOpen, onClose, lang, onToggleLang, onOpenVerify }) {
  const { tg, triggerHaptic, openTelegramLink, openLink } = useTelegram();

  // Telegram BackButton integration
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, tg, onClose, triggerHaptic]);

  if (!isOpen) return null;

  const navItems = [
    { label: 'الرئيسية', icon: <TrendingUp size={16} />, href: 'https://fxengi.vercel.app/' },
    { label: 'الكورسات والأكاديمية', icon: <BookOpen size={16} />, href: 'https://fxengi.vercel.app/courses' },
    { label: 'أسواق المال المباشرة', icon: <BarChart2 size={16} />, href: 'https://fxengi.vercel.app/markets' },
    { label: 'التحليلات الفنية', icon: <BarChart2 size={16} />, href: 'https://fxengi.vercel.app/analyses' },
    { label: 'البث المباشر والندوات', icon: <Radio size={16} />, href: 'https://fxengi.vercel.app/live' },
    { label: 'المدونة والتقارير', icon: <FileText size={16} />, href: 'https://fxengi.vercel.app/blog' },
    { label: 'تواصل معنا', icon: <Mail size={16} />, href: 'https://fxengi.vercel.app/contact' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div 
        className="modal-sheet" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '360px',
          height: '100%',
          maxHeight: '100dvh',
          borderRadius: 0,
          position: 'fixed',
          top: 0,
          insetInlineStart: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInStart 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface-elevated)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src="/assets/images/logo.png" 
              alt="FXENGIN" 
              style={{ width: '28px', height: '28px', objectFit: 'contain' }} 
            />
            <span className="font-latin text-gradient-accent" style={{ fontWeight: 900, fontSize: '16px' }}>
              FXENGIN
            </span>
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
            aria-label="إغلاق القائمة"
          >
            <X size={16} />
          </button>
        </div>

        {/* Links List */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                triggerHaptic('light');
                openLink(item.href);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '12px 14px',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                textAlign: 'right',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div style={{ height: '1px', background: 'var(--border)', margin: '10px 0' }} />

          {/* Action: VIP Activation */}
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              triggerHaptic('medium');
              onClose();
              onOpenVerify();
            }}
            style={{ width: '100%', fontSize: '13px' }}
          >
            <Sparkles size={16} />
            <span>تفعيل مزايا VIP</span>
          </button>

          {/* Action: Telegram Support */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              triggerHaptic('light');
              openTelegramLink('https://t.me/FXenginsignals');
            }}
            style={{ width: '100%', fontSize: '12.5px', marginTop: '6px' }}
          >
            <Send size={15} />
            <span>قناة تليجرام والدعم الفني</span>
          </button>
        </div>

        {/* Drawer Bottom: Language switch */}
        <div 
          style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border)',
            background: 'var(--surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            اللغة / Language
          </div>
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onToggleLang();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'var(--font-latin)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Globe size={14} style={{ color: 'var(--primary)' }} />
            <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
