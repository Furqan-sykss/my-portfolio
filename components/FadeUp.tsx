'use client';

/*
 * components/FadeUp.tsx
 * Pengganti: IntersectionObserver + .fade-up/.show di app.js & app.css Laravel
 *
 * Di Laravel, semua element dengan class .fade-up di-observe secara global
 * di app.js. Di Next.js, dibungkus sebagai reusable Client Component.
 */

import { useEffect, useRef } from 'react';

interface FadeUpProps {
    children: React.ReactNode;
    className?: string;
}

export default function FadeUp({ children, className = '' }: FadeUpProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Identik dengan IntersectionObserver di app.js Laravel
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Identik dengan entry.target.classList.add("show")
                    entry.target.classList.add('show');
                }
            });
        });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Class .fade-up didefinisikan di globals.css (sama dengan app.css Laravel)
    return (
        <div ref={ref} className={`fade-up ${className}`}>
            {children}
        </div>
    );
}
