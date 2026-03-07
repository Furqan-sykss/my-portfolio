"use client";

import TypedText from "@/components/TypedText";
import Counter from "@/components/Counter";
import FadeUp from "@/components/FadeUp";
import Image from "next/image";

// ─── Data ──────────────────────────────────────────────────────────────────────

const skills = [
  { category: "Languages", items: ["JavaScript", "Python", "PHP", "Dart"] },
  { category: "Frameworks", items: ["Laravel", "Next.js", "Flask API", "Flutter"] },
  { category: "Frontend", items: ["Tailwind CSS", "Bootstrap", "CSS"] },
  { category: "Tools & DB", items: ["MySQL", "Git", "GitHub", "Figma", "Canva", "Selenium", "Laragon", "XAMPP", "Microsoft Office"] },
];

const projects = [
  {
    title: "Sentiment Analysis Dashboard",
    period: "Oct 2024 – Jul 2025",
    tag: "Final Project",
    desc: "Sentiment analysis on TikTok public opinion using Python & Selenium with ML models. Built a Laravel–Flask dashboard to visualize sentiment trends.",
    stack: ["Python", "Selenium", "Laravel", "Flask API", "MySQL", "Machine Learning", "JavaScript", "Git", "GitHub"],
  },
  {
    title: "Data Recapitulation System",
    period: "Feb 2024 – Aug 2024",
    tag: "KPU RI",
    desc: "Prototype web-based recapitulation for PPK and PPS membership data based on SIAKBA workflow references.",
    stack: ["Laravel", "MySQL", "XAMPP", "CSS", "JavaScript", "Git", "GitHub"],
  },
  {
    title: "History & Philosophy Info System",
    period: "Feb 2023 – May 2023",
    tag: "Academic",
    desc: "Web-based information system to present structured historical and philosophical content with a responsive interface.",
    stack: ["Laravel", "TailwindCSS", "XAMPP", "MySQL", "Git", "GitHub"],
  },
  {
    title: "Car Rental Management Design",
    period: "Aug 2023 – Nov 2023",
    tag: "Academic",
    desc: "Designed a car rental information system in Figma focusing on interface structure, user workflows, and feature planning.",
    stack: ["Figma"],
  },
  {
    title: "Coffee Shop Reservation Website",
    period: "Feb – Mar 2023",
    tag: "Academic",
    desc: "Simple reservation website enabling customers to place orders online using PHP native and Bootstrap.",
    stack: ["PHP Native", "MySQL", "Bootstrap", "Laragon", "Git", "GitHub"],
  },
  {
    title: "Personal Portfolio Website",
    period: "Nov – Dec 2022",
    tag: "Self-Project",
    desc: "Responsive personal portfolio website built with Next.js and Tailwind CSS to showcase projects and improve web development proficiency.",
    stack: ["Next.js", "TailwindCSS", "Git", "GitHub"],
  },
];

const experience = [
  {
    role: "Internship — Center for Data & Information Technology",
    company: "Secretariat General of KPU RI",
    period: "Feb 2024 – Sep 2024",
    desc: "Supported data processing, administrative coordination, and technical documentation for electoral information management.",
  },
  {
    role: "Event Crew | Runner — Flash Sale Event",
    company: "PT Fasen Creative Quality (Event Organizer for Tokopedia)",
    period: "March 2024",
    desc: "Supported on-site operations during Tokopedia Ramadan Extra 2024 Flash Sale. Assisted with logistics and coordination.",
  },
];

const certifications = [
  { name: "National Professional Certification in Web Development", issuer: "BNSP" },
  { name: "TOEFL Institutional Testing Program (ITP)", issuer: "Score: 450" },
  { name: "DSF 46 Faculty of Data: Data Engineer", issuer: "Dibimbing.id" },
  { name: "Digital Skill Fair 10.0 — Web Development BackEnd", issuer: "Dibimbing.id" },
  { name: "Softskill Training & Character Building", issuer: "Tandaseru Indonesia — Excellent" },
  { name: "The Complete Android 12 & Kotlin Masterclass", issuer: "Udemy" },
  { name: "Web Development Courses (HTML, PHP, JavaScript)", issuer: "Sololearn" },
  { name: "HTML Tutorial for Beginners", issuer: "Udemy" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-bold tracking-[0.22em] uppercase mb-1.5" style={{ color: "var(--accent)", opacity: 0.7 }}>
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
    </div>
  );
}

function Card({ children, hover = true, className = "" }: { children: React.ReactNode; hover?: boolean; className?: string }) {
  return (
    <div
      className={`card p-6 ${hover ? "group cursor-default" : ""} ${className}`}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function TagBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-xs rounded-md font-semibold"
      style={{
        backgroundColor: "var(--accent-glow)",
        color: "var(--accent)",
        border: "1px solid var(--accent-glow)",
      }}
    >
      {children}
    </span>
  );
}

function StackChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-xs rounded font-medium"
      style={{
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
  return <div className="h-px" style={{ backgroundColor: "var(--border)" }} />;
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-32 space-y-24">
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="min-h-[88vh] flex flex-col justify-center">
        <FadeUp>
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-10 sm:gap-16">
            {/* ── Left: Text content ── */}
            <div className="flex-1 min-w-0">
              {/* Available badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(16,185,129,0.08)",
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.18)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for work
              </div>

              {/* Heading */}
              <h1
                className="font-extrabold tracking-tight leading-[0.95] mb-5"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 5rem)",
                  color: "var(--text-primary)",
                }}
              >
                Hi, I&apos;m
                <br />
                <span style={{ color: "var(--accent)" }}>Furqan.</span>
              </h1>

              {/* Typed */}
              <div className="text-lg sm:text-xl font-light h-8 mb-5" style={{ color: "var(--text-secondary)" }}>
                <TypedText />
              </div>

              {/* About */}
              <p className="max-w-md leading-relaxed text-[0.9rem]" style={{ color: "var(--text-secondary)" }}>
                Graduate of Informatics Engineering from Politeknik Negeri Lhokseumawe. I build structured, efficient web systems — with hands-on experience in data processing, sentiment analysis, and full-stack development.
              </p>

              {/* Contact chips */}
              <div className="flex flex-wrap gap-2 mt-7">
                {[
                  { icon: "✉", label: "furqansykss@gmail.com", href: "mailto:furqansykss@gmail.com" },
                  { icon: "↗", label: "LinkedIn", href: "https://linkedin.com/in/fur-qan-6b1b87242" },
                  { icon: "📍", label: "East Jakarta", href: null },
                ].map((c) => {
                  const cls = "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 font-medium";
                  const style = {
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  };
                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener"
                      className={cls}
                      style={style}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-hover)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                      }}
                    >
                      <span>{c.icon}</span> {c.label}
                    </a>
                  ) : (
                    <span key={c.label} className={cls} style={style}>
                      <span>{c.icon}</span> {c.label}
                    </span>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-7">
                <a href="#projects" className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-85" style={{ backgroundColor: "var(--accent)", boxShadow: "0 4px 20px var(--accent-glow)" }}>
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-hover)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                  }}
                >
                  Get in Touch
                </a>
              </div>
            </div>

            {/* ── Right: Photo ── */}
            <div className="shrink-0 flex flex-col items-center gap-4">
              {/* Photo frame */}
              <div className="relative w-52 h-64 sm:w-60 sm:h-72">
                {/* Decorative ring behind photo */}
                <div
                  className="absolute -inset-3 rounded-[2rem] opacity-20 dark:opacity-30"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, var(--accent), transparent 70%)",
                  }}
                />

                {/* Subtle border glow */}
                <div
                  className="absolute -inset-px rounded-[1.6rem]"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-glow), transparent 60%)",
                    borderRadius: "1.6rem",
                  }}
                />

                {/* Photo */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: "1.5rem",
                    border: "1px solid var(--border)",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  <Image src="/furqan.jpg" alt="Furqan" fill className="object-cover object-top scale-125" style={{ objectPosition: "center 40%" }} priority />
                </div>

                {/* Floating badge — years exp */}
                <div
                  className="absolute -bottom-3 -right-3 px-3 py-2 rounded-xl text-center"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  }}
                >
                  <p className="text-lg font-extrabold leading-none" style={{ color: "var(--accent)" }}>
                    3+
                  </p>
                  <p className="text-[0.6rem] font-semibold mt-0.5" style={{ color: "var(--text-muted)" }}>
                    yrs exp
                  </p>
                </div>

                {/* Floating badge — open to work */}
                <div
                  className="absolute -top-3 -left-3 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[0.6rem] font-bold" style={{ color: "var(--text-secondary)" }}>
                    Open to work
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      <Divider />

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <FadeUp>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { target: 6, label: "Projects Built" },
            { target: 3, label: "Years Learning" },
            { target: 1, label: "Internships" },
            { target: 1, label: "Contract Jobs" },
            { target: 8, label: "Certifications" },
          ].map((s) => (
            <div key={s.label} className="card p-5 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "1rem" }}>
              <Counter target={s.target} label={s.label} />
            </div>
          ))}
        </div>
      </FadeUp>

      <Divider />

      {/* ── SKILLS ──────────────────────────────────────────────────────────── */}
      <FadeUp>
        <section id="skills">
          <SectionHeader eyebrow="Capabilities" title="Tech Stack" />
          <div className="grid sm:grid-cols-2 gap-3">
            {skills.map((group) => (
              <Card key={group.category}>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)", opacity: 0.75 }}>
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "var(--bg-subtle)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </FadeUp>

      <Divider />

      {/* ── PROJECTS ────────────────────────────────────────────────────────── */}
      <FadeUp>
        <section id="projects">
          <SectionHeader eyebrow="Portfolio" title="Projects" />
          <div className="grid sm:grid-cols-2 gap-3">
            {projects.map((p) => (
              <div
                key={p.title}
                className="card group p-6 transition-all duration-300"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-hover)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div className="flex justify-between items-start mb-3.5">
                  <TagBadge>{p.tag}</TagBadge>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {p.period}
                  </span>
                </div>
                <h3 className="text-[0.95rem] font-bold mb-2 transition-colors duration-200" style={{ color: "var(--text-primary)" }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <StackChip key={s}>{s}</StackChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      <Divider />

      {/* ── EXPERIENCE ──────────────────────────────────────────────────────── */}
      <FadeUp>
        <section id="experience">
          <SectionHeader eyebrow="Career" title="Experience" />
          <div className="space-y-3">
            {experience.map((e, i) => (
              <Card key={i} hover={false}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                    {i < experience.length - 1 && <div className="w-px flex-1 mt-1" style={{ backgroundColor: "var(--border)" }} />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-0.5">
                      <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                        {e.role}
                      </h3>
                      <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                        {e.period}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mb-2" style={{ color: "var(--accent)", opacity: 0.85 }}>
                      {e.company}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {e.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </FadeUp>

      <Divider />

      {/* ── EDUCATION ───────────────────────────────────────────────────────── */}
      <FadeUp>
        <section id="education">
          <SectionHeader eyebrow="Background" title="Education" />
          <Card hover={false}>
            <div className="flex gap-5">
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "var(--accent)" }} />
              <div>
                <h3 className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>
                  Informatics Engineering — D-IV
                </h3>
                <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--accent)", opacity: 0.85 }}>
                  Politeknik Negeri Lhokseumawe
                </p>
                <div className="flex gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>2021 – 2025</span>
                  <span>·</span>
                  <span>GPA 3.15 / 4.00</span>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </FadeUp>

      <Divider />

      {/* ── CERTIFICATIONS ──────────────────────────────────────────────────── */}
      <FadeUp>
        <section id="certifications">
          <SectionHeader eyebrow="Credentials" title="Certifications" />
          <div className="grid sm:grid-cols-2 gap-3">
            {certifications.map((c) => (
              <div
                key={c.name}
                className="flex items-start gap-3.5 p-4 rounded-xl"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-xs mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>
                  ✦
                </span>
                <div>
                  <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                    {c.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {c.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      <Divider />

      {/* ── LANGUAGE ────────────────────────────────────────────────────────── */}
      <FadeUp>
        <section>
          <SectionHeader eyebrow="Communication" title="Languages" />
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { lang: "Indonesian", level: "Native", pct: 100 },
              { lang: "English", level: "Intermediate · TOEFL ITP 450", pct: 65 },
            ].map((l) => (
              <Card key={l.lang} hover={false}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    {l.lang}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {l.level}
                  </span>
                </div>
                <div className="h-1 rounded-full" style={{ backgroundColor: "var(--bg-subtle)" }}>
                  <div className="h-1 rounded-full transition-all duration-1000" style={{ width: `${l.pct}%`, backgroundColor: "var(--accent)", opacity: 0.7 }} />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </FadeUp>

      <Divider />

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <FadeUp>
        <section
          id="contact"
          className="rounded-3xl p-10 sm:p-14 text-center"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-2" style={{ color: "var(--accent)", opacity: 0.7 }}>
            Get in touch
          </p>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Let&apos;s Work Together
          </h2>
          <p className="max-w-sm mx-auto mb-8 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Open to freelance projects, collaborations, or full-time opportunities.
          </p>
          <a
            href="mailto:furqansykss@gmail.com"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: "var(--accent)", boxShadow: "0 4px 24px var(--accent-glow)" }}
          >
            furqansykss@gmail.com
          </a>
          <div className="flex justify-center items-center gap-5 mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
            <a href="https://linkedin.com/in/fur-qan-6b1b87242" target="_blank" rel="noopener" className="transition-colors duration-200 hover:text-accent" style={{ color: "inherit" }}>
              LinkedIn ↗
            </a>
            <span className="w-px h-3" style={{ backgroundColor: "var(--border)" }} />
            <span>+62 822-385-84400</span>
          </div>
        </section>
      </FadeUp>
    </div>
  );
}
