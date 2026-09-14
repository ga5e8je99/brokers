import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { brokersData } from '../data/brokersData';

export function VerifyVipModal({ isOpen, onClose, onSuccess }) {
  const { tg, user, triggerHaptic, openTelegramLink } = useTelegram();

  const [brokerId, setBrokerId] = useState(brokersData[0]?.id || 'xm');
  const [accountNumber, setAccountNumber] = useState('');
  const [telegramUsername, setTelegramUsername] = useState(user?.username ? `@${user.username}` : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-fill Telegram username if it becomes available later
  useEffect(() => {
    if (user?.username && !telegramUsername) {
      setTelegramUsername(`@${user.username}`);
    }
  }, [user, telegramUsername]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      triggerHaptic('error');
      return;
    }

    triggerHaptic('medium');
    setIsSubmitting(true);

    // Simulate quick instant registration / dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerHaptic('success');
      if (onSuccess) {
        const brokerName = brokersData.find((b) => b.id === brokerId)?.name || 'الوسيط';
        onSuccess(`تم استلام طلب تفعيل VIP لحساب ${accountNumber} في ${brokerName} بنجاح!`);
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setAccountNumber('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-sheet" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-sheet-handle" />

        {/* Modal Header */}
        <div 
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Sparkles size={16} />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              تفعيل اشتراك ومزايا VIP
            </h3>
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
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="إغلاق"
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(22, 199, 132, 0.15)',
                  border: '1px solid var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'var(--success)'
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                تم إرسال طلبك بنجاح!
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto 20px' }}>
                سيقوم فريق الدعم الفني بمراجعة رقم الحساب وتفعيل اشتراكك في قناة إشارات الـ VIP وأكاديمية الكورسات خلال دقائق معدودة.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    triggerHaptic('light');
                    openTelegramLink('https://t.me/FXenginsignals');
                  }}
                  style={{ width: '100%' }}
                >
                  <Send size={15} />
                  <span>متابعة التفعيل عبر تليجرام</span>
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={handleReset}
                  style={{ width: '100%' }}
                >
                  تم
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div 
                style={{
                  background: 'rgba(4, 136, 248, 0.08)',
                  border: '1px solid rgba(4, 136, 248, 0.25)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5
                }}
              >
                بمجرد فتح حسابك وإيداعه عبر رابط الشراكة، أدخل بياناتك أدناه لتسريع انضمامك الفوري لمجموعة التوصيات والأكاديمية.
              </div>

              {/* Broker Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  الوسيط أو شركة التمويل *
                </label>
                <select
                  value={brokerId}
                  onChange={(e) => setBrokerId(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(1, 7, 30, 0.8)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-arabic)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {brokersData.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.categoryName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Trading Account Number */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  رقم حساب التداول (MT4 / MT5 / ID) *
                </label>
                <input
                  type="text"
                  placeholder="مثال: 8594021"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(1, 7, 30, 0.8)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)',
                    direction: 'ltr',
                    textAlign: 'right',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Telegram Username */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  معرف تليجرام للتواصل (Username)
                </label>
                <input
                  type="text"
                  placeholder="@username"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(1, 7, 30, 0.8)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)',
                    direction: 'ltr',
                    textAlign: 'right',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  height: '46px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  marginTop: '6px',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                <Sparkles size={16} />
                <span>{isSubmitting ? 'جاري الإرسال...' : 'تأكيد الحساب وتفعيل VIP'}</span>
              </button>

              {/* Direct Support link */}
              <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                أو راسل فريق الدعم مباشرة على{' '}
                <button
                  type="button"
                  onClick={() => openTelegramLink('https://t.me/FXenginsignals')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  @FXenginsignals
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
