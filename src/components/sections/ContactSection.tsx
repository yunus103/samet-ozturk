"use client";

import { useState, useRef, useCallback, type ChangeEvent, type FormEvent } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

type ContactSectionProps = {
  data: {
    contactSectionLabel?: string;
    contactSectionTitle?: string;
    contactSectionSubtitle?: string;
    contactEmail?: string;
    contactInstagram?: string;
    contactInstagramUrl?: string;
    contactYoutubeUrl?: string;
    contactFacebookUrl?: string;
  };
};

type FormData = {
  ad: string;
  email: string;
  etkinlikTuru: string;
  etkinlikTarihi: string;
  mesaj: string;
};

const EVENT_TYPES = [
  "Düğün",
  "Kurumsal Etkinlik",
  "Özel Gece",
  "Gala",
  "Festival",
  "Uluslararası",
  "Diğer",
];

function FloatInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative", paddingTop: "1.25rem" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 0,
          top: active ? "0" : "1.75rem",
          fontSize: active ? "10px" : "13px",
          letterSpacing: active ? "0.15em" : "0.05em",
          color: focused ? "var(--gold)" : "var(--text-hint)",
          textTransform: active ? "uppercase" : "none",
          transition: "all 200ms ease",
          pointerEvents: "none",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          borderBottom: "1px solid var(--border-default)",
          padding: "0.5rem 0",
          color: "var(--text-heading)",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          outline: "none",
        }}
      />
      {/* Altın underline animasyonu */}
      <div
        style={{
          height: "1px",
          backgroundColor: "var(--gold)",
          width: focused ? "100%" : "0%",
          transition: "width 300ms ease",
          marginTop: "-1px",
        }}
      />
    </div>
  );
}

export function ContactSection({ data }: ContactSectionProps) {
  const [form, setForm] = useState<FormData>({
    ad: "",
    email: "",
    etkinlikTuru: "",
    etkinlikTarihi: "",
    mesaj: "",
  });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const [mesajFocused, setMesajFocused] = useState(false);

  const sectionLabel = data?.contactSectionLabel || "İLETİŞİM";
  const sectionTitle = data?.contactSectionTitle || "Sahneye Davet Et";
  const subtitle = data?.contactSectionSubtitle || "Düğün, kurumsal etkinlik, özel gece veya uluslararası proje.";

  const socialLinks = [
    { href: data?.contactInstagramUrl || "#", Icon: FaInstagram, label: "INSTAGRAM" },
    { href: data?.contactYoutubeUrl || "#", Icon: FaYoutube, label: "YOUTUBE" },
    { href: data?.contactFacebookUrl || "#", Icon: FaFacebook, label: "FACEBOOK" },
  ].filter(s => s.href !== "#");

  const handleChange = (field: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setToast("success");
        setForm({ ad: "", email: "", etkinlikTuru: "", etkinlikTarihi: "", mesaj: "" });
      } else {
        setToast("error");
      }
    } catch {
      setToast("error");
    } finally {
      setSending(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <section
      id="iletisim"
      style={{
        backgroundColor: "var(--bg-main)",
        position: "relative",
        padding: "clamp(4rem, 10vh, 7rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}
    >
      {/* Spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "5rem",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
        }}
        className="contact-grid"
      >
        {/* Sol Kolon — İletişim Bilgileri */}
        <div>
          <SectionLabel title={sectionLabel} style={{ marginBottom: "1.5rem" }} />
          <h2
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "var(--text-heading)",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            {sectionTitle.split("/").map((word, i) => (
              <span key={i} style={{ display: "block", paddingLeft: i > 0 ? "1.5rem" : 0 }}>
                {word.trim()}
              </span>
            ))}
          </h2>
          <p
            style={{
              fontStyle: "italic",
              fontSize: "13px",
              color: "var(--text-muted)",
              letterSpacing: "0.03em",
              marginBottom: "2rem",
            }}
          >
            {subtitle}
          </p>

          {/* Altın Divider */}
          <div style={{ width: "40px", height: "1px", backgroundColor: "var(--gold)", marginBottom: "2rem" }} />

          {/* İletişim Bilgileri */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
            {data?.contactEmail && (
              <a
                href={`mailto:${data.contactEmail}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--gold)", flexShrink: 0 }} />
                {data.contactEmail}
              </a>
            )}
            {data?.contactInstagram && (
              <a
                href={data.contactInstagramUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--gold)", flexShrink: 0 }} />
                @{data.contactInstagram}
              </a>
            )}
          </div>

          {/* Sosyal Medya */}
          {socialLinks.length > 0 && (
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-hint)",
                    border: "1px solid var(--border-default)",
                    padding: "0.5rem 1rem",
                    borderRadius: "2px",
                    textDecoration: "none",
                    transition: "color 200ms, border-color 200ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--gold-border)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-hint)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)";
                  }}
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Sağ Kolon — Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Ad Soyad + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="form-row">
            <FloatInput id="contact-ad" label="Ad Soyad" value={form.ad} onChange={handleChange("ad")} required />
            <FloatInput id="contact-email" label="E-posta" type="email" value={form.email} onChange={handleChange("email")} required />
          </div>

          {/* Etkinlik Türü + Tarih */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="form-row">
            {/* Etkinlik Türü */}
            <div style={{ position: "relative", paddingTop: "1.25rem" }}>
              <label
                htmlFor="contact-etkinlik-turu"
                style={{
                  position: "absolute",
                  left: 0,
                  top: form.etkinlikTuru ? "0" : "1.75rem",
                  fontSize: form.etkinlikTuru ? "10px" : "13px",
                  letterSpacing: form.etkinlikTuru ? "0.15em" : "0.05em",
                  color: "var(--text-hint)",
                  textTransform: form.etkinlikTuru ? "uppercase" : "none",
                  transition: "all 200ms ease",
                  pointerEvents: "none",
                }}
              >
                Etkinlik Türü
              </label>
              <select
                id="contact-etkinlik-turu"
                value={form.etkinlikTuru}
                onChange={handleChange("etkinlikTuru") as any}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--border-default)",
                  padding: "0.5rem 0",
                  color: form.etkinlikTuru ? "var(--text-heading)" : "transparent",
                  fontSize: "14px",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  cursor: "none",
                }}
              >
                <option value="" disabled />
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t} style={{ backgroundColor: "#111111", color: "#fff" }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <FloatInput id="contact-tarih" label="Etkinlik Tarihi" type="date" value={form.etkinlikTarihi} onChange={handleChange("etkinlikTarihi")} />
          </div>

          {/* Mesaj */}
          <div style={{ position: "relative", paddingTop: "1.25rem" }}>
            <label
              htmlFor="contact-mesaj"
              style={{
                position: "absolute",
                left: 0,
                top: mesajFocused || form.mesaj ? "0" : "1.75rem",
                fontSize: mesajFocused || form.mesaj ? "10px" : "13px",
                letterSpacing: mesajFocused || form.mesaj ? "0.15em" : "0.05em",
                color: mesajFocused ? "var(--gold)" : "var(--text-hint)",
                textTransform: mesajFocused || form.mesaj ? "uppercase" : "none",
                transition: "all 200ms ease",
                pointerEvents: "none",
              }}
            >
              Mesaj
            </label>
            <textarea
              id="contact-mesaj"
              value={form.mesaj}
              onChange={handleChange("mesaj") as any}
              onFocus={() => setMesajFocused(true)}
              onBlur={() => setMesajFocused(false)}
              rows={4}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                borderBottom: "1px solid var(--border-default)",
                padding: "0.5rem 0",
                color: "var(--text-heading)",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                outline: "none",
                resize: "vertical",
              }}
            />
            <div
              style={{
                height: "1px",
                backgroundColor: "var(--gold)",
                width: mesajFocused ? "100%" : "0%",
                transition: "width 300ms ease",
                marginTop: "-1px",
              }}
            />
          </div>

          {/* Gönder Butonu */}
          <button
            type="submit"
            disabled={sending}
            style={{
              width: "100%",
              padding: "1.25rem",
              backgroundColor: "var(--gold)",
              color: "#080808",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: "none",
              cursor: sending ? "not-allowed" : "none",
              opacity: sending ? 0.7 : 1,
              position: "relative",
              overflow: "hidden",
              transition: "opacity 200ms",
            }}
            onMouseEnter={(e) => {
              if (!sending) {
                const btn = e.currentTarget;
                const shine = document.createElement("div");
                shine.style.cssText = `position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);animation:shinePass 500ms ease forwards;`;
                btn.appendChild(shine);
                setTimeout(() => shine.remove(), 500);
              }
            }}
          >
            {sending ? "GÖNDERİLİYOR..." : "GÖNDER"}
          </button>
        </form>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 999,
            backgroundColor: toast === "success" ? "var(--card)" : "#3a1a1a",
            border: `1px solid ${toast === "success" ? "var(--gold-border)" : "rgba(255,80,80,0.3)"}`,
            borderRadius: "4px",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            animation: "fadeInUp 0.3s ease",
          }}
        >
          <span style={{ color: toast === "success" ? "var(--gold)" : "#ff6b6b", fontSize: "18px" }}>
            {toast === "success" ? "✓" : "✕"}
          </span>
          <span style={{ color: "var(--text-body)", fontSize: "13px" }}>
            {toast === "success" ? "Mesajınız alındı. En kısa sürede dönüş yapacağım." : "Bir hata oluştu. Lütfen tekrar deneyin."}
          </span>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        @keyframes shinePass {
          from { left: -100%; }
          to { left: 100%; }
        }
      `}</style>
    </section>
  );
}
