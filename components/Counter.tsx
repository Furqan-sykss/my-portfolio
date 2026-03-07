'use client';

import { useEffect, useRef, useState } from 'react';

export default function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            let start = 0;
            const duration = 1200;
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Easing out quart
              const eased = 1 - Math.pow(1 - progress, 4);
              start = Math.round(eased * target);
              setCount(start);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <div className="text-4xl font-bold tabular-nums" style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-serif)' }}>
        {count}<span className="text-2xl" style={{ color: 'var(--accent)', opacity: 0.5 }}>+</span>
      </div>
      <p className="text-xs mt-1.5 font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
  );
}
