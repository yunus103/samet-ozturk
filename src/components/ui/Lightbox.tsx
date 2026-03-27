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
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Kapat"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              cursor: "none",
              transition: "border-color 200ms, color 200ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLElement).style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            <RiCloseLine size={20} />
          </button>

          {/* Prev */}
          {hasPrev && onPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Önceki"
              style={{
                position: "absolute",
                left: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                cursor: "none",
                transition: "border-color 200ms, color 200ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              <RiArrowLeftLine size={20} />
            </button>
          )}

          {/* Next */}
          {hasNext && onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Sonraki"
              style={{
                position: "absolute",
                right: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                cursor: "none",
                transition: "border-color 200ms, color 200ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              <RiArrowRightLine size={20} />
            </button>
          )}

          {/* İçerik */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: mode === "video" ? "900px" : "80vw",
              width: "100%",
              position: "relative",
            }}
          >
            {mode === "photo" && src && (
              <div style={{ position: "relative", width: "100%", maxHeight: "85vh", overflow: "hidden", borderRadius: "8px" }}>
                <Image
                  src={src}
                  alt={alt || ""}
                  width={1200}
                  height={800}
                  style={{ width: "100%", height: "auto", maxHeight: "85vh", objectFit: "contain" }}
                  placeholder={blurDataURL ? "blur" : "empty"}
                  blurDataURL={blurDataURL}
                />
              </div>
            )}
            {mode === "video" && youtubeId && (
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
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
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
