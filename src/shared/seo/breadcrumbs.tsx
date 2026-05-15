import { siteConfig } from "@/shared/config";

interface Crumb {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${siteConfig.url}${c.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
