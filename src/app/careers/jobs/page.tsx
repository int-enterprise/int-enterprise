import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { JobsBoard } from "@/widgets/careers";
import { jobPostings } from "@/entities/careers";

export const metadata = buildMetadata({
  title: "채용 공고",
  description:
    "(주)인트의 진행 중인 채용 공고와 채용 절차, 상시 지원 안내입니다.",
  path: "/careers/jobs",
  keywords: [
    "인트 채용 공고",
    "(주)인트 채용 공고",
    "AI 스타트업 채용 공고",
    "AI 연구 엔지니어 채용",
    "백엔드 엔지니어 채용",
    "인프라 엔지니어 채용",
  ],
});

/**
 * 채용 공고.
 *
 * ⚠️ 헤더 메뉴에 직접 걸지 않는다. `/careers`를 거쳐 들어오는 페이지다.
 * 공고 목록은 `entities/careers`의 `jobPostings`가 비면 "없음"으로 표시된다.
 */
export default function JobsPage() {
  const count = jobPostings.length;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "인재채용", url: "/careers" },
          { name: "채용 공고", url: "/careers/jobs" },
        ]}
      />
      <PageHero
        crumbs={[
          { label: "인재채용", href: "/careers" },
          { label: "채용 공고" },
        ]}
        eyebrow="Jobs"
        title="채용 공고"
        description={
          count > 0
            ? `현재 ${count}개 직군을 모집하고 있습니다. 지원 전 인재채용 페이지에서 일하는 방식을 먼저 확인해 주세요.`
            : "지금은 공개된 공고가 없습니다. 상시 지원은 언제나 열려 있습니다."
        }
      />
      <JobsBoard />
    </>
  );
}
