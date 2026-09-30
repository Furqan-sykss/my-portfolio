'use client';

/**
 * FadeUp â€” bidirectional scroll animation
 * - Scroll DOWN melewati elemen â†’ fade in dari bawah (.visible)
 * - Scroll UP keluar dari viewport atas â†’ fade out ke atas (.exit)
 * - Kembali scroll down lagi â†’ animasi muncul lagi
 */

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;   // stagger delay dalam ms
  exitTop?: boolean; // apakah animasikan exit ke atas (default true)
}

export default function FadeUp({ children, className = '', delay = 0, exitTop = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible');
      return;
    }


    if (delay > 0) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Elemen masuk viewport â€” tampilkan
            el.classList.remove('exit');
            el.classList.add('visible');
          } else {
            // Elemen keluar viewport
            el.classList.add('visible');
            if (exitTop) {
              // Tentukan arah keluar: atas atau bawah
              const rect = entry.boundingClientRect;
              if (rect.top < 0) {
                // Elemen keluar dari ATAS â€” animasi exit ke atas
                el.classList.add('exit');
              } else {
                // Elemen keluar dari BAWAH â€” reset ke bawah
                el.classList.remove('exit');
              }
            }
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, exitTop]);

  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
}
