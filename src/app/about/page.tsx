import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { AboutOverview } from "@/widgets/about";
import { CtaStrip } from "@/widgets/cta-strip";

export const metadata = buildMetadata({
  title: "회사 소개",
  description:
    "(주)인트 Int Corp.는 변화하는 환경에서도 안정적으로 작동하는 기업용 AI 운영의 표준을 만들어 가는 회사입니다. 회사 개요·연혁·대표·채용·오시는 길을 안내합니다.",
  path: "/about",
  keywords: ["(주)인트", "Int Corp", "인트 회사 소개", "intcorp 회사", "박현규 대표"],
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "회사 소개", url: "/about" },
        ]}
      />
      <PageHeader
        eyebrow="About"
        image="about"
        title={
          <>
            (주)인트는,
            <br />
            <span className="text-muted">AI 운영을 다시 정의합니다.</span>
          </>
        }
        description="모델은 만들고 끝이 아닙니다. 만든 후가 진짜입니다. (주)인트는 그 진짜의 영역을, 시스템으로 풀어냅니다."
      />
      <AboutOverview />
      <CtaStrip />
    </>
  );
}
