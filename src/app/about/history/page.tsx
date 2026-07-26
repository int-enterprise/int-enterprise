import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { AboutNav } from "@/widgets/about-nav";
import { Timeline } from "@/widgets/company";

export const metadata = buildMetadata({
  title: "기업연혁",
  description:
    "(주)인트의 설립과 주요 연혁입니다.",
  path: "/about/history",
  keywords: [
    "인트 연혁",
    "(주)인트 설립",
    "인트 기업연혁",
  ],
});

/**
 * 기업소개 > 기업연혁.
 *
 * ⚠️ 기업소개의 네 항목은 **각각 독립된 페이지**다. 한 페이지에 앵커로 쌓지 않는다.
 * 페이지를 더하거나 순서를 바꾸면 `shared/config`의 navItems.children도 함께 고친다.
 */
export default function HistoryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "기업소개", url: "/about/greeting" },
          { name: "기업연혁", url: "/about/history" },
        ]}
      />
      <PageHero
        crumbs={[
          { label: "기업소개", href: "/about/greeting" },
          { label: "기업연혁" },
        ]}
        eyebrow="About"
        title="기업연혁"
      />
      <AboutNav />
      <Timeline />
    </>
  );
}
