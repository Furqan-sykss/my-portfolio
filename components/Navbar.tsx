"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { translate } from "@/components/siteTranslations";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [ignoreObserver, setIgnoreObserver] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const { lang, toggleLang } = useLanguage();
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);

  const linkLabels: Record<string, string> = {
    experience: t("navExperience"),
    projects: t("navProjects"),
    certifications: t("navCertifications"),
    contact: t("navContact"),
  };

  const themeLabel = isDark ? t("themeLight") : t("themeDark");
  const themeAria = isDark ? t("switchToLightMode") : t("switchToDarkMode");
  const navLabel = lang === "id" ? "EN" : "ID";
  const navAria = lang === "id" ? t("switchToEnglish") : t("switchToIndonesian");
  const menuAria = menuOpen ? t("closeMenu") : t("openMenu");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Auto-close menu saat user scroll
      if (menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    // Auto-close menu saat user klik diluar navbar
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navbar = document.querySelector("nav");
      const hamburgerBtn = document.querySelector("button[aria-controls='mobile-menu']");

      if (menuOpen && navbar && !navbar.contains(target) && !hamburgerBtn?.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    // ── Scroll Spy — IntersectionObserver ──────────────────────────────────
    const sectionEls = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (ignoreObserver) {
          return;
        }
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const closest = visible.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
          setActiveSection(closest.target.id);
        } else {
          setActiveSection("");
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1],
      },
    );
    sectionEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", handleClickOutside);
      observer.disconnect();
    };
  }, [menuOpen]);

  const [langPressed, setLangPressed] = useState(false);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const nowDark = html.classList.contains("dark");
    setIsDark(nowDark);
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  };

  const handleLangToggle = () => {
    setLangPressed(true);
    toggleLang();
    window.setTimeout(() => setLangPressed(false), 140);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    setActiveSection(id);
    setIgnoreObserver(true);
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      setIgnoreObserver(false);
      scrollTimeoutRef.current = null;
    }, 1200);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", window.location.pathname); // hapus # dari URL
    }
  };

  const links = ["experience", "projects", "certifications", "contact"];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          transition: "background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          backgroundColor: scrolled ? "var(--bg-card)" : "transparent",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        }}
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center px-5 sm:px-8 py-4">
          {/* Logo */}
          <a href="/" style={{ fontFamily: "var(--font-dm-serif)", color: "var(--text-primary)", fontSize: "clamp(0.95rem, 3vw, 1.1rem)", fontWeight: 400, letterSpacing: "-0.01em", textDecoration: "none" }}>
            Furqan<span style={{ color: "var(--accent)" }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-8" style={{ color: "var(--text-muted)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {links.map((s) => {
              const isActive = activeSection === s;
              return (
                <a
                  key={s}
                  href="javascript:void(0)"
                  onClick={() => scrollTo(s)}
                  style={{
                    textDecoration: "none",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    transition: "color 0.2s ease",
                    fontWeight: isActive ? 600 : 500,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "var(--accent)" : "var(--text-muted)")}
                >
                  {linkLabels[s]}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={themeAria}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: "0.72rem",
                fontWeight: 500,
                border: "1px solid var(--border-mid)",
                backgroundColor: "var(--bg-subtle)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
              {/* <span className="hidden sm:inline">{themeLabel}</span> */}
            </button>

            {/* Language toggle */}
            <button
              onClick={handleLangToggle}
              aria-label={navAria}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 14px",
                minWidth: 44,
                borderRadius: 999,
                fontSize: "0.72rem",
                fontWeight: 600,
                border: "1px solid var(--border-mid)",
                backgroundColor: langPressed ? "rgba(59,130,246,0.08)" : "var(--bg-subtle)",
                color: langPressed ? "var(--accent)" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.18s ease, transform 0.14s ease",
                transform: langPressed ? "scale(0.96)" : "scale(1)",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
              }}
            >
              {navLabel}
            </button>

            {/* Mobile hamburger */}
            {isMobile && (
              <button
                className="sm:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuAria}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                style={{
                  position: "relative",
                  width: 38,
                  height: 38,
                  background: menuOpen ? "rgba(31,81,50,0.12)" : "transparent",
                  border: menuOpen ? "1px solid var(--accent)" : "1px solid transparent",
                  cursor: "pointer",
                  padding: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  outline: "none",
                  transition: "background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
                  display: "inline-flex",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-subtle)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = menuOpen ? "rgba(31,81,50,0.12)" : "transparent";
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-subtle)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = menuOpen ? "rgba(31,81,50,0.12)" : "transparent";
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      left: "50%",
                      width: 20,
                      height: 2,
                      backgroundColor: menuOpen ? "var(--accent)" : "var(--text-secondary)",
                      borderRadius: 999,
                      transition: "transform 0.3s ease, opacity 0.3s ease, background-color 0.25s ease, top 0.3s ease",
                      transform: menuOpen ? (i === 0 ? "translate(-50%, -50%) rotate(45deg)" : i === 2 ? "translate(-50%, -50%) rotate(-45deg)" : "translate(-50%, -50%) scaleX(0)") : "translateX(-50%)",
                      top: menuOpen ? "50%" : i === 0 ? 10 : i === 1 ? 18 : 26,
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className="sm:hidden"
          style={{
            display: isMobile ? "block" : "none",
            overflow: "hidden",
            maxHeight: isMobile && menuOpen ? "500px" : "0",
            transition: "max-height 0.35s ease",
            backgroundColor: "var(--bg-card)",
            borderTop: isMobile && menuOpen ? "1px solid var(--border)" : "none",
          }}
        >
          <nav className="sm:hidden px-5 py-4 flex flex-col gap-2">
            {links.map((s) => {
              const isActive = activeSection === s;
              return (
                <a
                  key={s}
                  href="javascript:void(0)"
                  onClick={() => {
                    scrollTo(s);
                    setMenuOpen(false);
                  }}
                  style={{
                    textDecoration: "none",
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 600 : 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    padding: "12px 12px",
                    borderRadius: 8,
                    transition: "all 0.2s ease",
                    display: "block",
                    backgroundColor: isActive ? "var(--accent-glow)" : "transparent",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-subtle)";
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    }
                  }}
                  onFocus={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-subtle)";
                    }
                  }}
                  onBlur={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {linkLabels[s]}
                </a>
              );
            })}
          </nav>
        </div>
      </nav>
    </>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}
