import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Furqan — Portfolio',
  description: 'Furqan — Full-Stack Developer & Backend Engineer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <body style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)', fontFamily: 'var(--font-dm-sans), ui-sans-serif, system-ui' }}
            className="antialiased relative overflow-x-hidden min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          {children}
        </main>
        <ScrollToTop />
      </body>
    </html>
  );
}
