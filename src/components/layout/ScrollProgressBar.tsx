"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [pulse, setPulse] = useState(false);
  const lastSection = useRef<string>("");

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      setProgress(Math.min(window.scrollY / scrollable, 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section geçişinde nabız atışı
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id !== lastSection.current) {
            lastSection.current = entry.target.id;
            setPulse(true);
            setTimeout(() => setPulse(false), 400);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "4px",
        height: "100vh",
        zIndex: 50,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          width: pulse ? "8px" : "4px",
          height: `${progress * 100}%`,
          backgroundColor: "var(--gold)",
          transition: "height 0.1s linear, width 200ms ease",
          transformOrigin: "right",
        }}
      />
    </div>
  );
}
