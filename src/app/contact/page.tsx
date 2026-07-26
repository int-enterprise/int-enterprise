import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { ContactDetail } from "@/widgets/contact";
import { LocationSection } from "@/widgets/company";

export const metadata = buildMetadata({
  title: "문의하기",
  description:
    "AI 구축, turing. 도입, 파트너십, 채용, 취재 문의를 받습니다.",
  path: "/contact",
  keywords: [
    "(주)인트 문의",
    "인트 연락처",
    "AI 도입 문의",
    "AI 구축 문의",
    "turing 도입 문의",
  ],
});

/** `?type=`으로 넘어온 값만 문의 유형으로 인정한다(임의 값 방어). */
const TOPICS = ["product", "partnership", "recruit", "press", "etc"] as const;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const defaultTopic = TOPICS.find((t) => t === type);

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
        title="문의하기"
      />
      <ContactDetail defaultTopic={defaultTopic} />
      <LocationSection />
    </>
  );
}
