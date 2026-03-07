'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isDark, setIsDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }

        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleToggle = () => {
        const html = document.documentElement;
        html.classList.toggle('dark');
        const nowDark = html.classList.contains('dark');
        setIsDark(nowDark);
        localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    };

    return (
        <nav className={`
            fixed top-0 left-0 w-full z-50 transition-all duration-300
            ${scrolled
                ? 'backdrop-blur-xl bg-white/80 dark:bg-[#0f0a1a]/80 border-b border-stone-200/60 dark:border-white/5 shadow-sm dark:shadow-none'
                : 'bg-transparent border-b border-transparent'
            }
        `}>
            <div className="max-w-4xl mx-auto flex justify-between items-center px-5 sm:px-8 py-4">

                {/* Logo */}
                <a href="/" className="text-base font-bold tracking-tight"
                   style={{ color: 'var(--text-primary)' }}>
                    Furqan
                    <span className="text-accent">.</span>
                </a>

                {/* Nav links — desktop */}
                <div className="hidden sm:flex items-center gap-6 text-sm font-medium"
                     style={{ color: 'var(--text-secondary)' }}>
                    {['projects', 'experience', 'certifications', 'contact'].map((s) => (
                        <a key={s} href={`#${s}`}
                           className="capitalize hover:text-accent transition-colors duration-200">
                            {s}
                        </a>
                    ))}
                </div>

                {/* Theme toggle */}
                <button
                    onClick={handleToggle}
                    aria-label="Toggle theme"
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold
                        transition-all duration-200
                        ${isDark
                            ? 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-white/10'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-800 border border-stone-200'
                        }
                    `}>
                    {isDark
                        ? <><SunIcon /> Light</>
                        : <><MoonIcon /> Dark</>
                    }
                </button>

            </div>
        </nav>
    );
}

function SunIcon() {
    return (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    );
}
