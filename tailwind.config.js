/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Dark theme (unchanged)
                darkbg:   '#0f0a1a',
                darkcard: '#1a1025',

                // Light theme base — warm off-white, not stark white
                lightbg:  '#f7f5f2',
                lightcard:'#efecea',

                // Accent — slightly deeper violet, less neon, more refined
                accent:   '#9333ea',
                'accent-light': '#a855f7',
            },
            fontFamily: {
                sans: ['Figtree', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
};
