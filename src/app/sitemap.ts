import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about/history", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about/location", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about/ceo", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about/careers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/turing", priority: 0.95, changeFrequency: "weekly" },
  { path: "/clients", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.7, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
