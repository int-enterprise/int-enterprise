import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { Partners } from "@/widgets/partners";
import { CtaStrip } from "@/widgets/cta-strip";

export const metadata = buildMetadata({
  title: "관계사",
  description:
    "(주)인트의 운영사·기술·학술·공공 파트너. 변화 적응형 AI 운영의 표준을 만들기 위해 함께 일하는 기관과 기업입니다.",
  path: "/partners",
  keywords: [
    "Int Corp 파트너",
    "(주)인트 관계사",
    "씨엔티테크 인트",
    "Palantir 인트",
    "TIPS 운영사",
  ],
});

export default function PartnersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "관계사", url: "/partners" },
        ]}
      />
      <PageHeader
        eyebrow="Partners"
        image="partners"
        title="함께 만들어 가는 사람들."
        description="(주)인트는 운영사·글로벌 기술 파트너·학계·공공기관과 함께 변화 적응형 AI 운영의 표준을 만듭니다."
      />
      <Partners />
      <CtaStrip />
    </>
  );
}
