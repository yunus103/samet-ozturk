"use client";

import { useRef, useEffect } from "react";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";

type ContactSectionProps = {
  data: {
    contactSectionLabel?: string;
    contactSectionTitle?: string;
    contactSectionSubtitle?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactInstagram?: string;
    contactInstagramUrl?: string;
    contactYoutubeUrl?: string;
    contactFacebookUrl?: string;
    contactBgVideoUrl?: string;
  };
};

export function ContactSection({ data }: ContactSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video autplay engellendi:", err);
      });
    }
  }, []);

  const socialLinks = [
    { href: data?.contactFacebookUrl || "#", Icon: FaFacebookF, label: "FACEBOOK" },
    { href: data?.contactYoutubeUrl || "#", Icon: FaYoutube, label: "YOUTUBE" },
    { href: data?.contactInstagramUrl || "#", Icon: FaInstagram, label: "INSTAGRAM" },
  ].filter(s => s.href !== "#");

  const emailText = data?.contactEmail || "INFO@SMTOZTRK.COM";
  const phoneText = data?.contactPhone;
  const customMessage = "BERABER SINIRSIZ EĞLENMEK DİLEĞİYLE !";

  return (
    <section
      id="iletisim"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#f5f5f5", // Light base for transition
      }}
    >
      <style>{`
        .contact-content-container {
          margin-left: 10%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .contact-title-text {
          font-family: var(--font-kalam), cursive;
          font-weight: 700;
          font-size: clamp(3rem, 12vw, 8rem);
          color: #000000;
          line-height: 0.9;
          margin: 0 0 4rem 0;
          letter-spacing: -0.02em;
          text-transform: lowercase;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.15); /* Hafif derinlik */
        }

        .contact-info-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 5rem;
        }

        .contact-email-link {
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 900;
          font-size: clamp(20px, 4.5vw, 32px);
          color: #000000;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-shadow: 2px 4px 10px rgba(0,0,0,0.4), 0px 2px 4px rgba(0,0,0,0.2), 0px 0px 20px rgba(255,255,255,0.5); /* Strong shadow like the image */
          transition: transform 200ms, text-shadow 200ms;
        }

        .contact-email-link:hover {
          transform: scale(1.02);
          text-shadow: 2px 6px 15px rgba(0,0,0,0.5), 0px 3px 6px rgba(0,0,0,0.3), 0px 0px 25px rgba(255,255,255,0.6);
        }

        .contact-message-text {
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 900;
          font-size: clamp(16px, 3vw, 22px);
          color: #000000;
          letter-spacing: 0.05em;
          margin: 0;
          text-transform: uppercase;
          text-shadow: 2px 4px 10px rgba(0,0,0,0.4), 0px 2px 4px rgba(0,0,0,0.2), 0px 0px 20px rgba(255,255,255,0.5);
        }

        .social-icons-container {
          display: flex;
          gap: 3rem;
          margin-top: 1rem;
        }

        .social-icon-wrapper {
          color: #ffffff;
          /* İkonlara eski 3D blok derinliği efekti (Gri/Beyaz gölge) */
          filter: drop-shadow(4px 4px 0px #a3a3a3) drop-shadow(1px 1px 0px #a3a3a3);
          transition: transform 200ms;
        }

        .social-icon-wrapper:hover {
          transform: translate(-2px, -2px);
          filter: drop-shadow(6px 6px 0px #a3a3a3) drop-shadow(2px 2px 0px #a3a3a3);
        }

        .contact-bg-video {
          object-position: center;
        }

        @media (max-width: 768px) {
          .contact-content-container {
            margin-left: 0;
            width: 100%;
            padding: 2rem;
            align-items: center;
          }
          .contact-gradient {
            background: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 100%) !important;
          }
          .contact-bg-video {
            object-position: 85% center; /* Mobilde videonun asil icerigi sagda diye sag tarafa odakla */
          }
        }
      `}</style>

      {/* Background Video */}
      {data?.contactBgVideoUrl && (
        <video
          ref={videoRef}
          src={data.contactBgVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="contact-bg-video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Light Overlay for content readability if video is too bright/dark */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.05)", // Minimal overlay
          zIndex: 1,
          pointerEvents: "none",
        }}
        className="contact-gradient"
      />

      {/* Content Container */}
      <div
        className="contact-content-container"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2 className="contact-title-text">
          contact
        </h2>

        <div className="contact-info-container">
          <a href={`mailto:${emailText.toLowerCase()}`} className="contact-email-link">
            {emailText.toUpperCase()}
          </a>
          
          {phoneText && (
            <a href={`tel:${phoneText.replace(/\s+/g, "")}`} className="contact-email-link">
              {phoneText}
            </a>
          )}

          <p className="contact-message-text" style={{ marginTop: "1.5rem" }}>
            {customMessage}
          </p>
        </div>

        <div className="social-icons-container">
          {socialLinks.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="social-icon-wrapper"
            >
              <Icon size={44} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
