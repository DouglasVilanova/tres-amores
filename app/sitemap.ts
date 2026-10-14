import type { MetadataRoute } from "next";
import { indexavel, manifest, siteUrl } from "@/lib/manifest";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexavel(manifest)) return [];
  const base = siteUrl(manifest);
  return [{ url: `${base}/`, changeFrequency: "weekly", priority: 1 }];
}
