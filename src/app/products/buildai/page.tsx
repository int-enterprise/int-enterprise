import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { BuildProcess, BuildScope } from "@/widgets/buildai";
import { StrengthCards } from "@/widgets/strengths";
import { FinalCta } from "@/widgets/cta";
import { ProductMark } from "@/shared/ui";
import { buildai } from "@/entities/product";

export const metadata = buildMetadata({
  title: "buildAI. — 기업용 AI 구축",
  description:
    "buildAI.는 기업 업무에 맞는 AI를 설계·구축하고 운영까지 책임집니다. 업종을 가리지 않고 대기업·공공기관·중견기업·스타트업의 AI를 직접 만들고 운영해 왔습니다.",
  path: "/products/buildai",
  keywords: [
    "buildAI",
    "기업용 AI 구축",
    "기업 맞춤 AI",
    "AI Agent 개발",
    "AI 통합구축",
    "sLLM 개발",
    "Multi-Agent 개발",
    "AI 도입 컨설팅",
    "엔터프라이즈 AI",
  ],
});

/**
 * buildAI. — 기업용 AI 구축.
 *
 * ⚠️ 이 페이지에 **turing. 이야기를 넣지 않는다.** 만드는 일만 설명한다.
 * 예전엔 회사 전체의 세 오퍼링(②③이 turing. 기반)을 여기 붙여 놓아
 * "buildAI. 사업 구조"인데 절반이 운영 자동화 설명이었다.
 * 두 사업의 관계는 `/products`가 설명하고, 운영 자동화는 `/products/turing`이 맡는다.
 */
export default function BuildaiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "제품소개", url: "/products" },
          { name: "buildAI.", url: "/products/buildai" },
        ]}
      />
      <PageHero
        crumbs={[
          { label: "제품소개", href: "/products" },
          { label: buildai.name },
        ]}
        eyebrow={<ProductMark name={buildai.name} />}
        title={buildai.headline}
        description={buildai.body}
      />
      <BuildProcess />
      <BuildScope />
      <StrengthCards />
      <FinalCta
        topic="product"
        title="구축 문의"
        body="업무 설명만 주셔도 됩니다. 실현 가능한 범위와 접근 방식을 정리해 회신드립니다."
      />
    </>
  );
}
