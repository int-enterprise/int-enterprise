import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { CareersDetail } from "@/widgets/careers";

export const metadata = buildMetadata({
  title: "채용",
  description:
    "(주)인트는 AI를 만들고 끝내지 않고, 만든 뒤까지 함께 책임질 동료를 찾습니다. AI 연구·백엔드·인프라 엔지니어를 상시 채용합니다.",
  path: "/careers",
  keywords: [
    "인트 채용",
    "(주)인트 채용",
    "AI 연구 엔지니어 채용",
    "LLMOps 채용",
    "Multi-Agent 개발자 채용",
    "AI 인프라 엔지니어 채용",
    "연구실 창업 스타트업 채용",
  ],
});

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "채용", url: "/careers" },
        ]}
      />
      <PageHero
        crumbs={[{ label: "채용" }]}
        eyebrow="Careers"
        title="만들고 끝내지 않는 일에 같이 붙을 사람"
        description="빠르게 움직이지만 빠르게 흩어지지 않는 팀을 만들고 있습니다. 한 문제를 오래 붙잡는 방식이 맞는 분이면 좋겠습니다."
      />
      <CareersDetail />
    </>
  );
}
