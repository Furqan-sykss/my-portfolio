"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
        // Cari entry yang paling banyak terlihat di viewport
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        // rootMargin: potong 30% dari atas (navbar area) dan 40% dari bawah
        // sehingga section dianggap "aktif" saat bagian tengahnya terlihat
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );
    sectionEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", handleClickOutside);
      observer.disconnect();
    };
  }, [menuOpen]);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const nowDark = html.classList.contains("dark");
    setIsDark(nowDark);
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  };

  const links = ["projects", "experience", "certifications", "contact"];

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
                  href={`#${s}`}
                  style={{
                    textDecoration: "none",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    transition: "color 0.2s ease",
                    fontWeight: isActive ? 600 : 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "var(--accent)" : "var(--text-muted)")}
                >
                  {s}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
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
              <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden flex flex-col gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                outline: "none",
                transition: "background-color 0.2s ease",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-subtle)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-subtle)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 20,
                    height: 2,
                    backgroundColor: "var(--text-secondary)",
                    borderRadius: 2,
                    transition: "all 0.25s ease",
                    transform: menuOpen ? (i === 0 ? "translateY(6px) rotate(45deg)" : i === 2 ? "translateY(-6px) rotate(-45deg)" : "scaleX(0)") : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? "500px" : "0",
            transition: "max-height 0.35s ease",
            backgroundColor: "var(--bg-card)",
            borderTop: menuOpen ? "1px solid var(--border)" : "none",
          }}
        >
          <nav className="sm:hidden px-5 py-4 flex flex-col gap-2">
            {links.map((s) => {
              const isActive = activeSection === s;
              return (
                <a
                  key={s}
                  href={`#${s}`}
                  onClick={() => setMenuOpen(false)}
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
                      (e.currentTarget as HTMLElement).style.borderLeft = "3px solid var(--accent)";
                      (e.currentTarget as HTMLElement).style.paddingLeft = "9px";
                    }
                  }}
                  onBlur={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.borderLeft = "none";
                      (e.currentTarget as HTMLElement).style.paddingLeft = "12px";
                    }
                  }}
                >
                  {s}
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
