import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { ContactDetail } from "@/widgets/contact";
import { LocationSection } from "@/widgets/company";

export const metadata = buildMetadata({
  title: "문의하기",
  description:
    "AI 구축, turing. 도입, 파트너십, 채용, 취재 문의를 받습니다. 영업일 기준 1–2일 안에 회신드립니다.",
  path: "/contact",
  keywords: [
    "(주)인트 문의",
    "인트 연락처",
    "AI 도입 문의",
    "AI 구축 문의",
    "turing 도입 문의",
  ],
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "문의하기", url: "/contact" },
        ]}
      />
      <PageHero
        crumbs={[{ label: "문의하기" }]}
        eyebrow="Contact"
        title="어떤 이야기든 좋습니다"
      />
      <ContactDetail />
      <LocationSection />
    </>
  );
}
