import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { CeoProfile } from "@/widgets/ceo-profile";
import { CtaStrip } from "@/widgets/cta-strip";

export const metadata = buildMetadata({
  title: "CEO 프로필 · 박현규",
  description:
    "(주)인트 박현규 Founder & CEO 소개. 캠브리지 기술경영학 박사, 前 LG CNS 정보기술연구소 선임연구원.",
  path: "/about/ceo",
  keywords: [
    "박현규",
    "Park Hyungyu",
    "Int Corp CEO",
    "인트 대표",
    "(주)인트 대표",
    "캠브리지 기술경영학",
  ],
});

export default function CeoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "회사 소개", url: "/about" },
          { name: "CEO 프로필", url: "/about/ceo" },
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "회사 소개", href: "/about" },
          { label: "CEO 프로필" },
        ]}
        eyebrow="Founder · CEO"
        image="ceo"
        title="박현규"
        description="기술과 경영, 학계와 산업을 잇는 자리에서 (주)인트가 그리는 AI 운영의 미래를 만들고 있습니다."
      />
      <CeoProfile />
      <CtaStrip />
    </>
  );
}
