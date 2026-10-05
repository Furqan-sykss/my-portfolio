import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/components/LanguageProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furqan - Portfolio",
  description: "Furqan - Web Developer with digital presence and digital branding project experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`dark ${dmSans.variable} ${dmSerif.variable}`} data-palette="default" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var root=document.documentElement;var mode=localStorage.getItem("theme");if(mode==="light")root.classList.remove("dark");else if(mode==="dark")root.classList.add("dark");var palette=localStorage.getItem("palette");if(palette==="default"||palette==="ocean"||palette==="rose")root.dataset.palette=palette;}catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }} className="antialiased relative overflow-x-hidden min-h-screen">
        <LanguageProvider>
          <Navbar />
          <main className="pt-24 pb-16 px-4">{children}</main>
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
