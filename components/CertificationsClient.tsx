"use client";

import React, { useState } from "react";
import FadeUp from "@/components/FadeUp";
import { useLanguage } from "@/components/LanguageProvider";
import { translate } from "@/components/siteTranslations";

type LocalizedText = { id: string; en: string } | string;

type Cert = {
  name: LocalizedText;
  issuer: LocalizedText;
  year: string;
  category: LocalizedText;
  link?: string;
  badge?: LocalizedText;
  score?: LocalizedText;
};

export default function CertificationsClient({ certifications }: { certifications: Cert[] }) {
  const [showAll, setShowAll] = useState(false);
  const { lang } = useLanguage();
  const INITIAL_COUNT = 4;
  const visible = showAll ? certifications : certifications.slice(0, INITIAL_COUNT);
  const remaining = Math.max(0, certifications.length - INITIAL_COUNT);
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);
  const resolveText = (value?: LocalizedText) => {
    if (!value) return "";
    return typeof value === "string" ? value : lang === "id" ? value.id : value.en;
  };

  return (
    <>
      <div style={{ display: "grid", gap: 8 }} className="grid-cols-1 sm:grid-cols-2 cert-grid">
        {visible.map((c, i) => (
          <FadeUp key={`${resolveText(c.name)}-${i}`} delay={i * 42}>
            <div
              role={c.link ? "link" : undefined}
              tabIndex={c.link ? 0 : undefined}
              onClick={() => {
                if (c.link) window.open(c.link, "_blank", "noopener,noreferrer");
              }}
              onKeyDown={(e) => {
                if (!c.link) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.open(c.link, "_blank", "noopener,noreferrer");
                }
              }}
              className="cert-card"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "13px 14px",
                borderRadius: 12,
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                cursor: c.link ? "pointer" : "default",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.18s ease",
              }}
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
            >
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

              <div className="cert-content" style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                  <p style={{ fontSize: "0.81rem", fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)" }}>{resolveText(c.name)}</p>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, marginTop: 3, color: "var(--text-faint)", opacity: 0.5 }}>
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "2px 6px", marginBottom: 6 }}>
                  <span style={{ fontSize: "0.67rem", color: "var(--text-muted)" }}>{resolveText(c.issuer)}</span>
                  {c.score && (
                    <>
                      <span style={{ fontSize: "0.55rem", color: "var(--text-faint)" }}>|</span>
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--accent)", opacity: 0.8 }}>{resolveText(c.score)}</span>
                    </>
                  )}
                  <span style={{ fontSize: "0.55rem", color: "var(--text-faint)" }}>|</span>
                  <span style={{ fontSize: "0.62rem", color: "var(--text-faint)" }}>{c.year}</span>
                </div>

                <div className="cert-badges" style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
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
                    {resolveText(c.category)}
                  </span>
                  {c.badge && (
                    <span
                      style={{
                        fontSize: "0.57rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        padding: "2px 8px",
                        borderRadius: 4,
                        backgroundColor: "rgba(99,178,100,0.12)",
                        color: resolveText(c.badge).toLowerCase().includes("proses") || resolveText(c.badge).toLowerCase().includes("progress") ? "var(--accent)" : "rgb(80,160,80)",
                        border: resolveText(c.badge).toLowerCase().includes("proses") || resolveText(c.badge).toLowerCase().includes("progress") ? "1px solid var(--border-mid)" : "1px solid rgba(99,178,100,0.25)",
                      }}
                    >
                      {resolveText(c.badge)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {certifications.length > INITIAL_COUNT && (
        <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setShowAll((p) => !p)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "0.55rem 1.25rem",
              borderRadius: 8,
              border: "1px solid var(--border-mid)",
              backgroundColor: "transparent",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.backgroundColor = "var(--accent-glow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-mid)";
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {showAll ? t("showLess") : t("showMoreCertifications", remaining)}
          </button>
        </div>
      )}
    </>
  );
}
