import { groq } from "next-sanity";

// ─── Layout ────────────────────────────────────────────────────────────────────
export const layoutQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    siteName, siteTagline,
    logo { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
    contactInfo { phone, email, address, whatsappNumber },
    socialLinks[] { platform, url },
    gaId, gtmId
  },
  "navigation": *[_type == "navigation"][0] {
    headerLinks[] { label, linkType, internalSlug, externalUrl, openInNewTab },
    footerLinks[] { label, linkType, internalSlug, externalUrl, openInNewTab }
  }
}`;

// ─── Ana Sayfa (Landing Page) ──────────────────────────────────────────────────
export const homePageQuery = groq`*[_type == "homePage"][0] {
  // Hero
  heroEyebrow,
  heroFirstName,
  heroLastName,
  heroTagline,
  heroCtaLabel,
  heroVerticalText,
  heroVideoUrl,
  heroVideoPoster { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },

  // Hakkında
  aboutSectionLabel,
  aboutSectionTitle,
  aboutPhoto { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  aboutBio[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, hotspot, crop
    }
  },
  aboutStats[] { _key, value, label },

  // Videolar
  videoSectionLabel,
  videoSectionTitle,
  featuredVideoId,
  featuredVideoLabel,
  videos[] { _key, title, youtubeId, category },

  // Galeri
  gallerySectionLabel,
  gallerySectionTitle,
  galleryImages[] {
    _key,
    caption,
    image { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  },

  // İletişim
  contactSectionLabel,
  contactSectionTitle,
  contactSectionSubtitle,
  contactEmail,
  contactPhone,
  contactInstagram,
  contactInstagramUrl,
  contactYoutubeUrl,
  contactFacebookUrl,
  contactBgVideoUrl,

  // SEO
  seo
}`;

// ─── Blog ──────────────────────────────────────────────────────────────────────
export const blogListQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  title, slug, publishedAt, excerpt,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  body[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, alignment, size, hotspot, crop
    }
  },
  seo
}`;

// ─── Sitemap ───────────────────────────────────────────────────────────────────
export const allSlugsForSitemapQuery = groq`{
  "blogPosts": *[_type == "blogPost" && defined(slug.current)] { "slug": slug.current, _updatedAt }
}`;

// ─── Varsayılan SEO ────────────────────────────────────────────────────────────
export const defaultSeoQuery = groq`*[_type == "siteSettings"][0] {
  "title": defaultSeo.metaTitle,
  "description": defaultSeo.metaDescription,
  "ogImage": defaultOgImage,
  siteName
}`;
