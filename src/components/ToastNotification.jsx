import React from 'react';
import { CheckCircle2, Sparkles, Info } from 'lucide-react';

export function ToastNotification({ toast }) {
  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast-item">
        {toast.type === 'copy' ? (
          <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
        ) : toast.type === 'vip' ? (
          <Sparkles size={18} style={{ color: 'var(--accent)' }} />
        ) : (
          <Info size={18} style={{ color: 'var(--primary)' }} />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
