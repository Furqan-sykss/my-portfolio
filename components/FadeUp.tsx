'use client';

/**
 * FadeUp — bidirectional scroll animation
 * - Scroll DOWN melewati elemen → fade in dari bawah (.visible)
 * - Scroll UP keluar dari viewport atas → fade out ke atas (.exit)
 * - Kembali scroll down lagi → animasi muncul lagi
 */

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;   // stagger delay dalam ms
  exitTop?: boolean; // apakah animasikan exit ke atas (default true)
}

export default function FadeUp({ children, className = '', delay = 0, exitTop = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay > 0) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Elemen masuk viewport — tampilkan
            el.classList.remove('exit');
            el.classList.add('visible');
          } else {
            // Elemen keluar viewport
            el.classList.remove('visible');
            if (exitTop) {
              // Tentukan arah keluar: atas atau bawah
              const rect = entry.boundingClientRect;
              if (rect.top < 0) {
                // Elemen keluar dari ATAS — animasi exit ke atas
                el.classList.add('exit');
              } else {
                // Elemen keluar dari BAWAH — reset ke bawah
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
