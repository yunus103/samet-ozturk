"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Lightbox } from "@/components/ui/Lightbox";
import { urlForImage, getImageLqip } from "@/sanity/lib/image";

type GalleryImage = {
  _key?: string;
  order?: number;
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
  const blur = getImageLqip(item.image as any);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        breakInside: "avoid",
        marginBottom: "12px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
        cursor: "none",
        border: `1px solid ${hovered ? "var(--gold-border)" : "transparent"}`,
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 300ms ease, border-color 300ms ease",
        boxShadow: hovered ? "0 0 20px rgba(212,168,67,0.1)" : "none",
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
            filter: hovered ? "brightness(1.1) contrast(1.02)" : "brightness(0.85)",
            transition: "filter 300ms ease",
          }}
        />
      )}
      {/* Grain overlay (hover'da kalkıyor) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 0 : 0.4,
          transition: "opacity 300ms ease",
          background: "repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 4px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export function GallerySection({ data }: GallerySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  const sectionLabel = data?.gallerySectionLabel || "GALERİ";
  const sectionTitle = data?.gallerySectionTitle || "Sahneden Kareler";
  const allImages: GalleryImage[] = data?.galleryImages || [];
  const displayImages = expanded ? allImages : allImages.slice(0, INITIAL_COUNT);
  const totalCount = allImages.length;

  const openLightbox = (idx: number) => setLightboxIdx(idx);

  const currentImage = lightboxIdx >= 0 ? displayImages[lightboxIdx] : null;
  const lightboxSrc = currentImage?.image?.asset
    ? urlForImage(currentImage.image as any)?.auto("format").width(1600).url() || undefined
    : undefined;
  const lightboxBlur = currentImage?.image ? getImageLqip(currentImage.image as any) : undefined;

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
                {displayImages.length} / {totalCount}
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

        {/* Masonry Grid */}
        {displayImages.length > 0 ? (
          <div
            style={{
              columns: "3",
              columnGap: "12px",
            }}
            className="masonry-grid"
          >
            {displayImages.map((item, idx) => (
              <GalleryItem
                key={item._key || idx}
                item={item}
                onClick={() => openLightbox(idx)}
              />
            ))}
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

        {/* Tümünü Göster Butonu */}
        {!expanded && totalCount > INITIAL_COUNT && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            <MagneticButton
              onClick={() => setExpanded(true)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                border: "1px solid var(--gold-border)",
                padding: "1rem 2.5rem",
                backgroundColor: "transparent",
                transition: "background-color 300ms, color 300ms",
              }}
              aria-label={`Tümünü Göster (${totalCount})`}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.backgroundColor = "var(--gold)";
                e.currentTarget.style.color = "#080808";
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--gold)";
              }}
            >
              TÜMÜNÜ GÖSTER ({totalCount})
            </MagneticButton>
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
        blurDataURL={lightboxBlur || undefined}
        onPrev={lightboxIdx > 0 ? () => setLightboxIdx(lightboxIdx - 1) : undefined}
        onNext={lightboxIdx < displayImages.length - 1 ? () => setLightboxIdx(lightboxIdx + 1) : undefined}
        hasPrev={lightboxIdx > 0}
        hasNext={lightboxIdx < displayImages.length - 1}
      />

      <style>{`
        @media (max-width: 768px) {
          .masonry-grid { columns: 1 !important; }
        }
        @media (max-width: 1024px) {
          .masonry-grid { columns: 2 !important; }
        }
      `}</style>
    </section>
  );
}
