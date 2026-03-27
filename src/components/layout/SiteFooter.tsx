"use client";

import Link from "next/link";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

type FooterProps = {
  settings?: {
    siteName?: string;
    contactInfo?: { email?: string };
    socialLinks?: { platform: string; url: string }[];
  };
  pageData?: {
    contactInstagramUrl?: string;
    contactYoutubeUrl?: string;
    contactFacebookUrl?: string;
  };
};

const SoundWave = () => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: "4px",
      height: "24px",
      marginBottom: "2rem",
    }}
  >
    {[0.4, 0.7, 1, 0.6, 0.85, 0.5].map((h, i) => (
      <div
        key={i}
        style={{
          width: "3px",
          height: `${h * 100}%`,
          backgroundColor: "var(--gold)",
          opacity: 0.6,
          borderRadius: "2px",
          animation: `soundWave ${0.8 + i * 0.15}s ease-in-out ${i * 0.1}s infinite`,
          transformOrigin: "bottom",
        }}
      />
    ))}
  </div>
);

export function SiteFooter({ settings, pageData }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: pageData?.contactInstagramUrl || settings?.socialLinks?.find(s => s.platform === "instagram")?.url, Icon: FaInstagram, label: "Instagram" },
    { href: pageData?.contactYoutubeUrl || settings?.socialLinks?.find(s => s.platform === "youtube")?.url, Icon: FaYoutube, label: "YouTube" },
    { href: pageData?.contactFacebookUrl || settings?.socialLinks?.find(s => s.platform === "facebook")?.url, Icon: FaFacebook, label: "Facebook" },
  ].filter(s => s.href);

  return (
    <footer
      style={{
        backgroundColor: "#080808",
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      {/* Ses Dalgası */}
      <SoundWave />

      {/* Logo & Tagline */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 400,
            color: "var(--gold)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          {settings?.siteName || "SAMET ÖZTÜRK"}
        </div>
        <div
          style={{
            width: "60px",
            height: "1px",
            backgroundColor: "var(--gold)",
            margin: "0 auto 1rem",
          }}
        />
        <p
          style={{
            fontStyle: "italic",
            fontSize: "0.875rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
          }}
        >
          "Sıradaki sahne senin."
        </p>
      </div>

      {/* Sosyal Medya */}
      {socialLinks.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {socialLinks.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color: "var(--text-muted)",
                transition: "color 200ms ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      )}

      {/* Alt Bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "var(--text-hint)",
            letterSpacing: "0.05em",
          }}
        >
          © {currentYear} {settings?.siteName || "Samet Öztürk"}. Tüm hakları saklıdır.
        </p>
        <nav style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { label: "Hakkında", href: "#hakkinda" },
            { label: "Videolar", href: "#videolar" },
            { label: "Galeri", href: "#galeri" },
            { label: "İletişim", href: "#iletisim" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "11px",
                color: "var(--text-hint)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "color 200ms ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-hint)")}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
