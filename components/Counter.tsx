'use client';

/*
 * components/Counter.tsx
 * Pengganti: fungsi animateCounter() + data-counter di app.js & home.blade.php Laravel
 *
 * Client Component karena butuh useEffect + requestAnimationFrame (DOM API).
 */

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
    target: number;
    label: string;
}

export default function Counter({ target, label }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        // IntersectionObserver — identik dengan observer di app.js Laravel
        // Animasi hanya mulai saat elemen masuk viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    animateCounter();
                }
            });
        });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    // Identik dengan fungsi animateCounter() di app.js Laravel
    function animateCounter() {
        let current = 0;
        const increment = target / 100;

        const update = () => {
            current += increment;
            if (current < target) {
                setCount(Math.floor(current));
                requestAnimationFrame(update);
            } else {
                setCount(target);
            }
        };

        update();
    }

    return (
        <div ref={ref}>
            {/* Identik dengan <h3 data-counter="X"> di home.blade.php */}
            <h3 className="text-4xl font-bold text-accent">{count}</h3>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{label}</p>
        </div>
    );
}
