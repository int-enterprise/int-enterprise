import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import {
  BenefitsGrid,
  CareersCta,
  CareersHero,
  TalentValues,
} from "@/widgets/careers";

export const metadata = buildMetadata({
  title: "인재채용",
  description:
    "(주)인트는 AI를 만들고 끝내지 않고, 만든 뒤까지 함께 책임질 사람을 찾습니다. 일하는 방식과 복지, 진행 중인 채용 공고를 확인해 보세요.",
  path: "/careers",
  keywords: [
    "인트 채용",
    "(주)인트 채용",
    "AI 연구 엔지니어 채용",
    "LLMOps 채용",
    "Multi-Agent 개발자 채용",
    "AI 인프라 엔지니어 채용",
    "AI 스타트업 채용",
  ],
});

/**
 * 인재채용.
 *
 * ⚠️ 지원 경로는 **인재채용 → 채용 공고(`/careers/jobs`)** 순서다.
 * 이 페이지에 메일 지원 버튼을 두지 않는다 — 회사를 먼저 보고 공고로 넘어간다.
 *
 * 구성: 사진 히어로 → 인재상(아이콘 한 줄) → 복리후생(구분선 아이콘 격자) → CTA.
 * ⚠️ "채용 기준"·"일하는 원칙" 섹션은 없앴다. 인재상 한 구간으로 대신한다.
 */
export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "인재채용", url: "/careers" },
        ]}
      />
      <CareersHero />
      <TalentValues />
      <BenefitsGrid />
      <CareersCta />
    </>
  );
}
