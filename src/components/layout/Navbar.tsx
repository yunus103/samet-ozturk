"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "HAKKINDA", href: "#hakkinda" },
  { label: "VİDEOLAR", href: "#videolar" },
  { label: "GALERİ", href: "#galeri" },
  { label: "İLETİŞİM", href: "#iletisim" },
];

export function Navbar({ 
  siteName, 
  logoTextFallback, 
  logoUrl 
}: { 
  siteName?: string; 
  logoTextFallback?: string;
  logoUrl?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menü açıkken scroll kilitle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const displayLogoText = logoTextFallback || siteName || "SAMET ÖZTÜRK | DARBUKA SHOW";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 2rem",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={displayLogoText} 
              style={{ maxHeight: "40px", objectFit: "contain" }} 
            />
          ) : (
            <span style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(14px, 2vw, 18px)",
              fontWeight: 400,
              color: "var(--gold)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>
              {displayLogoText}
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "2.5rem" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleAnchorClick(link.href)}
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                background: "none",
                border: "none",
                padding: 0,
                transition: "color 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç/kapat"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {menuOpen ? <RiCloseLine size={24} color="var(--gold)" /> : <RiMenu3Line size={24} />}
        </button>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              backgroundColor: "#080808",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3rem",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => handleAnchorClick(link.href)}
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "clamp(28px, 6vw, 48px)",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                  background: "none",
                  border: "none",
                  textTransform: "uppercase",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
