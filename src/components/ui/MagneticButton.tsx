"use client";

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  type?: "button" | "submit" | "reset";
  onMouseEnter?: (e: React.MouseEvent<any>) => void;
  onMouseLeave?: (e: React.MouseEvent<any>) => void;
  onMouseDown?: (e: React.MouseEvent<any>) => void;
};

export function MagneticButton({
  children,
  className,
  style,
  onClick,
  as = "button",
  href,
  target,
  rel,
  "aria-label": ariaLabel,
  type,
  onMouseEnter,
  onMouseLeave: onMouseLeaveProp,
  onMouseDown,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // RAF-tabanlı magnetic offset — CSS transition'a hiç dokunmuyoruz
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId = 0;
    let isActive = false;  // hover'da mı?

    function animate() {
      // Hover'da hızlı takip, çıkışta spring geri dönüş
      const factor = isActive ? 0.25 : 0.08;
      currentX += (targetX - currentX) * factor;
      currentY += (targetY - currentY) * factor;

      el!.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;

      // Yeterince yakınsadıysa RAF'ı durdur
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(animate);
      } else {
        el!.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = Math.min(Math.max(e.clientX - cx, -14), 14);
      targetY = Math.min(Math.max(e.clientY - cy, -14), 14);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterInternal = () => {
      isActive = true;
    };

    const onMouseLeaveInternal = () => {
      isActive = false;
      targetX = 0;
      targetY = 0;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseenter", onMouseEnterInternal);
    el.addEventListener("mouseleave", onMouseLeaveInternal);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseenter", onMouseEnterInternal);
      el.removeEventListener("mouseleave", onMouseLeaveInternal);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const Tag = (as === "a" ? "a" : "button") as any;

  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      type={as === "button" ? (type || "button") : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeaveProp}
      onMouseDown={onMouseDown}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
