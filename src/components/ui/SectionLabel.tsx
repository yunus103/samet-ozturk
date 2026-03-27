import type { CSSProperties } from "react";

type SectionLabelProps = {
  number?: string;
  title: string;
  className?: string;
  style?: CSSProperties;
};

export function SectionLabel({ number, title, className, style }: SectionLabelProps) {
  return (
    <div
      className={className}
      style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "var(--gold)",
        display: "flex",
        alignItems: "center",
        gap: "0.5em",
        ...style,
      }}
    >
      {number && <span>{number}</span>}
      {number && <span style={{ opacity: 0.4 }}>—</span>}
      <span>{title}</span>
    </div>
  );
}
