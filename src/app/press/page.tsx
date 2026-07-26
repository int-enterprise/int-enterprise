import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { PressList } from "@/widgets/press";
import { FinalCta } from "@/widgets/cta";
import { pressCountByKind, pressItems } from "@/entities/press";

export const metadata = buildMetadata({
  title: "보도·기고",
  description:
    "(주)인트의 고객사 공동연구와 AI 평가 기고가 실린 기사 목록입니다.",
  path: "/press",
  keywords: [
    "인트 보도자료",
    "박현규 기고",
    "AI 평가 기고",
    "LG CNS AI 코딩툴 생산성",
    "AI 운영 보도자료",
  ],
});

export default function PressPage() {
  const counts = pressCountByKind();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "보도·기고", url: "/press" },
        ]}
      />
      <PageHero
        crumbs={[{ label: "보도·기고" }]}
        eyebrow="Press"
        title="보도·기고"
        description={`보도자료 ${counts.보도자료}건 · 기고 ${counts.기고}건 · 인터뷰 ${counts.인터뷰}건. 제목은 기사 원문 그대로 옮겼습니다.`}
      />
      {pressItems.length > 0 ? <PressList /> : null}
      <FinalCta
        topic="press"
        title="취재 문의"
        body="연구 내용이나 수행 과제에 대해 확인이 필요한 부분이 있으면 메일로 알려주세요."
      />
    </>
  );
}
