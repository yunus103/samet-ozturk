"use client";

import { useState, MouseEvent } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lightbox } from "@/components/ui/Lightbox";
import { RiPlayCircleLine } from "react-icons/ri";

type Video = { _key?: string; title: string; youtubeId: string; category: string; order?: number };

type VideosSectionProps = {
  data: {
    videoSectionLabel?: string;
    videoSectionTitle?: string;
    featuredVideoId?: string;
    featuredVideoLabel?: string;
    videos?: Video[];
  };
};

const CATEGORIES = ["TÜMÜ", "DARBUKA SHOW", "BRASS", "ORIENT", "KURUMSAL"];
const CAT_MAP: Record<string, string> = {
  darbuka: "DARBUKA SHOW",
  brass: "BRASS",
  orient: "ORIENT",
  kurumsal: "KURUMSAL",
};

function VideoCard({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      onClick={() => onPlay(video.youtubeId)}
      style={{
        position: "relative",
        backgroundColor: "var(--card)",
        borderRadius: "8px",
        overflow: "hidden",
        border: `1px solid ${hovered ? "var(--gold-border)" : "var(--border-default)"}`,
        cursor: "none",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
        boxShadow: hovered ? "0 0 30px rgba(212,168,67,0.12)" : "none",
      }}
    >
      {/* Spotlight */}
      {hovered && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(212,168,67,0.12) 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Thumbnail */}
      <div style={{ position: "relative", paddingBottom: "56.25%", backgroundColor: "#0a0a0a" }}>
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hovered ? 0.7 : 0.5,
            transition: "opacity 300ms ease",
          }}
        />
        {/* Play Icon */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RiPlayCircleLine
            size={40}
            color="var(--gold)"
            style={{
              opacity: hovered ? 1 : 0.6,
              transition: "opacity 200ms ease",
            }}
          />
        </div>
        {/* OYNAT label */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              bottom: "0.75rem",
              right: "0.75rem",
              zIndex: 3,
              fontFamily: "var(--font-body)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--gold)",
              animation: "fadeInUp 0.2s ease",
            }}
          >
            OYNAT
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-heading)",
            marginBottom: "0.4rem",
          }}
        >
          {video.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          {CAT_MAP[video.category] || video.category}
        </div>
      </div>
    </div>
  );
}

export function VideosSection({ data }: VideosSectionProps) {
  const [activeCategory, setActiveCategory] = useState("TÜMÜ");
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const sectionLabel = data?.videoSectionLabel || "SHOWREEL & VİDEOLAR";
  const sectionTitle = data?.videoSectionTitle || "Sahne Anları";
  const featuredId = data?.featuredVideoId;
  const featuredLabel = data?.featuredVideoLabel || "SHOWREEL 2024";
  const allVideos: Video[] = data?.videos || [];

  const filtered = activeCategory === "TÜMÜ"
    ? allVideos
    : allVideos.filter((v) => CAT_MAP[v.category] === activeCategory);

  const openVideo = (id: string) => {
    const idx = filtered.findIndex((v) => v.youtubeId === id);
    setLightboxIdx(idx);
    setLightboxId(id);
  };

  return (
    <section
      id="videolar"
      style={{
        backgroundColor: "var(--bg-main)",
        padding: "clamp(4rem, 10vh, 7rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
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

        {/* Featured Showreel */}
        {featuredId && (
          <div
            onClick={() => setLightboxId(featuredId)}
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              backgroundColor: "var(--surface)",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "2.5rem",
              cursor: "none",
              border: "1px solid var(--border-default)",
            }}
          >
            <img
              src={`https://img.youtube.com/vi/${featuredId}/maxresdefault.jpg`}
              alt="Showreel"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.5,
              }}
            />
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                top: "1.25rem",
                left: "1.25rem",
                zIndex: 2,
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                border: "1px solid var(--gold-border)",
                padding: "0.4rem 0.75rem",
                backgroundColor: "rgba(8,8,8,0.6)",
              }}
            >
              {featuredLabel}
            </div>
            {/* Play */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  border: "1.5px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RiPlayCircleLine size={36} color="var(--gold)" />
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Ana showreel — YouTube embed · lightbox'ta açılır
              </p>
            </div>
          </div>
        )}

        {/* Kategori Filtreler */}
        {allVideos.length > 0 && (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "2px",
                  border: `1px solid ${activeCategory === cat ? "var(--gold)" : "var(--border-default)"}`,
                  color: activeCategory === cat ? "var(--gold)" : "var(--text-muted)",
                  backgroundColor: "transparent",
                  cursor: "none",
                  transition: "border-color 200ms, color 200ms",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Video Grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
            className="video-grid"
          >
            {filtered.map((video) => (
              <VideoCard key={video._key || video.youtubeId} video={video} onPlay={openVideo} />
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
            {allVideos.length === 0
              ? "Sanity Studio'dan video ekleyin."
              : "Bu kategoride video yok."}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={!!lightboxId}
        onClose={() => setLightboxId(null)}
        mode="video"
        youtubeId={lightboxId || undefined}
        onPrev={lightboxIdx > 0 ? () => { const prev = filtered[lightboxIdx - 1]; setLightboxId(prev.youtubeId); setLightboxIdx(lightboxIdx - 1); } : undefined}
        onNext={lightboxIdx < filtered.length - 1 ? () => { const next = filtered[lightboxIdx + 1]; setLightboxId(next.youtubeId); setLightboxIdx(lightboxIdx + 1); } : undefined}
        hasPrev={lightboxIdx > 0}
        hasNext={lightboxIdx < filtered.length - 1}
      />

      <style>{`
        @media (max-width: 768px) {
          .video-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) {
          .video-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
