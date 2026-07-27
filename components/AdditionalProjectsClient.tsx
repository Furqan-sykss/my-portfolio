"use client";

import React, { type ReactNode, useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { translate } from "@/components/siteTranslations";

type Localized = { id: string; en: string };
type LocalizedText = Localized | string;

type Project = {
  title: Localized;
  period: Localized;
  tag: Localized;
  desc: Localized;
  stack: string[];
  detail: { highlights: Localized[]; links: { label: LocalizedText; href: string; icon?: string }[] };
};

type AdditionalProjectsClientProps = {
  projects: Project[];
  renderProjectCard: (project: Project, index: number) => ReactNode;
};

export default function AdditionalProjectsClient({ projects, renderProjectCard }: AdditionalProjectsClientProps) {
  const [showAll, setShowAll] = useState(false);
  const [isCompact, setIsCompact] = useState<boolean | null>(null);
  const { lang } = useLanguage();
  const INITIAL_COUNT = 1;
  const visible = showAll || isCompact === false ? projects : projects.slice(0, INITIAL_COUNT);
  const remaining = Math.max(0, projects.length - INITIAL_COUNT);
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateViewportMode = () => {
      const compact = mediaQuery.matches;
      setIsCompact(compact);
      if (!compact) setShowAll(false);
    };

    updateViewportMode();
    mediaQuery.addEventListener("change", updateViewportMode);
    return () => mediaQuery.removeEventListener("change", updateViewportMode);
  }, []);

  return (
    <>
      <div className="bento-grid-plain additional-projects-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
        {visible.map((project, index) => renderProjectCard(project, index))}
      </div>

      {isCompact && projects.length > INITIAL_COUNT && (
        <div className="additional-projects-mobile" style={{ marginTop: "1.25rem", display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => setShowAll((p) => !p)}
            aria-expanded={showAll}
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
            {showAll ? t("showLessAdditionalProjects") : t("showMoreAdditionalProjects", remaining)}
          </button>
        </div>
      )}
    </>
  );
}
