"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { RiCloseLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

type LightboxMode = "photo" | "video";

type LightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: LightboxMode;
  // Photo mode
  src?: string;
  alt?: string;
  blurDataURL?: string;
  // Video mode
  youtubeId?: string;
  // Navigation
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalCount?: number;
};

export function Lightbox({
  isOpen,
  onClose,
  mode,
  src,
  alt,
  blurDataURL,
  youtubeId,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
}: LightboxProps) {
  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Klavye navigasyonu
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
    },
    [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  // Touch swipe
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50 && onPrev && hasPrev) onPrev();
    if (delta < -50 && onNext && hasNext) onNext();
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9995,
            backgroundColor: "rgba(8,8,8,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          {/* Desktop Counter */}
          {totalCount !== undefined && currentIndex !== undefined && totalCount > 0 && (
            <div
              className="lightbox-counter-desktop"
              style={{
                position: "absolute",
                top: "2.15rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-display), serif",
                fontSize: "14px",
                letterSpacing: "0.15em",
                color: "var(--text-hint)",
                zIndex: 10,
              }}
            >
              <span style={{ color: "var(--gold)" }}>{currentIndex + 1}</span> / {totalCount}
            </div>
          )}

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Kapat"
            className="lightbox-close"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              cursor: "none",
              zIndex: 10,
              transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <RiCloseLine size={24} />
          </button>

          {/* Desktop Arrows */}
          <div className="lightbox-nav-desktop">
            {hasPrev && onPrev && (
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Önceki"
                style={{
                  position: "absolute",
                  left: "2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  cursor: "none",
                  transition: "all 300ms ease",
                }}
              >
                <RiArrowLeftLine size={24} />
              </button>
            )}

            {hasNext && onNext && (
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Sonraki"
                style={{
                  position: "absolute",
                  right: "2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  cursor: "none",
                  transition: "all 300ms ease",
                }}
              >
                <RiArrowRightLine size={24} />
              </button>
            )}
          </div>

          {/* Mobile Nav Bar */}
          <div className="lightbox-nav-mobile">
            <button
              onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
              disabled={!hasPrev}
              style={{ opacity: hasPrev ? 1 : 0.3, background: "none", border: "none", color: "var(--gold)", padding: "0.5rem" }}
            >
              <RiArrowLeftLine size={24} />
            </button>
            
            {totalCount !== undefined && currentIndex !== undefined && (
              <div style={{ 
                fontFamily: "var(--font-display), serif", 
                fontSize: "13px", 
                color: "#888", 
                whiteSpace: "nowrap",
                flexShrink: 0
              }}>
                <span style={{ color: "var(--gold)" }}>{currentIndex + 1}</span> / {totalCount}
              </div>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); onNext?.(); }}
              disabled={!hasNext}
              style={{ opacity: hasNext ? 1 : 0.3, background: "none", border: "none", color: "var(--gold)", padding: "0.5rem" }}
            >
              <RiArrowRightLine size={24} />
            </button>
          </div>

          {/* İçerik */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: mode === "video" ? "1000px" : "90vw",
              width: "100%",
              position: "relative",
              zIndex: 5,
            }}
          >
            {mode === "photo" && src && (
              <div style={{ position: "relative", width: "100%", maxHeight: "80vh", overflow: "hidden", borderRadius: "8px" }}>
                <Image
                  src={src}
                  alt={alt || ""}
                  width={1600}
                  height={1200}
                  style={{ width: "100%", height: "auto", maxHeight: "80vh", objectFit: "contain" }}
                  placeholder={blurDataURL ? "blur" : "empty"}
                  blurDataURL={blurDataURL}
                  priority
                />
              </div>
            )}
            {mode === "video" && youtubeId && (
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>
            )}
          </motion.div>

          <style dangerouslySetInnerHTML={{ __html: `
            .lightbox-nav-mobile {
              display: none;
              position: absolute;
              bottom: 2rem;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(15, 15, 15, 0.85);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 40px;
              padding: 0.6rem 1.25rem;
              align-items: center;
              gap: 1.15rem;
              flex-wrap: nowrap;
              z-index: 20;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            @media (max-width: 768px) {
              .lightbox-nav-desktop, .lightbox-counter-desktop {
                display: none !important;
              }
              .lightbox-nav-mobile {
                display: flex;
              }
              .lightbox-close {
                top: 1rem !important;
                right: 1rem !important;
                width: 40px !important;
                height: 40px !important;
              }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
