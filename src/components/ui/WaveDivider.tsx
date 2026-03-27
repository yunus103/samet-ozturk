"use client";

import { useEffect, useRef } from "react";

export function WaveDivider() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".wave-bar").forEach((bar, i) => {
            (bar as HTMLElement).style.animationDelay = `${i * 80}ms`;
            (bar as HTMLElement).style.animationPlayState = "running";
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const waves = [
    { x: "10%", height: 28 },
    { x: "27.5%", height: 20 },
    { x: "45%", height: 32 },
    { x: "62.5%", height: 18 },
    { x: "80%", height: 26 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "32px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
      aria-hidden="true"
    >
      <svg
        ref={ref}
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {waves.map((w, i) => (
          <rect
            key={i}
            className="wave-bar"
            x={w.x}
            y={(32 - w.height) / 2}
            width="3"
            height={w.height}
            rx="1.5"
            fill="var(--gold)"
            opacity="0.6"
            style={{
              transformOrigin: "center",
              transform: "scaleY(0)",
              animation: "waveReveal 0.5s ease forwards paused",
              animationDelay: `${i * 80}ms`,
            }}
          />
        ))}
        <style>{`
          @keyframes waveReveal {
            from { transform: scaleY(0); }
            to   { transform: scaleY(1); }
          }
        `}</style>
      </svg>
    </div>
  );
}
