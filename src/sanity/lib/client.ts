import { createClient } from "next-sanity";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  // useCdn: false yerine stega kapatılmış halde Next.js fetch cache'i aktif
  useCdn: false,
  stega: false,
};

// Ana client — Next.js Data Cache + tag-based revalidation için fetchOptions ile
export const client = createClient({
  ...config,
  // next-sanity fetch'e Next.js cache seçeneklerini aktarır
  fetchOptions: { cache: "force-cache" },
});

// Draft/preview client — cache bypass
export const previewClient = createClient({
  ...config,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
  fetchOptions: { cache: "no-store" },
});

export function getClient(preview = false) {
  return preview ? previewClient : client;
}
