import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { AboutNav } from "@/widgets/about-nav";
import { GreetingSection } from "@/widgets/company";

export const metadata = buildMetadata({
  title: "인사말",
  description:
    "(주)인트 박현규 대표가 드리는 인사말입니다. 만드는 일에서 끝내지 않고 만든 뒤까지 책임지는 회사를 만들고 있습니다.",
  path: "/about/greeting",
  keywords: [
    "인트 인사말",
    "박현규 대표",
    "(주)인트 대표",
  ],
});

/**
 * 기업소개 > 인사말.
 *
 * ⚠️ 기업소개의 네 항목은 **각각 독립된 페이지**다. 한 페이지에 앵커로 쌓지 않는다.
 * 페이지를 더하거나 순서를 바꾸면 `shared/config`의 navItems.children도 함께 고친다.
 */
export default function GreetingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "기업소개", url: "/about/greeting" },
          { name: "인사말", url: "/about/greeting" },
        ]}
      />
      <PageHero
        crumbs={[
          { label: "기업소개", href: "/about/greeting" },
          { label: "인사말" },
        ]}
        eyebrow="About"
        title="인사말"
      />
      <AboutNav />
      <GreetingSection />
    </>
  );
}
