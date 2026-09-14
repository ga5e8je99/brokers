import React from 'react';
import { useTelegram } from '../hooks/useTelegram';

export function BrokerFilterTabs({ activeFilter, onFilterChange, counts }) {
  const { triggerHaptic } = useTelegram();

  const tabs = [
    { id: 'all', label: `جميع الشركاء (${counts.all || 5})` },
    { id: 'forex', label: `وسطاء الفوركس والسلع (${counts.forex || 4})` },
    { id: 'prop', label: `شركات التمويل Prop Firms (${counts.prop || 1})` },
  ];

  return (
    <div 
      style={{
        display: 'inline-flex',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '4px',
        borderRadius: '12px',
        gap: '6px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        maxWidth: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`filter-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => {
              triggerHaptic('light');
              onFilterChange(tab.id);
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
