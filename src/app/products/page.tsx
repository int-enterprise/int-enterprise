import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { ProductDuo } from "@/widgets/products";
import { OfferingsBlock } from "@/widgets/offerings";
import { FinalCta } from "@/widgets/cta";
import { positioning } from "@/entities/service";

export const metadata = buildMetadata({
  title: "제품소개",
  description:
    "(주)인트의 두 축 — 기업용 AI를 직접 설계·구축하는 buildAI.와, 만든 AI가 계속 제 성능을 내게 하는 운영 자동화 솔루션 turing.을 소개합니다.",
  path: "/products",
  keywords: [
    "buildAI",
    "turing",
    "기업용 AI 구축",
    "AI 운영 자동화",
    "변화적응형 AI",
    "엔터프라이즈 AI",
    "(주)인트 제품",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "제품소개", url: "/products" },
        ]}
      />
      <PageHero
        crumbs={[{ label: "제품소개" }]}
        eyebrow="Products"
        title="제품소개"
        description={positioning.oneLiner}
      />
      <ProductDuo
        title="사업 영역"
        description={positioning.lede}
      />
      {/* 세 오퍼링은 두 제품에 걸친 회사 차원의 전략이라 여기(개요)에 둔다.
          buildAI. 페이지에 두면 그 페이지 절반이 turing. 설명이 된다. */}
      <OfferingsBlock />
      <FinalCta
        topic="product"
        title="도입 문의"
        body="지금 무엇이 막혀 있는지만 알려주시면, 구축이 필요한 일인지 운영이 필요한 일인지부터 정리해 회신드립니다."
      />
    </>
  );
}
