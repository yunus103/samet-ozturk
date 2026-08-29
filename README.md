<div align="right">
  <img src="https://img.shields.io/badge/English_EN-2563EB?style=for-the-badge" alt="English" />
  <a href="./README.tr.md">
    <img src="https://img.shields.io/badge/Türkçe_TR-374151?style=for-the-badge" alt="Türkçe" />
  </a>
</div>

# Samet Öztürk — Official Digital Platform & Showcase

An enterprise-grade, high-performance web platform and digital portfolio engineered for percussion and stage artist **Samet Öztürk**. Built with Next.js 16, React 19, and Sanity CMS, the platform delivers an immersive, dark-aesthetic visual experience paired with instantaneous on-demand content revalidation and rigorous technical SEO.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Purpose & Implementation |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server Components (RSC), Edge-ready routing, zero-bundle overhead |
| **Runtime & UI** | React 19 / TypeScript 5 | Strict type-safety, concurrent rendering, and native transitions |
| **Content Platform** | Sanity CMS v3 | Headless content lake with embedded Studio at `/studio` |
| **Styling & Tokens** | Tailwind CSS v4 | CSS variable theming, dark luxury aesthetic, typography engine |
| **Animation & Motion** | Framer Motion & CSS Waves | Scroll-driven reveals, sound wave visualizers, magnetic buttons |
| **Form & Email** | Nodemailer + Custom API | Secure SMTP-based inquiry pipeline with schema validation |
| **Config & Safety** | Zod + `@t3-oss/env-nextjs` | Build-time and runtime environment variable validation |

---

## ✨ Core Modules & Functional Features

- **Immersive Hero Stage:** Multi-layered viewport with lazy-loaded high-bitrate video, blur-up LQIP poster fallback, live sound wave frequency animation, and magnetic interactive buttons.
- **Dynamic Showreel & Media Gallery:** Modular video showcase supporting YouTube/Vimeo embeds and direct MP4 streams alongside a touch-optimized lightbox image gallery with keyboard navigation.
- **Content Hub & Editorial Blog:** GROQ-powered dynamic article engine featuring Portable Text rich-text rendering with customizable media embeds and syntax styling.
- **Direct Booking & Inquiries:** Real-time validated contact form backed by Nodemailer SMTP integration and a floating instant WhatsApp communication channel.
- **Granular Studio Singleton Control:** Custom Sanity Studio desk structure with singletons for global site settings, navigation trees, and home page layout modules.

---

## ⚡ Caching, ISR & Live Preview Architecture

```
[Sanity Studio Update] ──> [Sanity Webhook] ──> [/api/revalidate] ──> [revalidateTag / revalidatePath] ──> [Instant CDN Cache Update]
```

- **On-Demand ISR:** Webhook-triggered tag invalidation (`layout`, `home`, `blog`, `siteSettings`) via cryptographically verified signatures (`@sanity/webhook`).
- **Live Draft Mode Preview:** Token-authenticated preview engine (`/api/draft/enable`) enabling content creators to preview drafts in real-time without publishing.
- **Asset Optimization:** Next-generation image pipeline (`@sanity/image-url` & `next/image`) with automated WebP/AVIF transcoding and responsive `srcset` generation.

---

## 🔍 SEO & Web Standards

- **Semantic Structured Data:** Automated JSON-LD schemas (`Organization`, `Article`, `WebSite`) embedded per page for rich Google search graph indexing.
- **Dynamic Meta Engine:** Automated OpenGraph, Twitter Cards, canonical URLs, and Google Search Console verification headers.
- **Automated Sitemap & Robots:** Dynamic XML sitemap generation (`/sitemap.xml`) indexing published blog posts and core routes in real time.

---

## 📂 Project Directory Structure

```text
src/
├── app/
│   ├── (site)/             # Public route group (Home, Blog, Detail pages)
│   │   ├── blog/           # Editorial listing & dynamic [slug] routes
│   │   ├── layout.tsx      # Global chrome (Navbar, SiteFooter, CustomCursor, Grain)
│   │   └── page.tsx        # High-impact home page with force-cache & tag binding
│   ├── api/
│   │   ├── contact/        # Contact submission handler (Nodemailer SMTP)
│   │   ├── draft/          # Secure draft mode preview enable/disable handlers
│   │   └── revalidate/     # Webhook endpoint for on-demand ISR cache purging
│   ├── studio/             # Embedded Sanity Studio CMS route (/studio)
│   ├── layout.tsx          # Root HTML layout with Google Font variables (Cinzel, DM Sans)
│   ├── robots.ts           # Dynamic robots.txt generation
│   └── sitemap.ts          # Dynamic sitemap generator
├── components/
│   ├── forms/              # Contact and interactive form controls
│   ├── layout/             # Navbar, Footer, Custom Cursor, Audio wave bars, Overlays
│   ├── sections/           # Hero, About, Videos, Gallery, and Contact sections
│   ├── seo/                # JsonLd structured data injectors
│   └── ui/                 # SanityImage, Lightbox, MagneticButton, RichText, Shads
├── lib/
│   ├── env.ts              # Type-safe environment variable schema (T3 Env + Zod)
│   ├── seo.ts              # Metadata generation builder utility
│   └── utils.ts            # Class merge (clsx + tailwind-merge) and date formatters
└── sanity/
    ├── lib/                # Sanity client, image builder, and GROQ queries
    ├── plugins/            # Desk singleton locking plugins
    ├── schemaTypes/        # Schemas (Singletons: Home, Settings; Documents: Blog)
    └── structure.ts        # Custom CMS Studio sidebar taxonomy
```

---

## 🛡️ Security & Engineering Standards

- **Type-Safe Environments:** Zero runtime config failures via compile-time validated environment variables.
- **Webhook Security:** HMAC SHA-256 signature verification preventing spoofed cache purging.
- **Content Security & Resiliency:** Isolated preview clients, sanitized input payloads, and graceful error boundary handling across all views.
