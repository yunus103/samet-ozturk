"use client";

import { useState, useEffect } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Lightbox } from "@/components/ui/Lightbox";
import { urlForImage, getImageLqip } from "@/sanity/lib/image";

type GalleryImage = {
  _key?: string;
  caption?: string;
  image?: {
    asset?: { _id: string; url: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } };
    alt?: string;
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
};

type GallerySectionProps = {
  data: {
    gallerySectionLabel?: string;
    gallerySectionTitle?: string;
    galleryImages?: GalleryImage[];
  };
};

const INITIAL_COUNT = 9;
const COLUMN_COUNT = 3;

/**
 * Öğeleri sabit bir şekilde sütunlara dağıtır.
 * Index 0,1,2 → sırasıyla col0, col1, col2
 * Index 3,4,5 → col0, col1, col2 ... (round-robin)
 * Bu sayede sıralama asla değişmez.
 */
function distributeToColumns(
  items: Array<{ item: GalleryImage; originalIdx: number }>,
  colCount: number
): Array<Array<{ item: GalleryImage; originalIdx: number }>> {
  const cols: Array<Array<{ item: GalleryImage; originalIdx: number }>> = Array.from(
    { length: colCount },
    () => []
  );
  items.forEach((entry, i) => {
    cols[i % colCount].push(entry);
  });
  return cols;
}

function GalleryItem({
  item,
  onClick,
}: {
  item: GalleryImage;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  if (!item.image?.asset) return null;

  const imageUrl = urlForImage(item.image as any)?.auto("format").width(800).url();

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginBottom: "12px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
        cursor: "none",
        border: `1px solid ${hovered ? "var(--gold-border)" : "transparent"}`,
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease, box-shadow 300ms ease",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.35)" : "none",
      }}
    >
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={item.image?.alt || "Galeri görseli"}
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            filter: hovered
              ? "brightness(1.1) contrast(1.05)"
              : "brightness(0.82) grayscale(0.15)",
            transition: "filter 500ms ease",
          }}
        />
      )}
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 0 : 0.35,
          transition: "opacity 300ms ease",
          background:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 4px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export function GallerySection({ data }: GallerySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const [colCount, setColCount] = useState(COLUMN_COUNT);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth <= 640) {
        setColCount(2); // Mobile
      } else if (window.innerWidth <= 1024) {
        setColCount(2); // Tablet
      } else {
        setColCount(3); // Desktop
      }
    };

    updateColumns();
    setIsMounted(true);
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const sectionLabel = data?.gallerySectionLabel || "GALERİ";
  const sectionTitle = data?.gallerySectionTitle || "Sahneden Kareler";
  const allImages: GalleryImage[] = data?.galleryImages || [];
  const totalCount = allImages.length;

  const indexedImages = allImages.map((item, idx) => ({ item, originalIdx: idx }));
  const visibleImages = expanded ? indexedImages : indexedImages.slice(0, INITIAL_COUNT);
  const columns = distributeToColumns(visibleImages, colCount);

  const openLightbox = (originalIdx: number) => setLightboxIdx(originalIdx);

  const currentImage = lightboxIdx >= 0 ? allImages[lightboxIdx] : null;
  const lightboxSrc = currentImage?.image?.asset
    ? urlForImage(currentImage.image as any)?.auto("format").width(1600).url() || undefined
    : undefined;
  const lightboxBlur = currentImage?.image
    ? getImageLqip(currentImage.image as any)
    : undefined;

  return (
    <section
      id="galeri"
      style={{
        backgroundColor: "var(--bg-section)",
        padding: "clamp(4rem, 10vh, 7rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <SectionLabel title={sectionLabel} style={{ marginBottom: "1rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 400,
                color: "var(--text-heading)",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              {sectionTitle}
            </h2>
          </div>
          {totalCount > 0 && (
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "1.5rem",
                  color: "var(--text-muted)",
                  fontWeight: 400,
                }}
              >
                {totalCount}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-hint)",
                }}
              >
                FOTOĞRAF
              </div>
            </div>
          )}
        </div>

        {/* Masonry Grid — JS Column Distribution */}
        {allImages.length > 0 ? (
          <div style={{ position: "relative" }}>
            {/* Sütun wrapper */}
            <div
              className="masonry-columns"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${colCount}, 1fr)`,
                gap: "12px",
                alignItems: "start",
                opacity: isMounted ? 1 : 0,
                filter: isMounted ? "blur(0px)" : "blur(8px)",
                transform: isMounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), filter 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {columns.map((col, colIdx) => (
                <div key={colIdx} style={{ display: "flex", flexDirection: "column" }}>
                  {col.map(({ item, originalIdx }) => (
                    <GalleryItem
                      key={item._key || originalIdx}
                      item={item}
                      onClick={() => openLightbox(originalIdx)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Gradient Overlay & Reveal Button */}
            {!expanded && totalCount > INITIAL_COUNT && (
              <div
                style={{
                  marginTop: "2.5rem",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Gradient çizgisi */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-120px",
                    left: 0,
                    right: 0,
                    height: "120px",
                    background:
                      "linear-gradient(to top, var(--bg-section) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                <MagneticButton
                  onClick={() => setExpanded(true)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    border: "1px solid var(--gold-border)",
                    padding: "1.2rem 3rem",
                    backgroundColor: "transparent",
                    transition: "all 300ms ease",
                    position: "relative",
                    zIndex: 2,
                  }}
                  aria-label={`Tümünü Göster (${totalCount})`}
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.backgroundColor = "var(--gold)";
                    e.currentTarget.style.color = "#080808";
                    e.currentTarget.style.borderColor = "var(--gold)";
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--gold)";
                    e.currentTarget.style.borderColor = "var(--gold-border)";
                  }}
                >
                  GALERİYİ KEŞFET ({totalCount - INITIAL_COUNT} daha)
                </MagneticButton>
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              color: "var(--text-hint)",
              fontSize: "13px",
              letterSpacing: "0.1em",
            }}
          >
            Sanity Studio'dan galeri fotoğrafı ekleyin.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxIdx >= 0}
        onClose={() => setLightboxIdx(-1)}
        mode="photo"
        src={lightboxSrc}
        alt={currentImage?.image?.alt || ""}
        caption={currentImage?.caption}
        blurDataURL={lightboxBlur || undefined}
        onPrev={lightboxIdx > 0 ? () => setLightboxIdx(lightboxIdx - 1) : undefined}
        onNext={
          lightboxIdx < allImages.length - 1
            ? () => setLightboxIdx(lightboxIdx + 1)
            : undefined
        }
        hasPrev={lightboxIdx > 0}
        hasNext={lightboxIdx < allImages.length - 1}
        currentIndex={lightboxIdx}
        totalCount={allImages.length}
      />

      <style>{`
        @media (max-width: 640px) {
          .masonry-columns { grid-template-columns: repeat(${colCount}, 1fr) !important; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .masonry-columns { grid-template-columns: repeat(${colCount}, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
