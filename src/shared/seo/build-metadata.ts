import type { Metadata } from "next";
import { siteConfig } from "@/shared/config";

interface BuildMetadataInput {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noindex,
}: BuildMetadataInput): Metadata {
  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description: desc,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.brand,
      title: `${title} · ${siteConfig.brand}`,
      description: desc,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.brand}`,
      description: desc,
      images: [siteConfig.ogImage],
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}
