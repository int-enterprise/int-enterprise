import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { DecayGrid } from "@/widgets/decay";
import { TuringBlock } from "@/widgets/turing";
import { FinalCta } from "@/widgets/cta";
import { Container, ProductMark } from "@/shared/ui";
import { ConsoleShot, product, turing } from "@/entities/product";

export const metadata = buildMetadata({
  title: "turing. — AI 운영 자동화",
  description: product.lede,
  path: "/products/turing",
  keywords: [
    "turing",
    "튜링",
    "AI 운영",
    "AI 운영 자동화",
    "AI 성능열화",
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
          { name: "제품소개", url: "/products" },
          { name: "turing.", url: "/products/turing" },
        ]}
      />
      <PageHero
        crumbs={[
          { label: "제품소개", href: "/products" },
          { label: turing.name },
        ]}
        eyebrow={<ProductMark name={turing.name} />}
        title={product.tagline}
        description={product.lede}
      />
      <Container width="wide" className="pb-14">
        <ConsoleShot priority />
        <p className="mt-4 text-center text-sm text-faint">
          turing. 콘솔 — 프로젝트별 Agent 운영 상태와 리소스 그룹 현황
        </p>
      </Container>
      {/* 히어로가 이미 product.tagline을 쓰므로 여기선 다른 제목을 준다 (중복 방지) */}
      <DecayGrid heading="성능 저하의 원인" />
      <TuringBlock />
      <FinalCta
        topic="product"
        title="제품 문의"
        body="어떤 업무에 쓰고 있고 무엇이 아쉬운지 알려주시면, turing.으로 무엇을 개선할 수 있을지 정리해 회신드립니다."
      />
    </>
  );
}
