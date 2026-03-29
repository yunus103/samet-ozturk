"use client";

import { useRef, useEffect } from "react";
import { FaInstagram, FaYoutube, FaFacebookF, FaPhoneAlt } from "react-icons/fa";

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

  if (data?.contactPhone) {
    socialLinks.unshift({
      href: `tel:${data.contactPhone.replace(/\\s+/g, "")}`,
      Icon: FaPhoneAlt,
      label: "PHONE"
    });
  }

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
        backgroundColor: "#000",
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
          font-family: var(--font-rubik-dirt), var(--font-creepster), cursive;
          font-size: clamp(2.5rem, 8vw, 6rem);
          color: #ffffff;
          line-height: 1;
          margin: 0 0 4rem 0; /* Changed from 0 to add 4rem bottom margin */
          letter-spacing: 0.02em;
        }

        .contact-info-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 4rem;
        }

        .contact-email-link {
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 800;
          font-size: clamp(16px, 3vw, 24px);
          color: #ffffff;
          text-decoration: none;
          letter-spacing: 0.05em;
          /* Resimdeki glitch benzeri efekt (mavi/kırmızı-turuncu gölgeler) */
          text-shadow: 2px 0px 0px #00e5ff;
          transition: filter 200ms, transform 200ms;
        }

        .contact-email-link:hover {
          filter: brightness(1.2);
          transform: scale(1.02);
        }

        .contact-message-text {
          font-family: var(--font-new-rocker), var(--font-creepster), cursive;
          font-size: clamp(14px, 2.5vw, 20px);
          color: #ffffff;
          letter-spacing: 0.05em;
          margin: 0;
          /* Resimdeki turuncu/kahverengi arka plan/stroke efekti */
          text-shadow: 2px 2px 0px #cc6600, -1px -1px 0px #cc6600, 1px -1px 0px #cc6600, -1px 1px 0px #cc6600;
        }

        .social-icons-container {
          display: flex;
          gap: 3rem;
          margin-top: 1rem;
        }

        .social-icon-wrapper {
          color: #ffffff;
          /* İkonlara 3D blok derinliği efekti (Resimdeki gri gölge) */
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
            background: linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, transparent 100%) !important;
          }
          .contact-bg-video {
            object-position: 90% center; /* Mobilde videonun sağ tarafındaki içeriğe odaklanmak için */
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
            opacity: 0.8,
          }}
        />
      )}

      {/* Dark Overlay for content readability */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
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
          <p className="contact-message-text" style={{ marginTop: "0.5rem" }}>
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
              <Icon size={label === "PHONE" ? 34 : 40} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
