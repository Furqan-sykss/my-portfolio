'use client';

/**
 * components/IntroAnimation.tsx
 *
 * Menerima ref foto dari hero, lalu:
 * 1. Ambil posisi & ukuran foto di hero (getBoundingClientRect)
 * 2. Render clone foto yang bergerak dari posisi asli → tengah layar (zoom in)
 * 3. Tahan sebentar di tengah
 * 4. Bergerak balik ke posisi asli (zoom out)
 * 5. Selesai → onComplete() dipanggil → clone hilang
 *
 * Foto asli di hero disembunyikan sementara (opacity 0) selama animasi,
 * supaya tidak terlihat double.
 */

import { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';

interface Props {
  photoRef: React.RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}

interface Rect { top: number; left: number; width: number; height: number; borderRadius: string; }

export default function IntroAnimation({ photoRef, onComplete }: Props) {
  const [fromRect, setFromRect]   = useState<Rect | null>(null);
  const [phase, setPhase]         = useState<'init' | 'zoom-in' | 'hold' | 'zoom-out' | 'done'>('init');

  // Target: tengah layar, ukuran lebih besar
  const toRect: Rect = {
    top:          window.innerHeight / 2 - 175,
    left:         window.innerWidth  / 2 - 130,
    width:        260,
    height:       350,
    borderRadius: '1.5rem',
  };

  useEffect(() => {
    if (!photoRef.current) return;

    // Ambil posisi foto asli di hero
    const r = photoRef.current.getBoundingClientRect();
    const rect: Rect = {
      top:          r.top,
      left:         r.left,
      width:        r.width,
      height:       r.height,
      borderRadius: '1.5rem',
    };
    setFromRect(rect);

    // Sembunyikan foto asli selama animasi
    photoRef.current.style.opacity = '0';

    // Timeline animasi
    const t1 = setTimeout(() => setPhase('zoom-in'),   80);
    const t2 = setTimeout(() => setPhase('hold'),      900);
    const t3 = setTimeout(() => setPhase('zoom-out'),  1700);
    const t4 = setTimeout(() => {
      setPhase('done');
      // Kembalikan foto asli
      if (photoRef.current) photoRef.current.style.opacity = '1';
      onComplete();
    }, 2500);

    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  if (phase === 'done' || !fromRect) return null;

  const isCenter = phase === 'zoom-in' || phase === 'hold';
  const currentRect = isCenter ? toRect : fromRect;

  return (
    <>
      {/* Backdrop gelap tipis saat foto di tengah */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        backgroundColor: 'rgba(0,0,0,0.45)',
        opacity: isCenter ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Grid overlay di backdrop */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '55px 55px',
        opacity: isCenter ? 0.25 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Clone foto yang beranimasi */}
      <div
        style={{
          position: 'fixed',
          zIndex: 9999,
          top:          currentRect.top,
          left:         currentRect.left,
          width:        currentRect.width,
          height:       currentRect.height,
          borderRadius: currentRect.borderRadius,
          overflow:     'hidden',
          border:       '1px solid var(--border)',
          boxShadow:    isCenter
            ? '0 40px 100px rgba(0,0,0,0.35), 0 8px 30px rgba(0,0,0,0.2)'
            : '0 4px 20px rgba(0,0,0,0.1)',
          transition: [
            'top    0.65s cubic-bezier(0.34, 1.3, 0.64, 1)',
            'left   0.65s cubic-bezier(0.34, 1.3, 0.64, 1)',
            'width  0.65s cubic-bezier(0.34, 1.3, 0.64, 1)',
            'height 0.65s cubic-bezier(0.34, 1.3, 0.64, 1)',
            'border-radius 0.5s ease',
            'box-shadow 0.5s ease',
          ].join(', '),
          pointerEvents: 'none',
        }}
      >
        <NextImage
          src="/furqan.jpg"
          alt="Furqan"
          fill
          className="object-cover object-top scale-110"
          priority
        />
      </div>
    </>
  );
}
