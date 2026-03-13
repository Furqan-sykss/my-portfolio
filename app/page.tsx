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
    title: "Sentiment Analysis of the Attorney General's Office's Performance",
    period: "Oct 2024 – Jul 2025",
    tag: "Final Project",
    desc: "Conducted sentiment analysis on TikTok public opinion data regarding the Attorney General's Office performance, using Python and Selenium for data collection and machine learning for classification. Delivered results through an integrated Laravel–Flask dashboard.",
    stack: ["Python", "Selenium", "Scraping", "Laravel", "Flask-API", "MySQL", "Machine Learning", "JavaScript", "CSS", "Tailwind", "XAMPP", "Git", "Github"],
    detail: {
      highlights: [
        "Collected over thousands of TikTok comments via automated web scraping using Python & Selenium",
        "Trained and evaluated multiple machine learning models for Indonesian-language sentiment classification",
        "Built a REST API bridge between Flask (ML engine) and Laravel (web dashboard)",
        "Developed an interactive dashboard with real-time sentiment trend visualizations and performance metrics",
        "Applied data preprocessing techniques including tokenization, stopword removal, and TF-IDF vectorization",
      ],
      links: [
        { label: "GitHub", href: "https://github.com/Furqan-sykss/Laravel-sentiment-kejagung", icon: "github" },
        { label: "Google Drive", href: "https://drive.google.com/drive/folders/1GJphNTDR8rLGia2Ze8s1n6zV6V1Nc6VA?usp=sharing", icon: "drive" },
      ],
    },
  },
  {
    title: "Data Recapitulation System",
    period: "Feb 2024 – Aug 2024",
    tag: "KPU RI",
    desc: "Developed a prototype web-based recapitulation system for PPK and PPS electoral body membership data during an internship at the Secretariat General of KPU RI, based on SIAKBA workflow references and built with Laravel and MySQL.",
    stack: ["Laravel", "MySQL", "XAMPP", "JavaScript", "CSS", "Git", "Github"],
    detail: {
      highlights: [
        "Designed and built a prototype recapitulation system for PPK & PPS ad-hoc body membership data (KIP Aceh)",
        "Analyzed the official SIAKBA system workflow as the primary reference for system architecture",
        "Implemented role-based access for National Admin, Provincial Admin, and District Operator",
        "Developed data validation logic to prevent cross-region data entry errors",
        "Produced comprehensive recapitulation reports with chart visualizations per district and sub-district",
      ],
      links: [
        { label: "GitHub", href: "https://github.com/Furqan-sykss/siakba", icon: "github" },
        { label: "Wireframe (Figma)", href: "https://www.figma.com/design/tA7R82I0PJWt3K05d93f0E/Wireframe--Based-on-SIAKBA-Project--?node-id=0-1&t=ERBAlDshXXiCShwP-1", icon: "figma" },
        { label: "Google Drive", href: "https://drive.google.com/drive/folders/1kkZ7vN0Gf6zV3KUKFzoIBgeujkCfRp6Y?usp=sharing", icon: "drive" },
      ],
    },
  },
  {
    title: "Car Rental Information System Design",
    period: "Aug 2023 – Nov 2023",
    tag: "Academic",
    desc: "Designed a comprehensive car rental information system in Figma, covering user interface structure, end-to-end user workflows, and interactive prototype for rental booking and management features.",
    stack: ["Figma"],
    detail: {
      highlights: [
        "Designed full UI/UX prototype covering vehicle browsing, booking, and payment flows",
        "Created wireframes, high-fidelity mockups, and interactive prototype in Figma",
        "Defined user personas and mapped end-to-end user journeys for both customers and admins",
      ],
      links: [{ label: "Figma Design", href: "https://www.figma.com/design/h08W9Bf5GYRqWp2c586C0c/Rental-Car-Design?node-id=0-1&t=KWynD5QTHq7jhNhg-1", icon: "figma" }],
    },
  },
  {
    title: "History & Philosophy Info System",
    period: "Feb 2023 – May 2023",
    tag: "Academic",
    desc: "Developed a web-based information system using Laravel, XAMPP, and Tailwind CSS to present structured historical and philosophical content with a clean, responsive interface.",
    stack: ["Laravel", "Tailwind", "MySQL", "XAMPP", "CSS", "Git", "Github"],
    detail: {
      highlights: [
        "Built a full-stack web information system for historical and philosophical content",
        "Implemented a responsive UI with Tailwind CSS, optimized for both desktop and mobile",
        "Structured content management with Laravel's MVC architecture and MySQL database",
      ],
      links: [
        { label: "GitHub", href: "https://github.com/Furqan-sykss/laravel-amerta", icon: "github" },
        { label: "Figma Design", href: "https://www.figma.com/design/fxOiuvB9lH1azJ80ukRjkz/home-desktop-web-amerta-season-2-?node-id=0-1&t=bDoqw3kSCwiuAts9-1", icon: "figma" },
      ],
    },
  },
  {
    title: "Coffee Shop Reservation",
    period: "Feb 2023 – Mar 2023",
    tag: "Academic",
    desc: "Built a simple online reservation website for a coffee shop, enabling customers to browse the menu and place orders directly through the web using PHP native and Bootstrap.",
    stack: ["PHP Native", "Laragon", "MySQL", "Bootstrap", "CSS", "Git", "Github"],
    detail: {
      highlights: [
        "Developed an online reservation and ordering system using PHP native without a framework",
        "Implemented a menu display, order cart, and booking form connected to a MySQL database",
        "Styled with Bootstrap for a clean and mobile-friendly interface",
      ],
      links: [{ label: "GitHub", href: "https://github.com/Furqan-sykss/2A_praktikum_2021573010051/tree/main/DeCafe", icon: "github" }],
    },
  },
  {
    title: "Personal Portfolio Website",
    period: "Nov 2022 – Dec 2022",
    tag: "Self-Project",
    desc: "Built a responsive personal portfolio website using Next.js and Tailwind CSS to showcase projects, skills, and professional experience.",
    stack: ["Next.js", "Tailwind", "JavaScript", "CSS", "Git", "Github"],
    detail: {
      highlights: ["Designed and developed a fully responsive portfolio with Next.js App Router and Tailwind CSS", "Showcases projects, technical skills, work experience, and certifications"],
      links: [{ label: "GitHub", href: "https://github.com/Furqan-sykss/my-portfolio", icon: "github" }],
    },
  },
];

const experience = [
  {
    role: "Internship — Center for Data & IT",
    company: "Secretariat General of KPU RI",
    period: "Feb 2024 – Sep 2024",
    desc: "Completed a 7-month internship at KPU RI's Center for Data & IT (Pusdatin). Contributed to voter data processing, TPS input across all Indonesian provinces, electoral recapitulation monitoring, and developed a web-based prototype system for ad-hoc electoral body membership data ahead of the 2024 Simultaneous Regional Elections.",
  },
  {
    role: "Event Crew — Runner",
    company: "PT Fasen Creative Quality × Tokopedia",
    period: "March 2024",
    desc: "Supported on-site operations for the Tokopedia Ramadan Extra 2024 Flash Sale event. Responsible for logistics coordination, crowd flow management, and ensuring smooth execution of event activities.",
  },
];

const certifications = [
  {
    name: "National Professional Certification in Web Development",
    issuer: "BNSP",
    year: "2024",
    category: "Professional",
    link: "https://drive.google.com/file/d/1hVjiQ0Ps4sCtMQZMBPA5kYLhE7BrnrEU/view?usp=sharing",
    badge: "★ Verified",
  },
  {
    name: "TOEFL Institutional Testing Program (ITP)",
    issuer: "ETS",
    year: "2024",
    category: "Language",
    score: "Score: 450",
    link: "https://drive.google.com/file/d/1d5n4anePz795cNpg7w9XFBygqo8n3yqf/view?usp=sharing",
    badge: "★ Verified",
  },
  {
    name: "DSF 46 Faculty of Data: Data Engineer",
    issuer: "Dibimbing.id",
    year: "2024",
    category: "Data",
    link: "https://drive.google.com/drive/folders/1sgOCYsZb7D8BU5XhkxtKViYX3FAjnOj2?usp=sharing",
  },
  {
    name: "Digital Skill Fair 10.0 — Web Development BackEnd",
    issuer: "Dibimbing.id",
    year: "2023",
    category: "Web Dev",
    link: "https://drive.google.com/drive/folders/1sgOCYsZb7D8BU5XhkxtKViYX3FAjnOj2?usp=sharing",
  },
  {
    name: "Softskill Training & Character Building",
    issuer: "Tandaseru Indonesia",
    year: "2023",
    category: "Softskill",
    link: "https://drive.google.com/drive/folders/1sgOCYsZb7D8BU5XhkxtKViYX3FAjnOj2?usp=sharing",
  },
  {
    name: "The Complete Android 12 & Kotlin Masterclass",
    issuer: "Udemy",
    year: "2023",
    category: "Mobile",
    link: "https://drive.google.com/drive/folders/1sgOCYsZb7D8BU5XhkxtKViYX3FAjnOj2?usp=sharing",
  },
  {
    name: "Web Development Courses (HTML, PHP, JavaScript)",
    issuer: "Sololearn",
    year: "2022",
    category: "Web Dev",
    link: "https://drive.google.com/drive/folders/1sgOCYsZb7D8BU5XhkxtKViYX3FAjnOj2?usp=sharing",
  },
  {
    name: "HTML Tutorial for Beginners",
    issuer: "Udemy",
    year: "2022",
    category: "Web Dev",
    link: "https://drive.google.com/drive/folders/1sgOCYsZb7D8BU5XhkxtKViYX3FAjnOj2?usp=sharing",
  },
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

// ─── InstagramChip ─────────────────────────────────────────────────────────────

function InstagramChip({ base }: { base: React.CSSProperties }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* ── Popup ── */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: show ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(5px) scale(0.92)",
          opacity: show ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.18s ease, transform 0.2s cubic-bezier(0.34,1.4,0.64,1)",
          zIndex: 50,
        }}
      >
        {/* Photo circle with Instagram gradient ring */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            padding: 2,
            background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--bg-card)",
            }}
          >
            <NextImage src="/IMG_2245.jpg" alt="@frqann" width={52} height={52} style={{ objectFit: "cover", objectPosition: "center 5%", transform: "scale(1.12)" }} />
          </div>
        </div>

        {/* Username label */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.6rem",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginTop: 5,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          @frqann
        </p>

        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            bottom: -14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid var(--border-mid)",
          }}
        />
      </div>

      {/* ── Chip ── */}
      <a
        href="https://www.instagram.com/frqann?igsh=MTA1ejJ3amhhZTV5cA=="
        target="_blank"
        rel="noopener"
        style={{
          ...base,
          borderColor: show ? "var(--border-strong)" : "var(--border)",
          color: show ? "var(--accent)" : "var(--text-muted)",
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <span style={{ opacity: 0.38, fontSize: "0.75rem" }}>↗</span>
        Instagram
      </a>
    </div>
  );
}

// ─── ProjectModal ──────────────────────────────────────────────────────────────

type ProjectDetail = {
  highlights?: string[];
  links?: { label: string; href: string; icon: string }[];
};
type Project = {
  title: string;
  period: string;
  tag: string;
  desc: string;
  stack: string[];
  detail?: ProjectDetail;
};

function LinkIcon({ icon }: { icon: string }) {
  if (icon === "github")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  if (icon === "figma")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-20H4c-2.208 0-4 1.792-4 4s1.792 4 4 4h4V4zM12 0H8C5.792 0 4 1.792 4 4s1.792 4 4 4h4V0zm4 8c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4v8h4zm-4 2H8c-2.208 0-4 1.792-4 4s1.792 4 4 4h4c2.208 0 4-1.792 4-4s-1.792-4-4-4z" />
      </svg>
    );
  // drive
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.28 0L0 10.91l3.14 5.45L9.42 5.45zm11.44 0H6.28l6.28 10.91h11.44zm-8.3 12L3.14 16.36 6.28 22h11.44l-3.14-5.45zm2.02.91L8.3 22h11.44L24 16.36z" />
    </svg>
  );
}

// ─── useSwipeToDismiss — drag handle swipe-down to close ──────────────────────

function useSwipeToDismiss(onClose: () => void) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
    isDragging.current = true;
    const sheet = sheetRef.current;
    if (sheet) sheet.style.transition = "none";
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy < 0) return; // don't allow dragging up
    currentY.current = dy;
    const sheet = sheetRef.current;
    if (sheet) sheet.style.transform = `translateY(${dy}px)`;
  }, []);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    const sheet = sheetRef.current;
    if (!sheet) return;
    if (currentY.current > 90) {
      // Dismiss — animate out
      sheet.style.transition = "transform 0.28s cubic-bezier(0.4, 0, 1, 1)";
      sheet.style.transform = `translateY(110%)`;
      setTimeout(onClose, 260);
    } else {
      // Snap back
      sheet.style.transition = "transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)";
      sheet.style.transform = "translateY(0)";
    }
  }, [onClose]);

  return { sheetRef, onTouchStart, onTouchMove, onTouchEnd };
}

// ─── Shared close button ───────────────────────────────────────────────────────

function CloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      style={{
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: 8,
        border: "1px solid var(--border)",
        backgroundColor: "var(--bg-subtle)",
        color: "var(--text-muted)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s ease",
        fontSize: "1rem",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-strong)";
        el.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.color = "var(--text-muted)";
      }}
    >
      ✕
    </button>
  );
}

// ─── Shared modal wrapper — bottom-sheet on mobile, centered on desktop ────────

function ModalBackdrop({ onClose, children, maxWidth = 560 }: { onClose: () => void; children: (drag: ReturnType<typeof useSwipeToDismiss>) => React.ReactNode; maxWidth?: number }) {
  const drag = useSwipeToDismiss(onClose);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "flex-end", // bottom-sheet default
        justifyContent: "center",
        padding: 0,
        animation: "mbFadeIn 0.2s ease",
      }}
      // On sm+ screens: center vertically via CSS class
      className="modal-root"
    >
      <style suppressHydrationWarning>{`
        @keyframes mbFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes mbSheetUp { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mbSlideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .modal-root { }
        @media(min-width:600px){
          .modal-root { align-items:center; padding:1rem; }
          .modal-sheet-inner { border-radius:1.35rem !important; animation:mbSlideUp 0.26s cubic-bezier(0.34,1.1,0.64,1) !important; }
          .modal-drag-handle { display:none !important; }
        }
      `}</style>

      <div
        ref={drag.sheetRef}
        className="modal-sheet-inner"
        style={{
          width: "100%",
          maxWidth,
          maxHeight: "92dvh",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-mid)",
          borderRadius: "1.25rem 1.25rem 0 0",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "mbSheetUp 0.3s cubic-bezier(0.32,1.1,0.64,1)",
          willChange: "transform",
        }}
      >
        {/* Drag handle */}
        <div
          className="modal-drag-handle"
          onTouchStart={drag.onTouchStart}
          onTouchMove={drag.onTouchMove}
          onTouchEnd={drag.onTouchEnd}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0 4px",
            cursor: "grab",
            touchAction: "none",
          }}
        >
          <div style={{ width: 36, height: 4, borderRadius: 99, backgroundColor: "var(--border-mid)" }} />
        </div>

        {children(drag)}
      </div>
    </div>
  );
}

// ─── ProjectModal ──────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <ModalBackdrop onClose={onClose} maxWidth={560}>
      {() => (
        <>
          {/* Header */}
          <div style={{ flexShrink: 0, padding: "0.9rem 1.1rem 0.8rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                <TagBadge>{project.tag}</TagBadge>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>{project.period}</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25 }}>{project.title}</h2>
            </div>
            <CloseBtn onClose={onClose} />
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.1rem 2rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <p style={{ fontSize: "0.84rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>{project.desc}</p>

            {project.detail?.highlights && (
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>Highlights</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {project.detail.highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ flexShrink: 0, marginTop: 5, width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.5 }} />
                      <span style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>Tech Stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {project.stack.map((s) => (
                  <StackChip key={s}>{s}</StackChip>
                ))}
              </div>
            </div>

            {project.detail?.links && project.detail.links.length > 0 && (
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>Links</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.detail.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "8px 14px",
                        borderRadius: 9,
                        fontSize: "0.74rem",
                        fontWeight: 500,
                        backgroundColor: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "all 0.18s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border-strong)";
                        el.style.color = "var(--accent)";
                        el.style.backgroundColor = "var(--accent-glow)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border)";
                        el.style.color = "var(--text-secondary)";
                        el.style.backgroundColor = "var(--bg-subtle)";
                      }}
                    >
                      <LinkIcon icon={l.icon} />
                      {l.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
                        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

// ─── InternModal — KPU Internship with Carousel ───────────────────────────────

function InternModal({ onClose }: { onClose: () => void }) {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);
  // Touch swipe
  const touchStartX = useRef<number>(0);
  const imgCount = images.length;

  // Fetch & shuffle
  useEffect(() => {
    fetch("/api/intern-images")
      .then((r) => r.json())
      .then((data: { images: string[] }) => {
        setImages([...data.images].sort(() => Math.random() - 0.5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Keyboard: Escape = close, ← → = navigate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") goTo((prev: number) => Math.min(prev + 1, imgCount - 1));
      if (e.key === "ArrowLeft") goTo((prev: number) => Math.max(prev - 1, 0));
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, imgCount]);

  // Smooth fade transition on photo change
  const goTo = (updater: number | ((prev: number) => number)) => {
    setFade(false);
    setTimeout(() => {
      setCarouselIdx(typeof updater === "function" ? updater : () => updater);
      setFade(true);
    }, 140);
  };

  const prev = () => {
    if (carouselIdx > 0) goTo(carouselIdx - 1);
  };
  const next = () => {
    if (carouselIdx < imgCount - 1) goTo(carouselIdx + 1);
  };

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Dots: max 7 visible, with ellipsis-style scaling
  const renderDots = () => {
    if (imgCount <= 7) {
      return Array.from({ length: imgCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          style={{
            width: i === carouselIdx ? 20 : 6,
            height: 6,
            borderRadius: 999,
            border: "none",
            padding: 0,
            cursor: "pointer",
            backgroundColor: i === carouselIdx ? "var(--accent)" : "var(--border-mid)",
            transition: "all 0.25s ease",
            flexShrink: 0,
          }}
        />
      ));
    }
    // For many images, show 7 slots: first, last, active±1, and ellipsis
    const visible = new Set([0, imgCount - 1, carouselIdx, carouselIdx - 1, carouselIdx + 1].filter((i) => i >= 0 && i < imgCount));
    return Array.from({ length: imgCount })
      .map((_, i) => {
        if (!visible.has(i)) {
          // Only show one ellipsis between gaps
          const prevVisible = [...visible].filter((v) => v < i).length > 0 && [...visible].every((v) => v !== i - 1);
          if (prevVisible)
            return (
              <span key={i} style={{ fontSize: "0.5rem", color: "var(--text-muted)", lineHeight: 1 }}>
                •
              </span>
            );
          return null;
        }
        return (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === carouselIdx ? 20 : 6,
              height: 6,
              borderRadius: 999,
              border: "none",
              padding: 0,
              cursor: "pointer",
              backgroundColor: i === carouselIdx ? "var(--accent)" : "var(--border-mid)",
              transition: "all 0.25s ease",
              flexShrink: 0,
            }}
          />
        );
      })
      .filter(Boolean);
  };

  return (
    <ModalBackdrop onClose={onClose} maxWidth={700}>
      {({ onTouchStart: swipeTouchStart, onTouchMove: swipeTouchMove, onTouchEnd: swipeTouchEnd }) => (
        <>
          {/* Header */}
          <div style={{ flexShrink: 0, padding: "0.9rem 1.1rem 0.8rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <TagBadge>Internship</TagBadge>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>Feb 2024 – Sep 2024</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.05rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25 }}>Secretariat General of KPU RI</h2>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Center for Data &amp; IT (Pusdatin) · Jakarta, Indonesia</p>
            </div>
            <CloseBtn onClose={onClose} />
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            <div style={{ padding: "1rem 1.1rem 0" }}>
              <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Completed a 7-month industry internship at the Secretariat General of the General Elections Commission of the Republic of Indonesia (KPU RI), Center for Data &amp; Information Technology (Pusdatin), Jakarta. Contributed
                across three divisions: Data &amp; Information, Application &amp; Information Governance, and IT Infrastructure.
              </p>
              <div style={{ marginTop: "0.9rem" }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 8 }}>Highlights</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    "Participated in the national voter data recapitulation and monitoring sessions coordinated by the Data and Information Center (Pusdatin).",
                    "Selection and input of voter status for the Permanent Voter List (DPT), Special Voter List (DPK), and Additional Voter List (DPTb).",
                    "Assisted in the process of compiling the Additional Voter List (DPTb), compiling the list of voters not yet registered on the Permanent Voter List (DPT) but eligible to vote.",
                    "Entered data from Polling Stations (TPS) by Province, Regency/City, Sub-district, and Village/Village and reviewed the inputted data to ensure there were no errors.",
                    "Assisted in the submission of the Potential Voter List (DP4) from the Ministry of Home Affairs (KEMENDAGRI) to the Indonesian General Elections Commission (KPU) as material for compiling voter lists for the 2024 gubernatorial and vice-gubernatorial elections.",
                    "Assisted in conducting an evaluation meeting to update voter data for the 2024 Election and preparing for voter data updates for the 2024 Simultaneous Regional Elections.",
                    "Assisting in conducting a working meeting to discuss technical guidelines for updating voter data for the 2024 elections, as well as synchronizing the DP4 (Voting Data Collection).",
                    "Assisting with logistics for coordination meetings between Pusdatin and Bareskrim Polri regarding election data security and integrity.",
                    "Assisting in conducting a working meeting to discuss voter data update simulations (Pantarlih) for the 2024 Simultaneous Regional Elections.",
                    "Designing and developing a Laravel + MySQL recapitulation system prototype for PPK & PPS membership data, based on the SIAKBA workflow reference (Academic Project).",
                    "Implementing role-based access control: National Admin, Provincial Admin, and District/City Operator (Academic Project).",
                    "Generating recapitulation reports with graphic visualizations per district and sub-district level (Academic Project).",
                  ].map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <div style={{ flexShrink: 0, marginTop: 6, width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.5 }} />
                      <span style={{ fontSize: "0.81rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "0.9rem", paddingBottom: "1.1rem", borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 8 }}>Links</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {[
                    { label: "GitHub (SIAKBA)", href: "https://github.com/Furqan-sykss/siakba", icon: "github" },
                    { label: "Google Drive", href: "https://drive.google.com/drive/folders/1kkZ7vN0Gf6zV3KUKFzoIBgeujkCfRp6Y?usp=sharing", icon: "drive" },
                    { label: "Wireframe Figma", href: "https://www.figma.com/design/tA7R82I0PJWt3K05d93f0E/Wireframe--Based-on-SIAKBA-Project--?node-id=0-1&t=ERBAlDshXXiCShwP-1", icon: "figma" },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "7px 13px",
                        borderRadius: 9,
                        fontSize: "0.73rem",
                        fontWeight: 500,
                        backgroundColor: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "all 0.18s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border-strong)";
                        el.style.color = "var(--accent)";
                        el.style.backgroundColor = "var(--accent-glow)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border)";
                        el.style.color = "var(--text-secondary)";
                        el.style.backgroundColor = "var(--bg-subtle)";
                      }}
                    >
                      <LinkIcon icon={l.icon} />
                      {l.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
                        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div style={{ padding: "1.1rem 1.1rem 1.4rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6 }}>Documentation{imgCount > 0 ? ` — ${imgCount} Photos` : ""}</p>
                {imgCount > 0 && !loading && (
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
                    {carouselIdx + 1} / {imgCount}
                  </span>
                )}
              </div>
              {loading && (
                <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem", flexDirection: "column", gap: 10 }}>
                  <div style={{ width: 24, height: 24, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Memuat foto...
                </div>
              )}
              {!loading && imgCount === 0 && <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>Foto tidak ditemukan.</div>}
              {!loading && imgCount > 0 && (
                <div style={{ position: "relative" }}>
                  <div
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "clamp(200px, 44vw, 380px)",
                      borderRadius: "0.85rem",
                      overflow: "hidden",
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      userSelect: "none",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={images[carouselIdx]}
                      alt={`KPU documentation ${carouselIdx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", opacity: fade ? 1 : 0, transition: "opacity 0.14s ease" }}
                      loading="lazy"
                    />
                    {carouselIdx > 0 && (
                      <button
                        onClick={prev}
                        style={{
                          position: "absolute",
                          left: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0,0,0,0.45)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                    )}
                    {carouselIdx < imgCount - 1 && (
                      <button
                        onClick={next}
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0,0,0,0.45)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 12, flexWrap: "wrap", minHeight: 16 }}>{renderDots()}</div>
                  <p style={{ textAlign: "center", fontSize: "0.65rem", color: "var(--text-faint)", marginTop: 8 }}>← → keyboard · swipe on mobile</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

// ─── EventModal — Tokopedia Event Crew ────────────────────────────────────────

function EventModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const facts = [
    { label: "Company", value: "PT Fasen Creative Quality" },
    { label: "Client", value: "Tokopedia (Dyandra Event Solutions)" },
    { label: "Role", value: "Event Crew — Runner" },
    { label: "Duration", value: "5 days · Mar 13 – 17, 2024" },
    { label: "Contract", value: "Fixed-term · Signed 10 March 2024" },
  ];

  const responsibilities = [
    "Executed all assigned operational tasks under the direction of the Hall Coordinator with full discipline and accountability",
    "Supported logistics flow, crowd management, and on-site coordination throughout the entire 5-day event",
    "Maintained professionalism and excellent service quality toward event participants and visitors",
    "Monitored assigned post areas and ensured orderly operations within the designated venue zone",
    "Collaborated effectively with fellow crew members and supervisors to meet event operational targets",
    "Adhered strictly to event code of conduct including uniform policy and communication protocols",
  ];

  return (
    <ModalBackdrop onClose={onClose} maxWidth={640}>
      {() => (
        <>
          {/* Header */}
          <div
            style={{
              flexShrink: 0,
              padding: "0.9rem 1.1rem 0.8rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 10,
              background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 5,
                    backgroundColor: "var(--accent-glow)",
                    color: "var(--accent)",
                    border: "1px solid var(--border-mid)",
                  }}
                >
                  Event Crew
                </span>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>13 – 17 March 2024 · Jakarta</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: 2 }}>Tokopedia Ramadan Extra 2024 Flash Sale</h2>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>PT Fasen Creative Quality (Dyandra Event Solutions)</p>
            </div>
            <CloseBtn onClose={onClose} />
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.1rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Photo + facts — stacked mobile, 2-col on sm+ */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }} className="ev-grid">
              <style suppressHydrationWarning>{`@media(min-width:500px){.ev-grid{grid-template-columns:1fr 1.15fr!important}}`}</style>
              <div style={{ borderRadius: "0.85rem", overflow: "hidden", border: "1px solid var(--border)", position: "relative", backgroundColor: "var(--bg-subtle)", minHeight: 160 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/1000357140.png" alt="Employment Contract" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 160 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px", background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>Employment Contract</p>
                  <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.6)" }}>Surat Perjanjian Kerja · Signed 10 Mar 2024</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {facts.map(({ label, value }) => (
                  <div key={label} style={{ padding: "8px 11px", borderRadius: 9, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.55, marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.3 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              Engaged as an Event Crew (Runner) for the <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Tokopedia Ramadan Extra 2024 Flash Sale</strong> — a large-scale promotional event organized by PT Fasen Creative
              Quality under Dyandra Event Solutions. Operated under a fixed-term employment contract, supporting smooth on-site operations across 5 consecutive days at the Jakarta event venue.
            </p>

            <div>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>Responsibilities</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {responsibilities.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flexShrink: 0, marginTop: 7, width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.5 }} />
                    <span style={{ fontSize: "0.81rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "10px 14px", borderRadius: 10, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, backgroundColor: "var(--accent-glow)", border: "1px solid var(--border-mid)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <polyline points="9 15 11 17 15 13" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--text-primary)" }}>Employment Contract Verified</p>
                <p style={{ fontSize: "0.64rem", color: "var(--text-muted)", marginTop: 1 }}>Surat Perjanjian Kerja · PT Fasen Creative Quality · Signed 10 March 2024</p>
              </div>
            </div>
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

// ─── EducationModal ────────────────────────────────────────────────────────────

function EducationModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const coursework: { label: string; color: string; courses: string[] }[] = [
    { label: "Web Dev", color: "var(--accent)", courses: ["Web Programming", "Web-Based Information Systems", "UI/UX Design"] },
    { label: "Data", color: "#7c9e87", courses: ["Database Systems", "Data Mining", "Data Structures & Algorithms"] },
    { label: "Software", color: "#8a7fa8", courses: ["Object-Oriented Programming", "Software Engineering", "System Analysis & Design"] },
    { label: "Network", color: "#9e8a7c", courses: ["Computer Networks", "Network Security", "Operating Systems"] },
    { label: "Mobile", color: "#7a9eb0", courses: ["Mobile Application Development"] },
  ];

  const documents = [
    { label: "Academic Transcript", icon: "📄", desc: "Full semester grade records", href: "https://drive.google.com/file/d/10aVPxsUkV0j7ZAU7fbV3ZWG7zNgdzc4_/view?usp=drive_link" },
    { label: "Diploma / Ijazah", icon: "🎓", desc: "Official graduation certificate", href: "https://drive.google.com/file/d/1PlUwjMiyAguZNqbPFsOy3GdmI8ngBPH3/view?usp=drive_link" },
    { label: "Scientific Journal", icon: "📝", desc: "Published undergraduate research", href: "https://drive.google.com/file/d/1oPKl6xDAVcO336NuP7VrsKrEbNMdt00Z/view?usp=sharing" },
  ];

  return (
    <ModalBackdrop onClose={onClose} maxWidth={660}>
      {() => (
        <>
          {/* Header */}
          <div
            style={{
              flexShrink: 0,
              padding: "0.9rem 1.1rem 0.8rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 10,
              background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 5,
                    backgroundColor: "var(--accent-glow)",
                    color: "var(--accent)",
                    border: "1px solid var(--border-mid)",
                  }}
                >
                  D-IV · Applied Bachelor
                </span>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>2021 – 2025</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: 2 }}>Informatics Engineering</h2>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Politeknik Negeri Lhokseumawe · Lhokseumawe, Aceh</p>
            </div>
            <CloseBtn onClose={onClose} />
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.1rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Quick facts — 2×2 on mobile, 4-col on sm+ */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }} className="edu-facts">
              <style suppressHydrationWarning>{`@media(min-width:460px){.edu-facts{grid-template-columns:repeat(4,1fr)!important}}`}</style>
              {[
                { label: "Degree", value: "D-IV" },
                { label: "Duration", value: "4 Yrs · 8 Sem" },
                { label: "GPA", value: "3.15 / 4.00" },
                { label: "Status", value: "Graduated '25" },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: "9px 11px", borderRadius: 9, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", textAlign: "center" }}>
                  <p style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.55, marginBottom: 3 }}>{label}</p>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* GPA bar */}
            <div style={{ padding: "12px 14px", borderRadius: 10, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--text-secondary)" }}>Grade Point Average</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)" }}>
                  3.15 <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.65rem" }}>/ 4.00</span>
                </span>
              </div>
              <div style={{ height: 5, width: "100%", backgroundColor: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "78.75%", borderRadius: 99, background: "linear-gradient(90deg, var(--accent), var(--accent))", opacity: 0.7 }} />
              </div>
              <p style={{ fontSize: "0.62rem", color: "var(--text-faint)", marginTop: 5 }}>D-IV is Indonesia's applied bachelor-level degree — equivalent to S1 (B.Sc.) in the practical engineering track.</p>
            </div>

            {/* About + Coursework — stacked mobile, 2-col sm+ */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }} className="edu-split">
              <style suppressHydrationWarning>{`@media(min-width:500px){.edu-split{grid-template-columns:1fr 1.3fr!important}}`}</style>
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 8 }}>About</p>
                <p style={{ fontSize: "0.81rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                  Completed a 4-year applied bachelor program in Informatics Engineering with a focus on web systems development, data processing, and software engineering. Combines strong theoretical foundations with industry-oriented
                  practical projects and a mandatory industry internship.
                </p>
                <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 9, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border-mid)" }}>
                  <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.55, marginBottom: 4 }}>Final Project (Thesis)</p>
                  <p style={{ fontSize: "0.76rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.35, marginBottom: 3 }}>Sentiment Analysis of the Attorney General's Office Performance</p>
                  <p style={{ fontSize: "0.67rem", color: "var(--text-muted)", lineHeight: 1.5 }}>TikTok comment scraping · ML classification · Laravel–Flask dashboard</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 8 }}>Relevant Coursework</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {coursework.map((cat) => (
                    <div key={cat.label}>
                      <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: cat.color, opacity: 0.7, marginBottom: 5 }}>{cat.label}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {cat.courses.map((course) => (
                          <span key={course} style={{ fontSize: "0.67rem", padding: "2px 9px", borderRadius: 5, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Documents — 1-col mobile, 3-col sm+ */}
            <div>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>Academic Documents</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }} className="edu-docs">
                <style suppressHydrationWarning>{`@media(min-width:380px){.edu-docs{grid-template-columns:repeat(3,1fr)!important}}`}</style>
                {documents.map((doc) => (
                  <a
                    key={doc.label}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 7,
                      padding: "14px 10px",
                      borderRadius: 11,
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                      transition: "all 0.18s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--border-strong)";
                      el.style.backgroundColor = "var(--bg-card)";
                      el.style.boxShadow = "var(--shadow-md)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--border)";
                      el.style.backgroundColor = "var(--bg-subtle)";
                      el.style.boxShadow = "none";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>{doc.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{doc.label}</p>
                      <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{doc.desc}</p>
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "var(--accent)", opacity: 0.7 }}>Open ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

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
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [showInternModal, setShowInternModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);

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
      {/* ── INTERN MODAL ─────────────────────────────────────────────────── */}
      {showInternModal && <InternModal onClose={() => setShowInternModal(false)} />}
      {showEventModal && <EventModal onClose={() => setShowEventModal(false)} />}
      {showEducationModal && <EducationModal onClose={() => setShowEducationModal(false)} />}

      {/* ── PROJECT MODAL ────────────────────────────────────────────────── */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

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
      <div className="page-container max-w-5xl mx-auto px-5 sm:px-8 pb-32" style={{ display: "flex", flexDirection: "column", gap: "6.5rem" }}>
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
                  Graduate of Informatics Engineering from Politeknik Negeri Lhokseumawe. I build structured, efficient web systems with hands-on experience in data processing, sentiment analysis, and full-stack development.
                </p>

                <div className="hero-contact-chips" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.4rem" }}>
                  {[
                    { icon: "✉", label: "furqansykss@gmail.com", href: "mailto:furqansykss@gmail.com" },
                    { icon: "↗", label: "LinkedIn", href: "https://linkedin.com/in/fur-qan-6b1b87242" },
                    { icon: "↗", label: "Instagram", href: "https://www.instagram.com/frqann?igsh=MTA1ejJ3amhhZTV5cA==" },
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

                    if (c.label === "Instagram") {
                      return <InstagramChip key="instagram" base={base} />;
                    }

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
          <div
            className="stats-bento"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "auto auto",
              gap: 10,
            }}
          >
            {/* [1] Projects Built */}
            <div
              className="bento-reveal"
              style={{
                gridColumn: "1 / 2",
                gridRow: "1 / 2",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                textAlign: "center",
                animationDelay: "0ms",
              }}
            >
              <Counter target={6} label="Projects Built" />
              <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>across industries</p>
            </div>

            {/* [2] Years Learning */}
            <div
              className="bento-reveal"
              style={{
                gridColumn: "2 / 3",
                gridRow: "1 / 2",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                textAlign: "center",
                animationDelay: "80ms",
              }}
            >
              <Counter target={3} label="Years Learning" />
              <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>continuous growth</p>
            </div>

            {/* [3] Certifications — spans 2 rows (tall card on the right) */}
            <div
              className="bento-reveal"
              style={{
                gridColumn: "3 / 4",
                gridRow: "1 / 3",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                animationDelay: "160ms",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative glow */}
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
                  opacity: 0.8,
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <Counter target={8} label="Certifications" />
                <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>verified skills</p>
              </div>
            </div>

            {/* [4] Internships + [5] Jobs — side by side on bottom-left 2 cols */}
            <div
              className="bento-reveal"
              style={{
                gridColumn: "1 / 2",
                gridRow: "2 / 3",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.5rem",
                textAlign: "center",
                animationDelay: "240ms",
              }}
            >
              <Counter target={1} label="Internships" />
              <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>industry exposure</p>
            </div>

            <div
              className="bento-reveal"
              style={{
                gridColumn: "2 / 3",
                gridRow: "2 / 3",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.5rem",
                textAlign: "center",
                animationDelay: "320ms",
              }}
            >
              <Counter target={1} label="Jobs" />
              <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>industry exposure</p>
            </div>
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
                onClick={() => setSelectedProject(projects[0])}
                style={{
                  gridColumn: "1 / 3",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.4rem 1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 220,
                  animationDelay: "0ms",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <TagBadge>{projects[0].tag}</TagBadge>
                      <span style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.4 }}>Featured</span>
                    </div>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{projects[0].period}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontSize: "clamp(1rem, 3.5vw, 1.25rem)",
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: 10,
                      lineHeight: 1.25,
                    }}
                  >
                    {projects[0].title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.78, color: "var(--text-secondary)" }}>{projects[0].desc}</p>
                </div>
                {/* Stack chips — max 5, then "+N more" chip */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1, minWidth: 0 }}>
                    {projects[0].stack.slice(0, 5).map((s) => (
                      <StackChip key={s}>{s}</StackChip>
                    ))}
                    {projects[0].stack.length > 5 && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 6,
                          backgroundColor: "var(--accent-glow)",
                          border: "1px solid var(--border-mid)",
                          color: "var(--accent)",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        +{projects[0].stack.length - 5} more
                      </span>
                    )}
                  </div>
                  <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ── [1] col 3, row 1 ──────────────────────────────────────── */}
              <div
                onClick={() => setSelectedProject(projects[1])}
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "3 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.4rem",
                  cursor: "pointer",
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
                  <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.88rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.35 }}>{projects[1].title}</h3>
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
                onClick={() => setSelectedProject(projects[2])}
                className="proj-card bento-reveal"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "pointer",
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
                  <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.85rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>{projects[2].title}</h3>
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
                onClick={() => setSelectedProject(projects[3])}
                className="proj-card bento-reveal"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "pointer",
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
                  <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.85rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>{projects[3].title}</h3>
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
                onClick={() => setSelectedProject(projects[4])}
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "3 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "pointer",
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
                  <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.85rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>{projects[4].title}</h3>
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
                onClick={() => setSelectedProject(projects[5])}
                className="proj-card bento-reveal bento-last"
                style={{
                  gridColumn: "1 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.15rem 1.5rem",
                  cursor: "pointer",
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
                  <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.87rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 3, lineHeight: 1.3 }}>{projects[5].title}</h3>
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
                    {/* Card — KPU (i===0) and Event Crew (i===1) are clickable */}
                    <div
                      className="exp-card"
                      onClick={i === 0 ? () => setShowInternModal(true) : i === 1 ? () => setShowEventModal(true) : undefined}
                      style={{
                        flex: 1,
                        padding: "1.1rem 1.25rem",
                        borderRadius: "1rem",
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        marginBottom: i < experience.length - 1 ? "0.5rem" : 0,
                        cursor: i === 0 || i === 1 ? "pointer" : "default",
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (i !== 0 && i !== 1) return;
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border-strong)";
                        el.style.boxShadow = "var(--shadow-md)";
                        el.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        if (i !== 0 && i !== 1) return;
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border)";
                        el.style.boxShadow = "none";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Top row: role title + View Details */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 2 }}>
                        <h3 style={{ fontSize: "0.87rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.35 }}>{e.role}</h3>
                        {(i === 0 || i === 1) && (
                          <span
                            style={{
                              flexShrink: 0,
                              fontSize: "0.62rem",
                              fontWeight: 600,
                              letterSpacing: "0.08em",
                              color: "var(--accent)",
                              opacity: 0.75,
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              paddingTop: 2,
                            }}
                          >
                            View Details
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                              <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </div>
                      {/* Period — own line below role */}
                      <span style={{ display: "block", fontSize: "0.67rem", color: "var(--text-muted)", marginBottom: 6 }}>{e.period}</span>
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
                  onClick={() => setShowEducationModal(true)}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "var(--border-strong)";
                    el.style.boxShadow = "var(--shadow-md)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "var(--border)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                  style={{
                    padding: "1.4rem",
                    borderRadius: "1rem",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.18s ease",
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3L2 9l10 6 10-6-10-6zM2 17l10 6 10-6M2 13l10 6 10-6" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                      <h3 style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.35, minWidth: 0 }}>Informatics Engineering — D-IV</h3>
                      <span style={{ flexShrink: 0, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "var(--accent)", opacity: 0.75, display: "flex", alignItems: "center", gap: 4, paddingTop: 2 }}>
                        View Details
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <p style={{ fontSize: "0.74rem", fontWeight: 500, color: "var(--accent)", opacity: 0.75, marginBottom: 9 }}>Politeknik Negeri Lhokseumawe</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {["2021 – 2025", "GPA 3.15 / 4.00", "Graduated"].map((t) => (
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
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                          <span style={{ fontSize: "0.87rem", fontWeight: 500, color: "var(--text-primary)" }}>{l.lang}</span>
                          <span style={{ fontSize: "0.64rem", color: "var(--text-muted)", textAlign: "right", lineHeight: 1.4 }}>{l.level}</span>
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

            {/* "View all" link pill */}
            <a
              href="https://drive.google.com/drive/folders/1sgOCYsZb7D8BU5XhkxtKViYX3FAjnOj2?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginBottom: "1.4rem",
                textDecoration: "none",
                fontSize: "0.71rem",
                fontWeight: 500,
                color: "var(--text-muted)",
                padding: "5px 13px 5px 10px",
                borderRadius: 99,
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-subtle)",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--accent)";
                el.style.borderColor = "var(--border-strong)";
                el.style.backgroundColor = "var(--bg-card)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--text-muted)";
                el.style.borderColor = "var(--border)";
                el.style.backgroundColor = "var(--bg-subtle)";
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
              </svg>
              View all certificates on Google Drive
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div style={{ display: "grid", gap: 8 }} className="grid-cols-1 sm:grid-cols-2">
              {certifications.map((c, i) => (
                <FadeUp key={c.name} delay={i * 42}>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "13px 14px",
                      borderRadius: 12,
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.18s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--border-strong)";
                      el.style.boxShadow = "var(--shadow-md)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--border)";
                      el.style.boxShadow = "none";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Number badge */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        backgroundColor: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "0.54rem", fontWeight: 700, fontFamily: "monospace", color: "var(--accent)", opacity: 0.65 }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>

                    {/* Content */}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      {/* Name row */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                        <p style={{ fontSize: "0.81rem", fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)" }}>{c.name}</p>
                        {/* External link arrow */}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, marginTop: 3, color: "var(--text-faint)", opacity: 0.5 }}>
                          <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      {/* Line 1: issuer · score · year */}
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "2px 6px", marginBottom: 6 }}>
                        <span style={{ fontSize: "0.67rem", color: "var(--text-muted)" }}>{c.issuer}</span>
                        {"score" in c && c.score && (
                          <>
                            <span style={{ fontSize: "0.55rem", color: "var(--text-faint)" }}>·</span>
                            <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--accent)", opacity: 0.8 }}>{(c as { score: string }).score}</span>
                          </>
                        )}
                        <span style={{ fontSize: "0.55rem", color: "var(--text-faint)" }}>·</span>
                        <span style={{ fontSize: "0.62rem", color: "var(--text-faint)" }}>{c.year}</span>
                      </div>

                      {/* Line 2: category pill + verified badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: "0.57rem",
                            fontWeight: 700,
                            letterSpacing: "0.07em",
                            textTransform: "uppercase",
                            padding: "2px 8px",
                            borderRadius: 4,
                            backgroundColor: "var(--accent-glow)",
                            color: "var(--accent)",
                            border: "1px solid var(--border-mid)",
                          }}
                        >
                          {c.category}
                        </span>
                        {"badge" in c && c.badge && (
                          <span
                            style={{
                              fontSize: "0.57rem",
                              fontWeight: 700,
                              letterSpacing: "0.05em",
                              padding: "2px 8px",
                              borderRadius: 4,
                              backgroundColor: "rgba(99,178,100,0.12)",
                              color: "rgb(80,160,80)",
                              border: "1px solid rgba(99,178,100,0.25)",
                            }}
                          >
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
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
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, padding: "clamp(2.5rem,8vw,5rem) clamp(1.25rem,5vw,2rem)", textAlign: "center", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
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
                <div className="contact-socials" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 28, fontSize: "0.73rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
                  <a href="https://linkedin.com/in/fur-qan-6b1b87242" target="_blank" rel="noopener" className="lnk" style={{ textDecoration: "none", color: "var(--text-muted)" }}>
                    LinkedIn ↗
                  </a>
                  <span style={{ color: "var(--border-mid)" }}>·</span>
                  <a href="https://wa.me/6282238584400?text=Hi%2C%20Furqan" target="_blank" rel="noopener" className="lnk" style={{ textDecoration: "none", color: "var(--text-muted)" }}>
                    +62 822-385-84400 ↗
                  </a>
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
