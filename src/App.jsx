import React, { useState, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrokerCard } from './components/BrokerCard';
import { WhyFxenginSection } from './components/WhyFxenginSection';
import { StepsSection } from './components/StepsSection';
import { Footer } from './components/Footer';
import { BrokerDetailsModal } from './components/BrokerDetailsModal';
import { VerifyVipModal } from './components/VerifyVipModal';
import { ToastNotification } from './components/ToastNotification';
import { brokersData } from './data/brokersData';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const { openLink } = useTelegram();

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [lang, setLang] = useState('ar');
  const [copiedCode, setCopiedCode] = useState(null);
  const [toast, setToast] = useState(null);

  // Filtered brokers calculation
  const filteredBrokers = useMemo(() => {
    if (activeFilter === 'all') return brokersData;
    return brokersData.filter((broker) => broker.category === activeFilter);
  }, [activeFilter]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: brokersData.length,
      forex: brokersData.filter((b) => b.category === 'forex').length,
      prop: brokersData.filter((b) => b.category === 'prop').length,
    };
  }, []);

  // Toast handler
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  // Copy coupon with confetti and toast
  const handleCopyCode = useCallback((code, brokerName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    showToast(`تم نسخ كود خصم ${brokerName}: (${code}) بنجاح!`, 'copy');

    // Confetti celebration
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#FB8704', '#0488F8', '#16C784', '#FFFFFF'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setCopiedCode((prev) => (prev === code ? null : prev));
    }, 4000);
  }, [showToast]);

  const handleBookWebinar = useCallback(() => {
    openLink('https://fxengi.vercel.app/register');
  }, [openLink]);

  const handleToggleLang = useCallback(() => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    showToast(
      nextLang === 'en' ? 'Switched to English interface' : 'تم التحويل إلى الواجهة العربية',
      'info'
    );
  }, [lang, showToast]);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Top Navigation Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* 4. Main App Container */}
      <main className="app-container" style={{ flex: 1, paddingBottom: '32px' }}>
        
        {/* Hero & Filter Section */}
        <HeroSection
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />

        {/* Brokers Cards List */}
        <section aria-label="قائمة الوسطاء المعتمدين">
          {filteredBrokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
              onOpenDetails={setSelectedBroker}
              onCopyCode={handleCopyCode}
              copiedCode={copiedCode}
            />
          ))}
        </section>

        {/* Why Choose FXENGIN Section */}
        <WhyFxenginSection />

        {/* 3 Simple Steps Section */}
        <StepsSection onOpenVerify={() => setIsVerifyModalOpen(true)} />

      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <BrokerDetailsModal
        broker={selectedBroker}
        onClose={() => setSelectedBroker(null)}
        onCopyCode={handleCopyCode}
        copiedCode={copiedCode}
      />

      <VerifyVipModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onSuccess={(msg) => {
          showToast(msg, 'vip');
          try {
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#FB8704', '#0488F8', '#FFD700'],
            });
          } catch {
            // ignore
          }
        }}
      />

      {/* Floating Toast Notification */}
      <ToastNotification toast={toast} />

    </div>
  );
}

export default App;
