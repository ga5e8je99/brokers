import { useEffect, useState, useCallback } from 'react';

export function useTelegram() {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [isInTelegram, setIsInTelegram] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webapp = window.Telegram.WebApp;
      setTg(webapp);
      
      try {
        webapp.ready();
        webapp.expand();
        
        // Match theme colors
        if (webapp.setHeaderColor) {
          webapp.setHeaderColor('#01071E');
        }
        if (webapp.setBackgroundColor) {
          webapp.setBackgroundColor('#01071E');
        }
        
        // Enable closing confirmation if needed
        webapp.enableClosingConfirmation?.();

        if (webapp.initDataUnsafe?.user) {
          setUser(webapp.initDataUnsafe.user);
          setIsInTelegram(true);
        }
      } catch (err) {
        console.warn('Telegram WebApp init warning:', err);
      }
    }
  }, []);

  const triggerHaptic = useCallback((style = 'light') => {
    if (tg?.HapticFeedback) {
      try {
        if (style === 'success' || style === 'error' || style === 'warning') {
          tg.HapticFeedback.notificationOccurred(style);
        } else {
          tg.HapticFeedback.impactOccurred(style); // 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
        }
      } catch (e) {
        // ignore
      }
    }
  }, [tg]);

  const openLink = useCallback((url) => {
    triggerHaptic('medium');
    if (tg?.openLink) {
      tg.openLink(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [tg, triggerHaptic]);

  const openTelegramLink = useCallback((url) => {
    triggerHaptic('medium');
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [tg, triggerHaptic]);

  return {
    tg,
    user,
    isInTelegram,
    triggerHaptic,
    openLink,
    openTelegramLink,
  };
}
