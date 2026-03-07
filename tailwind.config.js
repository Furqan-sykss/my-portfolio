/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"DM Sans"',           'ui-sans-serif', 'system-ui'],
        display: ['"DM Serif Display"',  'Georgia',       'serif'],
      },
    },
  },
  plugins: [],
};
