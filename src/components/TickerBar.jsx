import React, { useState, useEffect } from 'react';
import { initialTickerData } from '../data/tickerData';

export function TickerBar() {
  const [tickerItems, setTickerItems] = useState(initialTickerData);

  // Subtle live price updates to make the market feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerItems((prev) =>
        prev.map((item) => {
          // 30% chance to nudge an item
          if (Math.random() < 0.3) {
            const factor = 1 + (Math.random() * 0.001 - 0.0005);
            const newPrice = Number((item.price * factor).toFixed(item.decimals));
            const isUp = newPrice >= item.price;
            return {
              ...item,
              price: newPrice,
              isUp,
            };
          }
          return item;
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Duplicate list to create a seamless infinite loop
  const seamlessList = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker-bar" aria-label="شريط أسعار العملات والسلع المباشرة">
      {/* Edge gradient masks for sleek fading */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '40px',
          background: 'linear-gradient(to left, var(--bg-dark), transparent)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '40px',
          background: 'linear-gradient(to right, var(--bg-dark), transparent)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div className="ticker-track">
        {seamlessList.map((item, idx) => (
          <div key={`${item.symbol}-${idx}`} className="ticker-item">
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {item.symbol}
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {item.price.toLocaleString(undefined, {
                minimumFractionDigits: item.decimals,
                maximumFractionDigits: item.decimals,
              })}
            </span>
            <span className={item.isUp ? 'ticker-badge-up' : 'ticker-badge-down'}>
              {item.isUp ? '▲' : '▼'} {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
