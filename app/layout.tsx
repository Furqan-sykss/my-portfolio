import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

// const figtree = Figtree({
//   subsets: ["latin"],
//   weight: ["400", "600", "700", "800"],
//   variable: "--font-figtree",
//   display: "swap",
// });
const font = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furqan — Portfolio",
  description: "Furqan — Laravel Developer & Backend Engineer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${font.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased transition-colors duration-300 relative overflow-x-hidden min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>
        {/*
         * Ambient background blobs — light & dark aware via CSS vars.
         * Light: very subtle warm violet tint at corners
         * Dark:  deeper purple glow
         */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {/* Top-left blob */}
          <div
            className="
                        absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
                        bg-violet-200/30 dark:bg-violet-950/40
                        blur-[120px]"
          />
          {/* Bottom-right blob */}
          <div
            className="
                        absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full
                        bg-purple-100/40 dark:bg-purple-950/30
                        blur-[100px]"
          />
          {/* Center subtle warm tone — light only */}
          <div
            className="
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[400px] rounded-full
                        bg-amber-50/60 dark:bg-transparent
                        blur-[140px]"
          />
        </div>

        <Navbar />

        <main className="pt-24 pb-12 px-4">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
