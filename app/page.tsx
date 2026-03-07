"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import NextImage from "next/image";
import TypedText from "@/components/TypedText";
import Counter from "@/components/Counter";
import FadeUp from "@/components/FadeUp";

// ─── Data ──────────────────────────────────────────────────────────────────────

const skills = [
  { category: "Languages", items: ["JavaScript", "Python", "PHP", "Dart"], icon: "{ }" },
  { category: "Frameworks", items: ["Laravel", "Next.js", "Flask API", "Flutter"], icon: "⌥" },
  { category: "Frontend", items: ["Tailwind CSS", "Bootstrap", "CSS"], icon: "◈" },
  { category: "Tools & DB", items: ["MySQL", "Git", "GitHub", "Figma", "Canva", "Selenium", "Laragon", "XAMPP", "MS Office"], icon: "⚙" },
];

const projects = [
  {
    title: "Sentiment Analysis Dashboard",
    period: "Oct 2024 – Jul 2025",
    tag: "Final Project",
    desc: "Conducted sentiment analysis on TikTok public opinion data using Python, Selenium and machine learning models trained on labeled data. Developed a Laravel–Flask dashboard to visualize and evaluate sentiment trends.",
    stack: ["Python", "Selenium", "Laravel", "Flask-API", "MySQL", "Machine Learning", "JavaScript", "CSS", "Tailwind", "XAMPP", "Git", "Github"],
  },
  {
    title: "Data Recapitulation System",
    period: "Feb – Aug 2024",
    tag: "KPU RI",
    desc: "Developed a prototype web-based recapitulation system for PPK and PPS membership data using dummy datasets, based on SIAKBA workflow references, implemented with Laravel and MySQL for structured data organization.",
    stack: ["Laravel", "MySQL", "XAMPP", "JavaScript", "CSS", "Git", "Github"],
  },
  {
    title: "Car Rental Information System Design",
    period: "Aug 2023 – Nov 2023",
    tag: "Academic",
    desc: "Designed a car rental information system in Figma, focusing on interface structure, user workflows, and feature planning.",
    stack: ["Figma"],
  },
  {
    title: "History & Philosophy Info System",
    period: "Feb 2023 – May 2023",
    tag: "Academic",
    desc: "Developed a web-based information system using Laravel, XAMPP, and TailwindCSS to present structured historical and philosophical content with a responsive and user-friendly interface.",
    stack: ["Laravel", "Tailwind", "MySQL", "XAMPP", "CSS", "Git", "Github"],
  },
  {
    title: "Coffee Shop Reservation",
    period: "Feb 2023 – Mar 2023",
    tag: "Academic",
    desc: "Build a Simple reservation website enabling customers to place orders online using PHP native and Bootstrap.",
    stack: ["PHP Native", "Laragon", "MySQL", "Bootstrap", "CSS", "Git", "Github"],
  },
  {
    title: "Personal Portfolio Website",
    period: "Nov – Dec 2022",
    tag: "Self-Project",
    desc: "Created a responsive personal portfolio built with Next.js and Tailwind CSS to showcase projects.",
    stack: ["Next.js", "Tailwind", "JavaScript", "CSS", "Git", "Github"],
  },
];

const experience = [
  {
    role: "Internship — Center for Data & IT",
    company: "Secretariat General of KPU RI",
    period: "Feb 2024 – Sep 2024",
    desc: "Supported data processing, administrative coordination, and technical documentation for electoral information management.",
  },
  { role: "Event Crew | Runner", company: "PT Fasen Creative Quality × Tokopedia", period: "March 2024", desc: "Supported on-site operations during Tokopedia Ramadan Extra 2024 Flash Sale. Assisted with logistics and coordination." },
];

const certifications = [
  { name: "National Professional Certification in Web Development", issuer: "BNSP" },
  { name: "TOEFL Institutional Testing Program (ITP)", issuer: "Score: 450" },
  { name: "DSF 46 Faculty of Data: Data Engineer", issuer: "Dibimbing.id" },
  { name: "Digital Skill Fair 10.0 — Web Development BackEnd", issuer: "Dibimbing.id" },
  { name: "Softskill Training & Character Building", issuer: "Tandaseru Indonesia" },
  { name: "The Complete Android 12 & Kotlin Masterclass", issuer: "Udemy" },
  { name: "Web Development Courses (HTML, PHP, JavaScript)", issuer: "Sololearn" },
  { name: "HTML Tutorial for Beginners", issuer: "Udemy" },
];

// ─── UI Primitives ─────────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 18, height: 1, backgroundColor: "var(--accent)", opacity: 0.4 }} />
        <p style={{ fontSize: "0.59rem", fontWeight: 700, letterSpacing: "0.27em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.65 }}>{eyebrow}</p>
      </div>
      <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "clamp(1.7rem, 4vw, 2.1rem)", color: "var(--text-primary)", fontWeight: 400, lineHeight: 1.15 }}>{title}</h2>
    </div>
  );
}

function TagBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 9px",
        fontSize: "0.58rem",
        fontWeight: 700,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        borderRadius: 999,
        backgroundColor: "var(--accent-glow)",
        color: "var(--accent)",
        border: "1px solid var(--line-color-mid)",
      }}
    >
      {children}
    </span>
  );
}

function StackChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 9px",
        fontSize: "0.68rem",
        borderRadius: 6,
        backgroundColor: "var(--bg-subtle)",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ flex: 1, height: 1, backgroundColor: "var(--border)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--border-mid)" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.4 }} />
        <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--border-mid)" }} />
      </div>
      <div style={{ flex: 1, height: 1, backgroundColor: "var(--border)" }} />
    </div>
  );
}

// ─── CornerBrackets ────────────────────────────────────────────────────────────

interface BRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function CornerBrackets({ rect, pad = 14, drawn, delay = 0, cl = 22 }: { rect: BRect; pad?: number; drawn: boolean; delay?: number; cl?: number }) {
  const x = rect.left - pad,
    y = rect.top - pad;
  const w = rect.width + pad * 2,
    h = rect.height + pad * 2;
  const c = Math.min(cl, w * 0.28, h * 0.28);
  const len = c * 2;
  const corners = [
    { d: `M${x + c},${y} L${x},${y} L${x},${y + c}`, t: 0 },
    { d: `M${x + w - c},${y} L${x + w},${y} L${x + w},${y + c}`, t: 0.07 },
    { d: `M${x + w},${y + h - c} L${x + w},${y + h} L${x + w - c},${y + h}`, t: 0.14 },
    { d: `M${x + c},${y + h} L${x},${y + h} L${x},${y + h - c}`, t: 0.21 },
  ];
  return (
    <>
      {corners.map((corner, i) => (
        <path
          key={i}
          d={corner.d}
          fill="none"
          stroke="var(--line-color)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: len,
            strokeDashoffset: drawn ? 0 : len,
            opacity: drawn ? 1 : 0,
            transition: drawn ? `stroke-dashoffset 0.38s cubic-bezier(0.4,0,0.2,1) ${delay + corner.t}s, opacity 0.12s ease ${delay + corner.t}s` : "none",
          }}
        />
      ))}
    </>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  interface Rects {
    heading: BRect | null;
    body: BRect | null;
    photo: BRect | null;
  }
  const [rects, setRects] = useState<Rects>({ heading: null, body: null, photo: null });
  const [fromRect, setFromRect] = useState<BRect | null>(null);
  const [phase, setPhase] = useState<"idle" | "zoom-in" | "hold" | "zoom-out" | "done">("idle");

  const ZOOM_W = 258;
  const ZOOM_H = 338;

  const calcRects = useCallback(() => {
    if (!heroRef.current) return;
    const base = heroRef.current.getBoundingClientRect();
    const rel = (el: HTMLElement | null): BRect | null => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { top: b.top - base.top, left: b.left - base.left, width: b.width, height: b.height };
    };
    setRects({ heading: rel(headingRef.current), body: rel(bodyRef.current), photo: rel(photoRef.current) });
  }, []);

  useEffect(() => {
    const init = setTimeout(() => {
      calcRects();
      if (!photoRef.current) return;
      const r = photoRef.current.getBoundingClientRect();
      setFromRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      photoRef.current.style.opacity = "0";
      photoRef.current.style.transition = "opacity 0.5s ease";

      const t1 = setTimeout(() => setPhase("zoom-in"), 80);
      const t2 = setTimeout(() => setPhase("hold"), 950);
      const t3 = setTimeout(() => setPhase("zoom-out"), 2200);
      const t4 = setTimeout(() => {
        setPhase("done");
        if (photoRef.current) photoRef.current.style.opacity = "1";
      }, 3100);
      return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, 200);
    window.addEventListener("resize", calcRects);
    return () => {
      clearTimeout(init);
      window.removeEventListener("resize", calcRects);
    };
  }, [calcRects]);

  const isCenter = phase === "zoom-in" || phase === "hold";
  const linesDrawn = phase === "hold" || phase === "zoom-out" || phase === "done";
  const isDone = phase === "done";
  const showClone = !isDone && phase !== "idle" && !!fromRect;
  const toRect = typeof window !== "undefined" ? { top: window.innerHeight / 2 - ZOOM_H / 2, left: window.innerWidth / 2 - ZOOM_W / 2, width: ZOOM_W, height: ZOOM_H } : fromRect;
  const cloneRect = isCenter ? toRect : fromRect;

  return (
    <>
      {/* ── BACKDROP ─────────────────────────────────────────────────────── */}
      {showClone && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            pointerEvents: "none",
            backgroundColor: "rgba(0,0,0,0.78)",
            backdropFilter: isCenter ? "blur(10px) saturate(0.6)" : "none",
            WebkitBackdropFilter: isCenter ? "blur(10px) saturate(0.6)" : "none",
            opacity: isCenter ? 1 : 0,
            transition: "opacity 0.65s ease",
          }}
        />
      )}

      {/* ── PHOTO CLONE ──────────────────────────────────────────────────── */}
      {showClone && cloneRect && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            pointerEvents: "none",
            top: cloneRect.top,
            left: cloneRect.left,
            width: cloneRect.width,
            height: cloneRect.height,
            borderRadius: isCenter ? "1.5rem" : "1.25rem",
            overflow: "hidden",
            border: `1px solid ${isCenter ? "rgba(255,255,255,0.12)" : "var(--border)"}`,
            boxShadow: isCenter ? "0 64px 160px rgba(0,0,0,0.65), 0 20px 50px rgba(0,0,0,0.35)" : "0 4px 16px rgba(0,0,0,0.1)",
            transition: [
              "top           0.92s cubic-bezier(0.34,1.06,0.64,1)",
              "left          0.92s cubic-bezier(0.34,1.06,0.64,1)",
              "width         0.92s cubic-bezier(0.34,1.06,0.64,1)",
              "height        0.92s cubic-bezier(0.34,1.06,0.64,1)",
              "border-radius 0.6s ease",
              "box-shadow    0.6s ease",
            ].join(", "),
          }}
        >
          <NextImage src="/furqan.jpg" alt="Furqan" fill priority style={{ objectFit: "cover", objectPosition: "center 8%", transform: "scale(1.05)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.5) 100%)" }} />
          {/* Name tag */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "1.5rem 1.25rem 1.25rem",
              opacity: phase === "hold" ? 1 : 0,
              transform: phase === "hold" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
            }}
          >
            <p style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>Full-Stack Developer</p>
            <p style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.3rem", color: "rgba(255,255,255,0.92)", fontWeight: 400 }}>Furqan</p>
          </div>
        </div>
      )}

      {/* ── PAGE SHELL ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-32" style={{ display: "flex", flexDirection: "column", gap: "6.5rem" }}>
        {/* ══════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════ */}
        <section ref={heroRef} style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
          {/* SVG corner bracket overlay */}
          {(rects.heading || rects.body || rects.photo) && (
            <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 1 }}>
              {rects.heading && <CornerBrackets rect={rects.heading} pad={16} cl={22} drawn={linesDrawn} delay={0} />}
              {rects.body && <CornerBrackets rect={rects.body} pad={16} cl={20} drawn={linesDrawn} delay={0.3} />}
              {rects.photo && <CornerBrackets rect={rects.photo} pad={24} cl={28} drawn={linesDrawn} delay={0.6} />}
            </svg>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-10 sm:gap-16" style={{ position: "relative", zIndex: 2 }}>
            {/* LEFT — text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Status */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "5px 13px",
                  borderRadius: 999,
                  marginBottom: "2rem",
                  fontSize: "0.71rem",
                  fontWeight: 500,
                  backgroundColor: "rgba(16,185,129,0.07)",
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.15)",
                }}
              >
                <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#10b981", opacity: 0.5, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
                  <span style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", backgroundColor: "#10b981" }} />
                </span>
                Available for work
              </div>

              {/* BRACKET 1 — heading */}
              <div ref={headingRef}>
                <h1
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "clamp(2.9rem, 9vw, 5.6rem)",
                    lineHeight: 0.97,
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    marginBottom: "0.7rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Hi, I&apos;m
                  <br />
                  <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Furqan.</em>
                </h1>
                <div style={{ fontSize: "1rem", fontWeight: 300, height: 28, color: "var(--text-secondary)" }}>
                  <TypedText />
                </div>
              </div>

              <div style={{ height: "2.25rem" }} />

              {/* BRACKET 2 — body */}
              <div ref={bodyRef}>
                <p style={{ maxWidth: 410, lineHeight: 1.82, fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.4rem" }}>
                  Graduate of Informatics Engineering from Politeknik Negeri Lhokseumawe. I build structured, efficient web systems — with hands-on experience in data processing, sentiment analysis, and full-stack development.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.4rem" }}>
                  {[
                    { icon: "✉", label: "furqansykss@gmail.com", href: "mailto:furqansykss@gmail.com" },
                    { icon: "↗", label: "LinkedIn", href: "https://linkedin.com/in/fur-qan-6b1b87242" },
                    { icon: "◎", label: "East Jakarta", href: null },
                  ].map((c) => {
                    const base: React.CSSProperties = {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 11px",
                      borderRadius: 8,
                      fontSize: "0.71rem",
                      fontWeight: 500,
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    };
                    return c.href ? (
                      <a
                        key={c.label}
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener"
                        style={base}
                        className="lnk"
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                      >
                        <span style={{ opacity: 0.38, fontSize: "0.75rem" }}>{c.icon}</span>
                        {c.label}
                      </a>
                    ) : (
                      <span key={c.label} style={base}>
                        <span style={{ opacity: 0.38, fontSize: "0.75rem" }}>{c.icon}</span>
                        {c.label}
                      </span>
                    );
                  })}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <a
                    href="#projects"
                    className="btn-p"
                    style={{
                      display: "inline-block",
                      padding: "10px 22px",
                      borderRadius: 10,
                      fontSize: "0.84rem",
                      fontWeight: 600,
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                      textDecoration: "none",
                    }}
                  >
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="btn-o"
                    style={{
                      display: "inline-block",
                      padding: "10px 22px",
                      borderRadius: 10,
                      fontSize: "0.84rem",
                      fontWeight: 600,
                      border: "1px solid var(--border-mid)",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — photo */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ position: "relative", width: 204, height: 264 }} className="sm:w-[218px] sm:h-[284px]">
                {/* glow */}
                <div style={{ position: "absolute", inset: -18, borderRadius: "2rem", background: "radial-gradient(circle, var(--accent-glow), transparent 65%)", filter: "blur(26px)", opacity: 0.85 }} />
                {/* photo wrapper — bracket 3 ref */}
                <div
                  ref={photoRef}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    border: "1px solid var(--border-mid)",
                    boxShadow: "var(--shadow-lg)",
                    transition: "opacity 0.5s ease",
                  }}
                >
                  <NextImage src="/furqan.jpg" alt="Furqan" fill priority style={{ objectFit: "cover", objectPosition: "center 8%", transform: "scale(1.06)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "38%", background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)", pointerEvents: "none" }} />
                </div>
                {/* Badge — 3+ */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -14,
                    right: -14,
                    padding: "9px 13px",
                    borderRadius: 14,
                    textAlign: "center",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.35rem", lineHeight: 1, color: "var(--accent)" }}>3+</div>
                  <div style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 2 }}>yrs exp</div>
                </div>
                {/* Badge — open */}
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: -14,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 11px",
                    borderRadius: 12,
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6 }}>
                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#10b981", opacity: 0.5, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
                    <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10b981" }} />
                  </span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "var(--text-secondary)" }}>Open to work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 7,
              opacity: isDone ? 1 : 0,
              transition: "opacity 0.8s ease 0.7s",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontSize: "0.51rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-faint)" }}>scroll</span>
            <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, var(--border-mid), transparent)" }} />
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            STATS — seamless connected grid, no individual cards
        ══════════════════════════════════════════════════════════════════ */}
        <FadeUp>
          <div style={{ borderRadius: "1rem", border: "1px solid var(--border)", overflow: "hidden", display: "grid", gridTemplateColumns: "repeat(2,1fr)" }} className="sm:grid-cols-4">
            {[
              { target: 6, label: "Projects Built", note: "across industries" },
              { target: 3, label: "Years Learning", note: "continuous growth" },
              { target: 2, label: "Internships", note: "industry exposure" },
              { target: 8, label: "Certifications", note: "verified skills" },
            ].map((s, i) => (
              <FadeUp key={s.label} delay={i * 80}>
                <div
                  style={{
                    padding: "2rem 1.4rem",
                    textAlign: "center",
                    backgroundColor: "var(--bg-card)",
                    borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                  }}
                  className={`sm:border-b-0 ${i < 3 ? "sm:border-r" : ""}`}
                >
                  <Counter target={s.target} label={s.label} />
                  <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>{s.note}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SKILLS — asymmetric 2-row layout
            Row 1: Languages (5fr) | Frameworks (7fr)
            Row 2: Frontend (4fr)  | Tools (8fr)
        ══════════════════════════════════════════════════════════════════ */}
        <FadeUp>
          <section id="skills">
            <SectionHeader eyebrow="Capabilities" title="Tech Stack" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "grid", gap: 10 }} className="sm:grid-cols-[5fr_7fr] grid-cols-1">
                {skills.slice(0, 2).map((g, i) => (
                  <FadeUp key={g.category} delay={i * 65}>
                    <SkillCard group={g} />
                  </FadeUp>
                ))}
              </div>
              <div style={{ display: "grid", gap: 10 }} className="sm:grid-cols-[4fr_8fr] grid-cols-1">
                {skills.slice(2).map((g, i) => (
                  <FadeUp key={g.category} delay={(i + 2) * 65}>
                    <SkillCard group={g} />
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>
        <Divider />
        <FadeUp>
          <section id="projects">
            <SectionHeader eyebrow="Portfolio" title="Projects" />

            {/* The grid parent — cards go directly here, no FadeUp wrappers */}
            <div
              className="bento-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {/* ── [0] FEATURED — col 1+2 ────────────────────────────────── */}
              <div
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "1 / 3",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.7rem",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 220,
                  animationDelay: "0ms",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <TagBadge>{projects[0].tag}</TagBadge>
                      <span style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.4 }}>Featured</span>
                    </div>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{projects[0].period}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontSize: "1.25rem",
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    {projects[0].title}
                  </h3>
                  <p style={{ fontSize: "0.84rem", lineHeight: 1.78, color: "var(--text-secondary)" }}>{projects[0].desc}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {projects[0].stack.map((s) => (
                      <StackChip key={s}>{s}</StackChip>
                    ))}
                  </div>
                  <div
                    style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, marginLeft: 12, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ── [1] col 3, row 1 ──────────────────────────────────────── */}
              <div
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "3 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.4rem",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: "65ms",
                }}
              >
                <div>
                  <div style={{ marginBottom: 10 }}>
                    <TagBadge>{projects[1].tag}</TagBadge>
                    <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 6 }}>{projects[1].period}</p>
                  </div>
                  <h3 style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.35 }}>{projects[1].title}</h3>
                  <p style={{ fontSize: "0.79rem", lineHeight: 1.72, color: "var(--text-secondary)" }}>{projects[1].desc}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14 }}>
                  {projects[1].stack.map((s) => (
                    <StackChip key={s}>{s}</StackChip>
                  ))}
                </div>
              </div>

              {/* ── [2] col 1, row 2 ──────────────────────────────────────── */}
              <div
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "1 / 2",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: "120ms",
                }}
              >
                <div>
                  <div style={{ marginBottom: 9 }}>
                    <TagBadge>{projects[2].tag}</TagBadge>
                    <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 6 }}>{projects[2].period}</p>
                  </div>
                  <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>{projects[2].title}</h3>
                  <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>{projects[2].desc}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
                  {projects[2].stack.map((s) => (
                    <StackChip key={s}>{s}</StackChip>
                  ))}
                </div>
              </div>

              {/* ── [3] col 2, row 2 ──────────────────────────────────────── */}
              <div
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "2 / 3",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: "175ms",
                }}
              >
                <div>
                  <div style={{ marginBottom: 9 }}>
                    <TagBadge>{projects[3].tag}</TagBadge>
                    <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 6 }}>{projects[3].period}</p>
                  </div>
                  <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>{projects[3].title}</h3>
                  <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>{projects[3].desc}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
                  {projects[3].stack.map((s) => (
                    <StackChip key={s}>{s}</StackChip>
                  ))}
                </div>
              </div>

              {/* ── [4] col 3, row 2 ──────────────────────────────────────── */}
              <div
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "3 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: "230ms",
                }}
              >
                <div>
                  <div style={{ marginBottom: 9 }}>
                    <TagBadge>{projects[4].tag}</TagBadge>
                    <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 6 }}>{projects[4].period}</p>
                  </div>
                  <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>{projects[4].title}</h3>
                  <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>{projects[4].desc}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
                  {projects[4].stack.map((s) => (
                    <StackChip key={s}>{s}</StackChip>
                  ))}
                </div>
              </div>

              {/* ── [5] LAST — full width, horizontal layout ──────────────── */}
              <div
                className="proj-card bento-reveal bento-last"
                style={{
                  gridColumn: "1 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.15rem 1.5rem",
                  cursor: "default",
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  animationDelay: "285ms",
                }}
              >
                {/* Meta block */}
                <div style={{ flexShrink: 0, paddingRight: "1.5rem" }}>
                  <TagBadge>{projects[5].tag}</TagBadge>
                  <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 5 }}>{projects[5].period}</p>
                </div>
                {/* Vertical separator */}
                <div className="bento-sep" style={{ width: 1, alignSelf: "stretch", backgroundColor: "var(--border)", flexShrink: 0, marginRight: "1.5rem" }} />
                {/* Title + desc */}
                <div style={{ flex: 1, minWidth: 0, paddingRight: "1.5rem" }}>
                  <h3 style={{ fontSize: "0.87rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 3, lineHeight: 1.3 }}>{projects[5].title}</h3>
                  <p style={{ fontSize: "0.77rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{projects[5].desc}</p>
                </div>
                {/* Stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, flexShrink: 0, justifyContent: "flex-end" }}>
                  {projects[5].stack.map((s) => (
                    <StackChip key={s}>{s}</StackChip>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            EXPERIENCE — timeline with ring nodes
        ══════════════════════════════════════════════════════════════════ */}
        <FadeUp>
          <section id="experience">
            <SectionHeader eyebrow="Career" title="Experience" />
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Vertical connector line */}
              <div style={{ position: "absolute", top: 20, bottom: 20, left: 10, width: 1, backgroundColor: "var(--border)" }} />
              {experience.map((e, i) => (
                <FadeUp key={i} delay={i * 100}>
                  <div style={{ display: "flex", gap: 22, paddingBottom: i < experience.length - 1 ? "0.85rem" : 0 }}>
                    {/* Ring node */}
                    <div style={{ flexShrink: 0, paddingTop: 4, zIndex: 1 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "var(--bg-card)",
                          border: `2px solid var(--accent)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 0 0 4px var(--bg)",
                        }}
                      >
                        <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--accent)" }} />
                      </div>
                    </div>
                    {/* Card */}
                    <div
                      className="exp-card"
                      style={{
                        flex: 1,
                        padding: "1.2rem 1.4rem",
                        borderRadius: "1rem",
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        marginBottom: i < experience.length - 1 ? "0.5rem" : 0,
                      }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "5px 12px", marginBottom: 3 }}>
                        <h3 style={{ fontSize: "0.87rem", fontWeight: 600, color: "var(--text-primary)" }}>{e.role}</h3>
                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{e.period}</span>
                      </div>
                      <p style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--accent)", opacity: 0.75, marginBottom: 8 }}>{e.company}</p>
                      <p style={{ fontSize: "0.82rem", lineHeight: 1.74, color: "var(--text-secondary)" }}>{e.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            EDUCATION + LANGUAGES — 3fr | 2fr side by side
        ══════════════════════════════════════════════════════════════════ */}
        <FadeUp>
          <div style={{ display: "grid", gap: "2.5rem", alignItems: "start" }} className="grid-cols-1 sm:grid-cols-[3fr_2fr]">
            {/* Education */}
            <FadeUp delay={0}>
              <section id="education">
                <SectionHeader eyebrow="Background" title="Education" />
                <div
                  style={{
                    padding: "1.4rem",
                    borderRadius: "1rem",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3L2 9l10 6 10-6-10-6zM2 17l10 6 10-6M2 13l10 6 10-6" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>Informatics Engineering — D-IV</h3>
                    <p style={{ fontSize: "0.74rem", fontWeight: 500, color: "var(--accent)", opacity: 0.75, marginBottom: 9 }}>Politeknik Negeri Lhokseumawe</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {["2021 – 2025", "GPA 3.15 / 4.00"].map((t) => (
                        <span key={t} style={{ fontSize: "0.7rem", padding: "2px 9px", borderRadius: 6, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </FadeUp>

            {/* Languages */}
            <FadeUp delay={100}>
              <section>
                <SectionHeader eyebrow="Communication" title="Languages" />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { lang: "Indonesian", level: "Native", pct: 100 },
                    { lang: "English", level: "Intermediate · TOEFL 450", pct: 65 },
                  ].map((l, i) => (
                    <FadeUp key={l.lang} delay={i * 90}>
                      <div style={{ padding: "1.1rem 1.25rem", borderRadius: "1rem", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <span style={{ fontSize: "0.87rem", fontWeight: 500, color: "var(--text-primary)" }}>{l.lang}</span>
                          <span style={{ fontSize: "0.64rem", color: "var(--text-muted)" }}>{l.level}</span>
                        </div>
                        <div style={{ height: 3, width: "100%", backgroundColor: "var(--bg-subtle)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${l.pct}%`, borderRadius: 99, backgroundColor: "var(--accent)", opacity: 0.5 }} />
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </section>
            </FadeUp>
          </div>
        </FadeUp>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            CERTIFICATIONS — 2-col, numbered boxes, slide-right on hover
        ══════════════════════════════════════════════════════════════════ */}
        <FadeUp>
          <section id="certifications">
            <SectionHeader eyebrow="Credentials" title="Certifications" />
            <div style={{ display: "grid", gap: 8 }} className="grid-cols-1 sm:grid-cols-2">
              {certifications.map((c, i) => (
                <FadeUp key={c.name} delay={i * 42}>
                  <div
                    className="cert-row"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 13,
                      padding: "12px 14px",
                      borderRadius: 11,
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      cursor: "default",
                    }}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.54rem", fontWeight: 700, fontFamily: "monospace", color: "var(--accent)", opacity: 0.55 }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "0.81rem", fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)" }}>{c.name}</p>
                      <p style={{ fontSize: "0.67rem", marginTop: 3, color: "var(--text-muted)" }}>{c.issuer}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════════════════════════════ */}
        <FadeUp>
          <section id="contact">
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, padding: "5rem 2rem", textAlign: "center", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div style={{ position: "absolute", top: -80, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, var(--accent-glow), transparent 65%)", opacity: 0.7, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -60, left: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, var(--accent-glow), transparent 65%)", opacity: 0.4, pointerEvents: "none" }} />
              {/* Corner marks */}
              <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                <path d="M20,16 L12,16 L12,24" fill="none" stroke="var(--line-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12,calc(100% - 24px) L12,calc(100% - 16px) L20,calc(100% - 16px)" fill="none" stroke="var(--line-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ height: 1, width: 22, backgroundColor: "var(--accent)", opacity: 0.35 }} />
                  <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6 }}>Get in touch</p>
                  <div style={{ height: 1, width: 22, backgroundColor: "var(--accent)", opacity: 0.35 }} />
                </div>
                <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.85rem", lineHeight: 1.1 }}>Let&apos;s Work Together</h2>
                <p style={{ maxWidth: 360, margin: "0 auto 2.5rem", fontSize: "0.87rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                  Open to freelance projects, collaborations, or full-time opportunities. Let&apos;s build something meaningful.
                </p>
                <a
                  href="mailto:furqansykss@gmail.com"
                  className="btn-p"
                  style={{
                    display: "inline-block",
                    padding: "12px 32px",
                    borderRadius: 12,
                    fontSize: "0.87rem",
                    fontWeight: 600,
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                    textDecoration: "none",
                  }}
                >
                  furqansykss@gmail.com
                </a>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 28, fontSize: "0.73rem", color: "var(--text-muted)" }}>
                  <a href="https://linkedin.com/in/fur-qan-6b1b87242" target="_blank" rel="noopener" className="lnk" style={{ textDecoration: "none", color: "var(--text-muted)" }}>
                    LinkedIn ↗
                  </a>
                  <span style={{ color: "var(--border-mid)" }}>·</span>
                  <span>+62 822-385-84400</span>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>
      </div>
    </>
  );
}

// ─── SkillCard ─────────────────────────────────────────────────────────────────

function SkillCard({ group }: { group: { category: string; icon: string; items: string[] } }) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        padding: "1.2rem",
        height: "100%",
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.85rem" }}>
        <span style={{ fontSize: "0.72rem", color: "var(--accent)", opacity: 0.45, fontFamily: "monospace", letterSpacing: "0.05em" }}>{group.icon}</span>
        <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.62 }}>{group.category}</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {group.items.map((item) => (
          <span
            key={item}
            className="skill-chip"
            style={{
              padding: "3px 10px",
              borderRadius: 7,
              fontSize: "0.78rem",
              backgroundColor: "var(--bg-subtle)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
