"use client";

import { useEffect, useRef, useState } from "react";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RichText } from "@/components/ui/RichText";

type Stat = { _key?: string; value: string; label: string };

type AboutSectionProps = {
  data: {
    aboutSectionLabel?: string;
    aboutSectionTitle?: string;
    aboutPhoto?: any;
    aboutBio?: any[];
    aboutStats?: Stat[];
  };
};

function useScrollReveal(ref: React.RefObject<Element | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, label, animate }: { value: string; label: string; animate: boolean }) {
  const numStr = value.replace(/\D/g, "");
  const suffix = value.replace(/\d/g, "");
  const num = parseInt(numStr) || 0;
  const count = useCountUp(num, 1500, animate);

  return (
    <div
      style={{
        flex: 1,
        minWidth: "100px",
        borderTop: "1px solid var(--gold-border)",
        paddingTop: "1rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display), serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 400,
          color: "var(--gold)",
          letterSpacing: "0.05em",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {animate ? count : 0}
        {suffix}
      </div>
      {/* Progress bar */}
      <div
        style={{
          height: "2px",
          backgroundColor: "rgba(212,168,67,0.15)",
          marginBottom: "0.75rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "var(--gold)",
            width: animate ? "100%" : "0%",
            transition: "width 1.5s ease",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function AboutSection({ data }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const sectionVisible = useScrollReveal(sectionRef as any);
  const statsVisible = useScrollReveal(statsRef as any);

  const sectionLabel = data?.aboutSectionLabel || "HAKKINDA";
  const sectionTitle = data?.aboutSectionTitle || "Sahnenin Ritmi";
  const stats: Stat[] = data?.aboutStats || [
    { _key: "s1", value: "17+", label: "Yıl Sahne" },
    { _key: "s2", value: "500+", label: "Etkinlik" },
    { _key: "s3", value: "50+", label: "Marka" },
  ];

  return (
    <section
      id="hakkinda"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--bg-section)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Çok ince arka plan desen */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='30' stroke='%23D4A843' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(4rem, 10vh, 7rem) clamp(1.5rem, 6vw, 6rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Sol Kolon — Sticky Fotoğraf */}
        <div style={{ position: "sticky", top: "100px", alignSelf: "start" }}>
          {data?.aboutPhoto?.asset ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "2/3",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid transparent",
                transition: "border-color 400ms ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--gold-border)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "transparent")}
            >
              <SanityImage
                image={data.aboutPhoto}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "2/3",
                backgroundColor: "var(--card)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-hint)",
                fontSize: "12px",
                letterSpacing: "0.1em",
              }}
            >
              FOTOĞRAF
            </div>
          )}
        </div>

        {/* Sağ Kolon — Metin */}
        <div>
          {/* Section Etiketi */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              marginBottom: "1.5rem",
            }}
          >
            <SectionLabel title={sectionLabel} />
          </div>

          {/* Başlık */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 400,
                color: "var(--text-heading)",
                letterSpacing: "0.04em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {sectionTitle}
            </h2>
          </div>

          {/* Altın Divider — soldan büyüyen */}
          <div
            ref={dividerRef}
            style={{
              width: sectionVisible ? "40px" : "0px",
              height: "1px",
              backgroundColor: "var(--gold)",
              marginBottom: "2rem",
              transition: "width 0.8s ease 0.4s",
            }}
          />

          {/* Biyografi */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
              marginBottom: "3rem",
              color: "var(--text-body)",
              lineHeight: 1.9,
            }}
          >
            {data?.aboutBio ? (
              <RichText value={data.aboutBio} />
            ) : (
              <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "0.9rem" }}>
                Sanity Studio'dan biyografi ekleyin.
              </p>
            )}
          </div>

          {/* Stat Kartları */}
          <div
            ref={statsRef}
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s",
            }}
          >
            {stats.map((stat) => (
              <StatCard
                key={stat._key || stat.label}
                value={stat.value}
                label={stat.label}
                animate={statsVisible}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
