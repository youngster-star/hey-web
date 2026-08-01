import type { MetadataRoute } from "next";

const BASE_URL = "https://heyqing.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/articles`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/audio`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/novels`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/moments`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE_URL}/memos`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/diary`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/friends`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.6 },
  ];

  return pages.map((p) => ({
    url: p.url,
    lastModified: p.lastModified,
    changeFrequency: "weekly" as const,
    priority: p.priority,
  }));
}
