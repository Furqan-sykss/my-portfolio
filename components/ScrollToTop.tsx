'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY  = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > 400);
      setProgress(maxScroll > 0 ? scrollY / maxScroll : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const size = 40;
  const r    = 17;
  const circ = 2 * Math.PI * r;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 9001,
        width: size, height: size,
        borderRadius: '50%',
        border: '1px solid var(--border-mid)',
        backgroundColor: 'var(--bg-card)',
        boxShadow: 'var(--shadow-md)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Progress ring */}
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="var(--border)" strokeWidth={1.5} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="var(--accent)" strokeWidth={1.5}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
      </svg>
      {/* Arrow */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
           style={{ position: 'relative', zIndex: 1 }}>
        <path d="M6 10V2M2.5 5.5L6 2l3.5 3.5"
          stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
