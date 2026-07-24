import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import {
  FounderSection,
  LocationSection,
  OriginSection,
  PartnersSection,
  Timeline,
} from "@/widgets/company";
import { PressBlock } from "@/widgets/press";
import { FinalCta } from "@/widgets/cta";
import { positioning } from "@/entities/service";

export const metadata = buildMetadata({
  title: "회사 소개",
  description:
    "(주)인트는 서강대학교 기술경영전문대학원 박현규 교수 연구실에서 출발한 기업입니다. 연구실 창업 배경과 연혁, 대표 소개, 오시는 길을 안내합니다.",
  path: "/about",
  keywords: [
    "인트",
    "(주)인트",
    "주식회사 인트",
    "Int Corp",
    "intcorp",
    "박현규",
    "서강대 연구실 창업",
    "서강대 기술경영전문대학원",
    "인트 연혁",
    "인트 오시는 길",
  ],
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
      <PageHero
        crumbs={[{ label: "회사 소개" }]}
        eyebrow="About"
        title="연구실에서 시작해, 현장에서 검증하고 있습니다"
        description={positioning.oneLiner}
      />
      <OriginSection />
      <Timeline />
      <FounderSection />
      <PartnersSection />
      <PressBlock />
      <LocationSection />
      <FinalCta />
    </>
  );
}
