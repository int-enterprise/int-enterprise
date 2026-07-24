import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { DecayGrid } from "@/widgets/decay";
import { TuringBlock } from "@/widgets/turing";
import { FinalCta } from "@/widgets/cta";
import { Container } from "@/shared/ui";
import { ConsoleShot, product } from "@/entities/product";

export const metadata = buildMetadata({
  title: "turing. — AI 운영 자동화",
  description: product.lede,
  path: "/turing",
  keywords: [
    "turing",
    "튜링",
    "AI 운영",
    "AI 운영 자동화",
    "AI 성능열화",
    "변화적응형 AI",
    "LLMOps",
    "AIOps",
    "AI 성능 모니터링",
    "AI 품질 관리",
    "AI Agent 운영",
  ],
});

export default function TuringPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "turing.", url: "/turing" },
        ]}
      />
      <PageHero
        crumbs={[{ label: "turing." }]}
        eyebrow="Product"
        title={product.tagline}
        description={product.lede}
      />
      <Container width="wide" className="pb-14">
        <ConsoleShot priority />
        <p className="mt-4 text-center text-sm text-faint">
          turing. 콘솔 — 프로젝트별 Agent 운영 상태와 리소스 그룹 현황
        </p>
      </Container>
      <DecayGrid />
      <TuringBlock />
      <FinalCta
        title="지금 운영 중인 AI가 있으신가요?"
        body="어떤 업무에 쓰고 있고 무엇이 아쉬운지 알려주시면, turing.으로 무엇을 개선할 수 있을지 정리해 회신드립니다."
      />
    </>
  );
}
