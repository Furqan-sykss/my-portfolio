"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { translate } from "@/components/siteTranslations";

type Palette = "default" | "ocean" | "bordeaux";

const palettes: { id: Palette; label: string; colors: [string, string, string] }[] = [
  { id: "default", label: "paletteDefault", colors: ["#1f5132", "#8ba194", "#fff7e2"] },
  { id: "ocean", label: "paletteOcean", colors: ["#176b63", "#c87558", "#f2f7f5"] },
  { id: "bordeaux", label: "paletteBordeaux", colors: ["#7b1230", "#1a6b4c", "#f3f1ec"] },
];

function isPalette(value: string | null): value is Palette {
  return value === "default" || value === "ocean" || value === "bordeaux";
}

function readPreference(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [selectedPalette, setSelectedPalette] = useState<Palette>("default");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { lang, toggleLang } = useLanguage();
  const ignoreObserverRef = useRef(false);
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);

  const linkLabels: Record<string, string> = {
    experience: t("navExperience"),
    projects: t("navProjects"),
    certifications: t("navCertifications"),
    contact: t("navContact"),
  };

  const themeMenuLabel = t("appearanceSettings");
  const navLabel = lang === "id" ? "EN" : "ID";
  const navAria = lang === "id" ? t("switchToEnglish") : t("switchToIndonesian");
  const menuAria = menuOpen ? t("closeMenu") : t("openMenu");

  useEffect(() => {
    const saved = readPreference("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }

    const savedPalette = readPreference("palette");
    const initialPalette = isPalette(savedPalette) ? savedPalette : "default";
    document.documentElement.dataset.palette = initialPalette;
    setSelectedPalette(initialPalette);

    const updateScrollState = () => {
      setScrolled(window.scrollY > 20);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
    };
    const onScroll = () => {
      updateScrollState();
      // Auto-close menu saat user scroll
      if (menuOpen) {
        setMenuOpen(false);
      }
      if (themeMenuOpen) {
        setThemeMenuOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();

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
      const target = e.target as Node;

      if (menuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(target) && !menuButtonRef.current?.contains(target)) {
        setMenuOpen(false);
      }
      if (themeMenuOpen && themeMenuRef.current && !themeMenuRef.current.contains(target)) {
        setThemeMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (themeMenuOpen) {
        setThemeMenuOpen(false);
        themeButtonRef.current?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Scroll Spy ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â IntersectionObserver ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
    const sectionEls = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (ignoreObserverRef.current) {
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
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [menuOpen, themeMenuOpen]);

  const [langPressed, setLangPressed] = useState(false);

  const setThemeMode = (dark: boolean) => {
    if (dark === isDark) return;

    const updateTheme = () => {
      const html = document.documentElement;
      html.classList.toggle("dark", dark);
      setIsDark(dark);
      savePreference("theme", dark ? "dark" : "light");
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const viewTransitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };

    if (reducedMotion || !viewTransitionDocument.startViewTransition || !themeButtonRef.current) {
      updateTheme();
      return;
    }

    const rect = themeButtonRef.current.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(originX, window.innerWidth - originX), Math.max(originY, window.innerHeight - originY));

    const transition = viewTransitionDocument.startViewTransition(updateTheme);
    transition.ready.then(() => {
      const start = "circle(0px at " + originX + "px " + originY + "px)";
      const end = "circle(" + radius + "px at " + originX + "px " + originY + "px)";
      document.documentElement.animate({ clipPath: [start, end] }, {
        duration: 820,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
        pseudoElement: "::view-transition-new(root)",
      } as KeyframeAnimationOptions & { pseudoElement: string });
    });
  };

  const setPalette = (palette: Palette) => {
    document.documentElement.dataset.palette = palette;
    savePreference("palette", palette);
    setSelectedPalette(palette);
  };

  const handleLangToggle = () => {
    setLangPressed(true);
    toggleLang();
    window.setTimeout(() => setLangPressed(false), 140);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    setActiveSection(id);
    ignoreObserverRef.current = true;
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      ignoreObserverRef.current = false;
      scrollTimeoutRef.current = null;
    }, 1200);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const links = ["experience", "projects", "certifications", "contact"];

  return (
    <>
      <nav
        className="site-nav"
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
        <span className="nav-progress" style={{ transform: "scaleX(" + scrollProgress + ")" }} />
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
                  href={"#" + s}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(s);
                  }}
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
            <div ref={themeMenuRef} className="theme-menu-anchor">
              <button
                ref={themeButtonRef}
                className="theme-menu-trigger"
                onClick={() => {
                  setThemeMenuOpen((open) => !open);
                  setMenuOpen(false);
                }}
                aria-label={themeMenuLabel}
                aria-expanded={themeMenuOpen}
                aria-controls="theme-menu"
                aria-haspopup="dialog"
                title={themeMenuLabel}
                type="button"
              >
                {isDark ? <MoonIcon /> : <SunIcon />}
                <ChevronDownIcon />
              </button>

              {themeMenuOpen && (
                <div id="theme-menu" className="theme-menu" role="dialog" aria-label={themeMenuLabel}>
                  <div className="theme-menu-heading">{t("appearanceMode")}</div>
                  <div className="theme-mode-control" role="group" aria-label={t("appearanceMode")}>
                    <button type="button" onClick={() => setThemeMode(false)} aria-pressed={!isDark}>
                      <SunIcon />
                      <span>{t("themeLight")}</span>
                    </button>
                    <button type="button" onClick={() => setThemeMode(true)} aria-pressed={isDark}>
                      <MoonIcon />
                      <span>{t("themeDark")}</span>
                    </button>
                  </div>

                  <div className="theme-menu-heading theme-palette-heading">{t("appearancePalette")}</div>
                  <div className="theme-palette-list">
                    {palettes.map((palette) => {
                      const isSelected = selectedPalette === palette.id;
                      return (
                        <label key={palette.id} className="theme-palette-option">
                          <input type="radio" name="portfolio-palette" value={palette.id} checked={isSelected} aria-label={t(palette.label)} onChange={() => setPalette(palette.id)} />
                          <span className="theme-swatches" aria-hidden="true">
                            {palette.colors.map((color) => (
                              <span key={color} style={{ backgroundColor: color }} />
                            ))}
                          </span>
                          <span className="theme-palette-name">{t(palette.label)}</span>
                          {isSelected && <CheckIcon />}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Language toggle */}
            <button
              onClick={handleLangToggle}
              aria-label={navAria}
              style={{
                display: "flex",
                width: 48,
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                minWidth: 48,
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
                ref={menuButtonRef}
                className="sm:hidden"
                onClick={() => {
                  setMenuOpen((open) => !open);
                  setThemeMenuOpen(false);
                }}
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
          ref={mobileMenuRef}
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
                  href={"#" + s}
                  onClick={(event) => {
                    event.preventDefault();
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

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
    </svg>
  );
}
