<div align="right">
  <a href="./README.md">
    <img src="https://img.shields.io/badge/English_EN-374151?style=for-the-badge" alt="English" />
  </a>
  <img src="https://img.shields.io/badge/Türkçe_TR-2563EB?style=for-the-badge" alt="Türkçe" />
</div>

# Samet Öztürk — Resmi Dijital Platform & Portfolyo

Perküsyon ve sahne sanatçısı **Samet Öztürk** için geliştirilmiş, kurumsal standartlarda yüksek performanslı web platformu ve dijital portfolyo. Next.js 16, React 19 ve Sanity CMS altyapısıyla inşa edilen platform; zengin, karanlık lüks estetiği, anlık istek üzerine içerik yeniden doğrulama (on-demand ISR) ve ileri düzey teknik SEO mimarisini bir araya getirir.

---

## 🏗️ Mimari ve Teknoloji Yığını

| Katman | Teknoloji | Amaç ve Uygulama |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server Components (RSC), Edge uyumlu yönlendirme, sıfır bundle yükü |
| **Çalışma Zamanı & UI** | React 19 / TypeScript 5 | Katı tip güvenliği, eşzamanlı render (concurrent rendering) |
| **İçerik Yönetimi (CMS)** | Sanity CMS v3 | `/studio` üzerinde gömülü Headless Studio ve esnek içerik gölü |
| **Stil & Tasarım Sistemi** | Tailwind CSS v4 | CSS değişken tabanlı tema, karanlık lüks estetik, tipografi motoru |
| **Animasyon & Hareket** | Framer Motion & CSS | Kaydırmaya duyarlı animasyonlar, ses dalgası vizüalizörü, manyetik butonlar |
| **İletişim & E-Posta** | Nodemailer + Özel API | Şema doğrulamalı, SMTP tabanlı güvenli rezervasyon ve talep hattı |
| **Yapılandırma & Güvenlik** | Zod + `@t3-oss/env-nextjs` | Derleme ve çalışma anında tip güvenli ortam değişkeni validasyonu |

---

## ✨ Temel Modüller ve Fonksiyonel Özellikler

- **İnteraktif Hero Sahnesi:** Yüksek bit hızına sahip lazy-load video, LQIP blur-up poster yedeği, canlı ses dalgası frekans animasyonu ve manyetik etkileşimli butonlar.
- **Dinamik Showreel & Medya Galerisi:** YouTube/Vimeo entegrasyonlarını ve doğrudan MP4 akışlarını destekleyen video vitrini ile klavye/dokunmatik kontrollü lightbox görsel galerisi.
- **İçerik Merkezi & Blog:** Portable Text zengin metin render motoruna sahip, medya gömme ve biçimlendirme destekli dinamik GROQ blog altyapısı.
- **Doğrudan İletişim & Rezervasyon:** Gerçek zamanlı doğrulamalı Nodemailer SMTP iletişim formu ve sabit WhatsApp hızlı erişim butonu.
- **Bileşen & Singleton Yönetimi:** Sanity Studio üzerinde site ayarları, navigasyon ağacı ve ana sayfa modülleri için özelleştirilmiş singleton yapılandırması.

---

## ⚡ Önbellekleme (Caching), ISR ve Canlı Önizleme

```
[Sanity Studio Güncelleme] ──> [Sanity Webhook] ──> [/api/revalidate] ──> [revalidateTag / revalidatePath] ──> [Anında CDN Önbellek Güncellemesi]
```

- **On-Demand ISR (İstek Üzerine Yeniden Doğrulama):** `@sanity/webhook` kriptografik imza doğrulaması ile tetiklenen tag bazlı anlık önbellek temizleme (`layout`, `home`, `blog`, `siteSettings`).
- **Canlı Taslak Önizleme (Draft Mode):** İçerik üreticilerinin yayınlamadan önce taslakları anlık olarak sitede görmesini sağlayan güvenli token doğrulamalı önizleme motoru (`/api/draft/enable`).
- **Görsel Optimizasyonu:** `@sanity/image-url` ve `next/image` ile otomatik WebP/AVIF dönüştürme ve duyarlı `srcset` üretimi.

---

## 🔍 SEO ve Web Standartları

- **Semantik Yapılandırılmış Veri:** Google zengin sonuçları için sayfa bazında otomatik enjekte edilen JSON-LD şemaları (`Organization`, `Article`, `WebSite`).
- **Dinamik Meta Motoru:** Otomatik OpenGraph, Twitter Cards, kanonik (canonical) URL'ler ve Google Search Console doğrulama başlıkları.
- **Otomatik Sitemap & Robots:** Yayınlanan blog yazılarını ve temel sayfaları dinamik indeksleyen `/sitemap.xml` ve `/robots.txt` üreticileri.

---

## 📂 Proje Dizin Yapısı

```text
src/
├── app/
│   ├── (site)/             # Kullanıcıya açık route grubu (Ana sayfa, Blog, Detaylar)
│   │   ├── blog/           # Blog listesi ve dinamik [slug] detay sayfaları
│   │   ├── layout.tsx      # Genel site iskeleti (Navbar, SiteFooter, CustomCursor, Grain)
│   │   └── page.tsx        # Etkileşimli ana sayfa (force-cache & tag bağlamalı)
│   ├── api/
│   │   ├── contact/        # İletişim formu SMTP gönderim uç noktası
│   │   ├── draft/          # Draft mode önizleme açma/kapatma route'ları
│   │   └── revalidate/     # On-demand ISR için webhook önbellek temizleme ucu
│   ├── studio/             # Gömülü Sanity Studio CMS paneli (/studio)
│   ├── layout.tsx          # Kök HTML layout ve Google Font tanımları (Cinzel, DM Sans)
│   ├── robots.ts           # Dinamik robots.txt üretimi
│   └── sitemap.ts          # Dinamik sitemap üretimi
├── components/
│   ├── forms/              # İletişim ve form bileşenleri
│   ├── layout/             # Navbar, Footer, Özel İmleç, Ses Dalgası, Katmanlar
│   ├── sections/           # Hero, Hakkında, Videolar, Galeri ve İletişim bölümleri
│   ├── seo/                # JsonLd yapılandırılmış veri bileşenleri
│   └── ui/                 # SanityImage, Lightbox, MagneticButton, RichText vb.
├── lib/
│   ├── env.ts              # Tip güvenli ortam değişkeni şeması (T3 Env + Zod)
│   ├── seo.ts              # Metadata üretim yardımcı fonksiyonu
│   └── utils.ts            # Sınıf birleştirici (clsx + tailwind-merge) ve tarih formatlayıcı
└── sanity/
    ├── lib/                # Sanity istemcisi, görsel motoru ve GROQ sorguları
    ├── plugins/            # Singleton kilit eklentileri
    ├── schemaTypes/        # Şemalar (Singleton: Home, Settings; Belgeler: Blog)
    └── structure.ts        # Studio özel sol menü hiyerarşisi
```

---

## 🛡️ Güvenlik ve Mühendislik Standartları

- **Tip Güvenli Ortam Değişkenleri:** Zod tabanlı derleme anı doğrulaması ile sıfır konfigürasyon hatası.
- **Webhook Güvenliği:** HMAC SHA-256 imza denetimi ile yetkisiz önbellek temizleme koruması.
- **İçerik Güvenliği ve Dayanıklılık:** İzole edilmiş önizleme istemcileri, temizlenmiş veri girdileri ve kapsayıcı hata sınırları (error boundaries).
