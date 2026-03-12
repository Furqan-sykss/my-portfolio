"use client";

/*
 * components/TypedText.tsx
 * Pengganti: logika Typed.js di resources/js/app.js Laravel
 *
 * Harus Client Component ('use client') karena:
 * - Typed.js butuh DOM (document.getElementById)
 * - useEffect hanya berjalan di browser
 */

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypedText() {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Identik dengan new Typed('#typed-text', {...}) di app.js Laravel
    const typed = new Typed(el.current!, {
      strings: ["Web Developer", "Laravel Developer", "Backend Engineer", "Data Engineer", "System Architect", "API Specialist"],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
    });

    // Cleanup saat component di-unmount
    return () => typed.destroy();
  }, []);

  return (
    // Identik dengan <span id="typed-text" class="text-accent"> di home.blade.php
    <span ref={el} className="text-accent" />
  );
}
