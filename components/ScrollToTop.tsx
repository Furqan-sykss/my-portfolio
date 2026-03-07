"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50
        w-10 h-10 rounded-xl
        flex items-center justify-center
        text-white text-sm font-bold
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
      style={{
        backgroundColor: "var(--accent)",
        boxShadow: "0 4px 20px var(--accent-glow)",
      }}
    >
      ↑
    </button>
  );
}
