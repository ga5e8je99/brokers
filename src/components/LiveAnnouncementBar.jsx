import React, { useState, useEffect } from 'react';
import { Clock, CreditCard, ChevronLeft, X } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export function LiveAnnouncementBar({ onBookSeat }) {
  const [isVisible, setIsVisible] = useState(true);
  const { triggerHaptic } = useTelegram();

  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 18,
    minutes: 42,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <aside className="webinar-banner" aria-label="إعلان البث المباشر القادم">
      <div 
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        {/* Left info: Live tag & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: '1 1 auto' }}>
          <span 
            style={{
              background: 'rgba(246, 70, 93, 0.18)',
              border: '1px solid rgba(246, 70, 93, 0.45)',
              color: '#F6465D',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0
            }}
          >
            <span className="live-pulse-dot"></span>
            <span>بث مباشر قادم</span>
          </span>

          <div 
            style={{ 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}
          >
            <span>أسرار السيولة البنكية ومناطق العرض والطلب</span>
            <span style={{ color: 'var(--text-muted)', marginInlineStart: '6px', fontSize: '11px', fontWeight: 500 }}>
              • د. كريم الشناوي
            </span>
          </div>
        </div>

        {/* Right info: Timer & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Countdown Clock */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(251, 135, 4, 0.25)',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--accent)'
            }}
          >
            <Clock size={12} style={{ color: 'var(--accent)' }} />
            <span>
              {pad(timeLeft.days)}ي {pad(timeLeft.hours)}س {pad(timeLeft.minutes)}د {pad(timeLeft.seconds)}ث
            </span>
          </div>

          {/* Price badge */}
          <span 
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--accent)',
              background: 'rgba(251, 135, 4, 0.12)',
              border: '1px solid rgba(251, 135, 4, 0.3)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)'
            }}
          >
            49 USDT
          </span>

          {/* Book button */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              if (onBookSeat) onBookSeat();
            }}
            style={{
              background: 'linear-gradient(135deg, #FB8704 0%, #F6465D 100%)',
              border: 'none',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(251, 135, 4, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <CreditCard size={12} />
            <span>احجز مقعدك</span>
            <ChevronLeft size={11} />
          </button>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              setIsVisible(false);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
            }}
            aria-label="إغلاق الإعلان"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
