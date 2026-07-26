import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { AboutNav } from "@/widgets/about-nav";
import { TeamSection } from "@/widgets/company";

export const metadata = buildMetadata({
  title: "팀",
  description:
    "(주)인트를 만들고 있는 사람들입니다.",
  path: "/about/team",
  keywords: [
    "인트 팀",
    "인트 구성원",
    "(주)인트 조직",
  ],
});

/**
 * 기업소개 > 팀.
 *
 * ⚠️ 기업소개의 네 항목은 **각각 독립된 페이지**다. 한 페이지에 앵커로 쌓지 않는다.
 * 페이지를 더하거나 순서를 바꾸면 `shared/config`의 navItems.children도 함께 고친다.
 */
export default function TeamPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "기업소개", url: "/about/greeting" },
          { name: "팀", url: "/about/team" },
        ]}
      />
      <PageHero
        crumbs={[
          { label: "기업소개", href: "/about/greeting" },
          { label: "팀" },
        ]}
        eyebrow="About"
        title="팀"
      />
      <AboutNav />
      <TeamSection />
    </>
  );
}
