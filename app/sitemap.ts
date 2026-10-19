import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-17");
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/legal-notice`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
