"use client";

import React from "react";

export function WaveDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "80px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Sol ince çizgi */}
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--gold-border))",
          opacity: 0.3,
        }}
      />

      {/* Ritmik Vuruş (Beat/Pulse) SVG */}
      <div style={{ margin: "0 2rem", position: "relative" }}>
        <svg
          width="120"
          height="40"
          viewBox="0 0 120 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ana Ritim Hattı */}
          <path
            d="M0 20H30L35 10L45 30L55 5L65 35L75 15L80 20H120"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: 300,
              animation: "pulseDraw 3s ease-in-out infinite",
            }}
          />
          {/* Yankı Efekti (Subtle Glow) */}
          <path
            d="M30 20L35 10L45 30L55 5L65 35L75 15L80 20"
            stroke="var(--gold)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: 0.15,
              filter: "blur(4px)",
              animation: "pulseGlow 3s ease-in-out infinite",
            }}
          />
        </svg>

        {/* CSS Keyframes (Inline Style tag for component portability) */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulseDraw {
            0% { stroke-dashoffset: 300; }
            40% { stroke-dashoffset: 0; }
            60% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -300; }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.05; transform: scaleX(0.95); }
            50% { opacity: 0.25; transform: scaleX(1.05); }
          }
        `}} />
      </div>

      {/* Sağ ince çizgi */}
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to left, transparent, var(--gold-border))",
          opacity: 0.3,
        }}
      />
    </div>
  );
}
