"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    // TypeScript için null olmadığı kesinleşmiş referanslar
    const dotEl: HTMLDivElement = dot;
    const ringEl: HTMLDivElement = ring;

    // ── Pointer coarse (touch) kontrolü ──────────────────────────────────
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const isTouch = navigator.maxTouchPoints > 0 || coarseQuery.matches;

    // ── cursor: none için <style> inject ─────────────────────────────────
    // Sadece site aktifken. body.style.cursor = "none" button/link'i geçemiyor
    // çünkü UA stylesheet'te cursor: pointer var ve specificity kazanır.
    const styleEl = document.createElement("style");
    styleEl.id = "custom-cursor-style";
    styleEl.textContent = `
      html.has-custom-cursor,
      html.has-custom-cursor *,
      html.has-custom-cursor a,
      html.has-custom-cursor button,
      html.has-custom-cursor select,
      html.has-custom-cursor label {
        cursor: none !important;
      }
    `;

    let rafId = 0;

    const hideCursor = () => {
      document.documentElement.classList.remove("has-custom-cursor");
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
      cancelAnimationFrame(rafId);
    };

    const showCursor = () => {
      if (!document.getElementById("custom-cursor-style")) {
        document.head.appendChild(styleEl);
      }
      document.documentElement.classList.add("has-custom-cursor");
      dotEl.style.display = "";
      ringEl.style.display = "";
      rafId = requestAnimationFrame(loop);
    };

    if (isStudio || isTouch) {
      hideCursor();
      return () => {
        hideCursor();
        styleEl.remove();
      };
    }

    // ── RAF state ─────────────────────────────────────────────────────────
    let mouseX = -999, mouseY = -999;
    let ringX = -999, ringY = -999;
    // Ring sabit boyut 48px, ölçek ile büyür/küçülür
    const RING_BASE = 48;
    const SCALE_NORMAL = 32 / RING_BASE;  // ≈ 0.667
    const SCALE_HOVER  = 1;               // 48px
    let targetScale = SCALE_NORMAL;
    let currentScale = SCALE_NORMAL;
    let visible = false;
    let hovered = false;

    function loop() {
      // Ring lag
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      // Scale lerp — RAF içinde, CSS transition yok → tam kontrol
      currentScale += (targetScale - currentScale) * 0.10;

      ringEl.style.transform = `translate(${ringX - RING_BASE / 2}px, ${ringY - RING_BASE / 2}px) scale(${currentScale.toFixed(4)})`;
      ringEl.style.backgroundColor = hovered ? "rgba(212,168,67,0.15)" : "transparent";

      rafId = requestAnimationFrame(loop);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dotEl.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

      if (!visible) {
        visible = true;
        ringX = mouseX;
        ringY = mouseY;
        currentScale = SCALE_NORMAL;
        dotEl.style.opacity = "1";
        ringEl.style.opacity = "1";
      }

      const interactive = (e.target as Element)?.closest(
        "a, button, [role='button'], select, label, [data-cursor='hover']"
      );
      hovered = !!interactive;
      targetScale = hovered ? SCALE_HOVER : SCALE_NORMAL;
    };

    const onMouseLeave = () => {
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
      visible = false;
    };

    const onMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ringX = mouseX;
      ringY = mouseY;
      dotEl.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      visible = true;
      dotEl.style.opacity = "1";
      ringEl.style.opacity = "1";
    };

    const onPointerChange = (e: MediaQueryListEvent) => {
      if (e.matches) hideCursor();
      else showCursor();
    };

    showCursor();
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter as EventListener);
    coarseQuery.addEventListener("change", onPointerChange);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter as EventListener);
      coarseQuery.removeEventListener("change", onPointerChange);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-custom-cursor");
      styleEl.remove();
    };
  }, [isStudio]);

  if (isStudio) return null;

  return (
    <>
      {/* Nokta — anlık */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--gold, #D4A843)",
          zIndex: 10000,
          pointerEvents: "none",
          willChange: "transform",
          opacity: 0,
          transition: "opacity 150ms ease",
          transform: "translate(-999px, -999px)",
        }}
      />
      {/* Ring — lag + scale lerp */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          // Sabit 48px — scale ile 32px gibi görünür normalde
          width: `48px`,
          height: `48px`,
          borderRadius: "50%",
          border: "1.5px solid var(--gold, #D4A843)",
          backgroundColor: "transparent",
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          opacity: 0,
          // Sadece opacity transition — boyut/konum RAF'ta
          transition: "opacity 150ms ease",
          transform: "translate(-999px, -999px)",
        }}
      />
    </>
  );
}
