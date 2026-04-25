"use client";

import { useState, useEffect, useRef } from "react";
import { SanityImage } from "@/components/ui/SanityImage";
import { MagneticButton } from "@/components/ui/MagneticButton";

type HeroSectionProps = {
  data: {
    heroEyebrow?: string;
    heroLogo?: {
      asset?: {
        _id: string;
        url: string;
        metadata?: {
          lqip?: string;
          dimensions?: { width: number; height: number };
        };
      };
      alt?: string;
      hotspot?: { x: number; y: number };
      crop?: { top: number; bottom: number; left: number; right: number };
    };
    heroFirstName?: string;
    heroLastName?: string;
    heroTagline?: string;
    heroCtaLabel?: string;
    heroVerticalText?: string;
    heroVideoUrl?: string;
    heroVideoPoster?: {
      asset?: {
        _id: string;
        url: string;
        metadata?: {
          lqip?: string;
          dimensions?: { width: number; height: number };
        };
      };
      alt?: string;
      hotspot?: { x: number; y: number };
      crop?: { top: number; bottom: number; left: number; right: number };
    };
  };
};

const SoundWaveBars = () => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      gap: "4px",
      height: "40px",
    }}
  >
    {[0.4, 0.7, 1, 0.6, 0.85, 0.5].map((h, i) => (
      <div
        key={i}
        style={{
          width: "3px",
          height: `${h * 100}%`,
          backgroundColor: "var(--gold)",
          borderRadius: "2px",
          animation: `soundWave ${0.8 + i * 0.15}s ease-in-out ${i * 0.1}s infinite`,
          transformOrigin: "bottom",
        }}
      />
    ))}
  </div>
);

const ContentReveal = ({
  children,
  delay,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  style?: React.CSSProperties;
}) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        color: "var(--text-heading)",
        fontWeight: 400,
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export function HeroSection({ data }: HeroSectionProps) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Tarayıcı önbelleğinden gelirse canPlay tetiklenmeyebilir
    if (videoRef.current) {
      if (videoRef.current.readyState >= 2) {
        setVideoReady(true);
      }

      // Otomatik oynatmayı garantiye alalım (Tarayıcı politikaları için muted zaten var)
      videoRef.current.play().catch((err) => {
        console.log("Video autoplay prevented:", err);
      });
    }
  }, [data?.heroVideoUrl]);

  const firstName = (data?.heroFirstName || "Samet").toUpperCase();
  const lastName = data?.heroLastName || "Öztürk";
  const eyebrow = data?.heroEyebrow || "PERKÜSYON ŞOV SANATÇISI";
  const tagline = data?.heroTagline || "DARBUKA · BRASS · SAHNE PERFORMANSI";
  const ctaLabel = data?.heroCtaLabel || "SAHNEYE DAVET ET";
  const verticalText = data?.heroVerticalText || "DARBUKA · BRASS · ORIENT";

  const handleCta = () => {
    const el = document.querySelector("#iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "6rem",
        paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
        paddingRight: "clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      {/* Katman 1: Poster (Sanity Image — hızlı, blur placeholder) */}
      {data?.heroVideoPoster?.asset && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transition: videoReady ? "opacity 600ms ease" : "none",
            opacity: videoReady ? 0 : 1,
            transform: "scaleX(-1)",
          }}
        >
          <SanityImage
            image={data.heroVideoPoster as any}
            fill
            sizes="100vw"
            className="object-cover object-left md:object-center"
            priority
          />
        </div>
      )}

      {/* Poster yoksa siyah zemin */}
      {!data?.heroVideoPoster?.asset && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundColor: "#080808",
          }}
        />
      )}

      {/* Katman 2: Video (harici MP4 — yüklendikten sonra görünür) */}
      {data?.heroVideoUrl && (
        <video
          ref={videoRef}
          key={data.heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={data.heroVideoUrl}
          onCanPlay={() => setVideoReady(true)}
          className="object-cover object-left md:object-center"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            opacity: videoReady ? 1 : 0,
            transition: "opacity 1200ms ease",
            // transform: "scaleX(-1)",
          }}
        />
      )}

      {/* Katman 3: Overlay'ler */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.6) 30%, transparent 60%)",
        }}
      />

      {/* Sağ Dikey Metin */}
      <div
        style={{
          position: "absolute",
          right: "1.5rem",
          top: "50%",
          transform: "translateX(50%) translateY(-50%) rotate(90deg)",
          zIndex: 5,
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(212,168,67,0.45)",
          whiteSpace: "nowrap",
        }}
      >
        {verticalText}
      </div>

      {/* İçerik — Sol-Alt */}
      <div style={{ position: "relative", zIndex: 5, maxWidth: "700px" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "1.5rem",
            animation: "fadeInUp 0.6s ease 0.2s both",
          }}
        >
          {eyebrow}
        </div>

        {/* İsim / Logo */}
        <div
          style={{ marginBottom: "1.5rem", marginTop: "-3rem", lineHeight: 1 }}
        >
          {data?.heroLogo?.asset ? (
            <ContentReveal
              delay={400}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "clamp(180px, 32vw, 420px)", // Mobilde büyütüldü (125px -> 180px), Desktop'ta hafif büyütüldü (375px -> 420px)
                  aspectRatio: data.heroLogo.asset.metadata?.dimensions
                    ? `${data.heroLogo.asset.metadata.dimensions.width} / ${data.heroLogo.asset.metadata.dimensions.height}`
                    : "3 / 1",
                }}
              >
                <SanityImage
                  image={data.heroLogo as any}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </ContentReveal>
          ) : (
            <>
              <ContentReveal
                delay={400}
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "clamp(2.8rem, 11vw, 8rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                  fontWeight: 700,
                  display: "block",
                }}
              >
                {firstName}
              </ContentReveal>
              <ContentReveal
                delay={600}
                style={{
                  fontFamily: "var(--font-signature), cursive",
                  fontSize: "clamp(2.8rem, 11vw, 7.5rem)",
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  lineHeight: 1.3,
                  display: "block",
                  fontWeight: 400,
                  paddingBottom: "0.5rem",
                }}
              >
                {lastName}
              </ContentReveal>
            </>
          )}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "clamp(11px, 1.2vw, 13px)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "2.5rem",
            animation: "fadeInUp 0.6s ease 1s both",
          }}
        >
          {tagline}
        </div>

        {/* CTA + Ses Dalgası */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Ses Dalgası */}
          <div style={{ animation: "fadeInUp 0.6s ease 1.2s both" }}>
            <SoundWaveBars />
          </div>

          {/* CTA Butonu */}
          <MagneticButton
            onClick={handleCta}
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              border: "1px solid var(--gold-border)",
              padding: "1rem 2rem",
              backgroundColor: "transparent",
              transition:
                "background-color 300ms ease, border-color 300ms ease, color 300ms ease",
              animation: "fadeInUp 0.6s ease 1.2s both",
            }}
            aria-label={ctaLabel}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.backgroundColor = "var(--gold)";
              e.currentTarget.style.color = "#080808";
              e.currentTarget.style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--gold)";
              e.currentTarget.style.borderColor = "var(--gold-border)";
            }}
          >
            {ctaLabel} →
          </MagneticButton>
        </div>
      </div>

      {/* Sağ-Alt Scroll Göstergesi */}
      <div
        style={{
          position: "absolute",
          right: "2.5rem",
          bottom: "3rem",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "9px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--text-hint)",
            writingMode: "vertical-rl",
          }}
        >
          KAYDIR
        </div>
        <div
          style={{
            width: "1px",
            height: "60px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "var(--gold)",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
