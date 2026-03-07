'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isDark,  setIsDark]  = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') { document.documentElement.classList.remove('dark'); setIsDark(false); }
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const nowDark = html.classList.contains('dark');
    setIsDark(nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
  };

  const links = ['projects', 'experience', 'certifications', 'contact'];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
        transition: 'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        backgroundColor: scrolled ? 'var(--bg-card)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      }}>
        <div className="max-w-5xl mx-auto flex justify-between items-center px-5 sm:px-8 py-4">

          {/* Logo */}
          <a href="/"
             style={{ fontFamily: 'var(--font-dm-serif)', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 400, letterSpacing: '-0.01em', textDecoration: 'none' }}>
            Furqan<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-8"
               style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {links.map((s) => (
              <a key={s} href={`#${s}`}
                 style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s ease' }}
                 onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                 onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {s}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button onClick={toggle} aria-label="Toggle theme"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 999,
                      fontSize: '0.72rem', fontWeight: 500,
                      border: '1px solid var(--border-mid)',
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}>
              {isDark ? <SunIcon /> : <MoonIcon />}
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {/* Mobile hamburger */}
            <button className="sm:hidden flex flex-col gap-1.5 p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 20, height: 1.5,
                  backgroundColor: 'var(--text-secondary)', borderRadius: 2,
                  transition: 'all 0.25s ease',
                  transform: menuOpen
                    ? i === 0 ? 'translateY(5px) rotate(45deg)'
                    : i === 2 ? 'translateY(-5px) rotate(-45deg)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '200px' : '0',
          transition: 'max-height 0.35s ease',
          backgroundColor: 'var(--bg-card)',
          borderTop: menuOpen ? '1px solid var(--border)' : 'none',
        }}>
          <div className="sm:hidden px-5 py-4 flex flex-col gap-3">
            {links.map((s) => (
              <a key={s} href={`#${s}`}
                 onClick={() => setMenuOpen(false)}
                 style={{
                   textDecoration: 'none', color: 'var(--text-secondary)',
                   fontSize: '0.85rem', fontWeight: 500,
                   textTransform: 'capitalize', letterSpacing: '0.04em',
                   padding: '4px 0',
                   transition: 'color 0.2s ease',
                 }}
                 onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                 onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

function SunIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}
