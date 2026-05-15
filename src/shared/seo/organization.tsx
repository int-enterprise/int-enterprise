import { company } from "@/entities/company";
import { siteConfig } from "@/shared/config";

export function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: company.legalNameKo,
    alternateName: [
      company.legalNameKoShort,
      company.legalNameEn,
      "인트",
      "Int",
      "intcorp",
    ],
    legalName: company.legalNameEn,
    url: siteConfig.url,
    logo: `${siteConfig.url}/og.png`,
    foundingDate: "2026-04-23",
    founder: {
      "@type": "Person",
      name: company.ceo,
      jobTitle: company.ceoTitle,
    },
    email: company.contact.email,
    telephone: company.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.line1} ${company.address.line2}`,
      addressLocality: "마포구",
      addressRegion: "서울특별시",
      postalCode: company.address.postalCode,
      addressCountry: "KR",
    },
    taxID: company.businessRegistrationNumber,
    sameAs: [
      siteConfig.url,
    ],
    description: siteConfig.description,
    knowsAbout: [
      "Enterprise AI",
      "AI Operations",
      "AI Agent",
      "Multi-Agent Systems",
      "AI Performance Monitoring",
      "AIOps",
    ],
    industry: "Artificial Intelligence Software",
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function WebSiteJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.brand,
    inLanguage: "ko-KR",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
