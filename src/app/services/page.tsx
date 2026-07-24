import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { OfferingsBlock } from "@/widgets/offerings";
import { WorkMarquee } from "@/widgets/work";
import { ClientLogos } from "@/widgets/clients";
import { StrengthCards } from "@/widgets/strengths";
import { FinalCta } from "@/widgets/cta";
import { positioning } from "@/entities/service";

export const metadata = buildMetadata({
  title: "기업용 AI 구축",
  description:
    "(주)인트는 기업 업무에 맞는 AI를 설계·구축하고 운영까지 책임집니다. LG CNS, 현대NGV, STEPI, 히포크랏랩스 등 대기업·공공·스타트업에서 수행한 과제를 확인해 보세요.",
  path: "/services",
  keywords: [
    "기업용 AI 구축",
    "기업 맞춤 AI",
    "AI Agent 개발",
    "AI 통합구축",
    "변화적응형 AI",
    "sLLM 개발",
    "Multi-Agent 개발",
    "AI 도입 컨설팅",
    "엔터프라이즈 AI",
    "(주)인트",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "기업용 AI 구축", url: "/services" },
        ]}
      />
      <PageHero
        crumbs={[{ label: "기업용 AI 구축" }]}
        eyebrow="Services"
        title="만드는 것과 지키는 것을 한 팀이 합니다"
        description={positioning.oneLiner}
      />
      <ClientLogos />
      <OfferingsBlock />
      <WorkMarquee />
      <StrengthCards />
      <FinalCta
        title="어떤 업무를 AI에 맡기고 싶으신가요?"
        body="업무 설명만 주셔도 됩니다. 실현 가능한 범위와 접근 방식을 정리해 회신드립니다."
      />
    </>
  );
}
