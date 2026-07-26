import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { AboutNav } from "@/widgets/about-nav";
import { LocationSection } from "@/widgets/company";

export const metadata = buildMetadata({
  title: "오시는 길",
  description:
    "(주)인트 사무실 위치와 연락처입니다. 서울 마포구 서강대길, 6호선 광흥창역에서 도보 6분.",
  path: "/about/location",
  keywords: [
    "인트 오시는 길",
    "인트 위치",
    "인트 주소",
  ],
});

/**
 * 기업소개 > 오시는 길.
 *
 * ⚠️ 기업소개의 네 항목은 **각각 독립된 페이지**다. 한 페이지에 앵커로 쌓지 않는다.
 * 페이지를 더하거나 순서를 바꾸면 `shared/config`의 navItems.children도 함께 고친다.
 */
export default function LocationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "기업소개", url: "/about/greeting" },
          { name: "오시는 길", url: "/about/location" },
        ]}
      />
      <PageHero
        crumbs={[
          { label: "기업소개", href: "/about/greeting" },
          { label: "오시는 길" },
        ]}
        eyebrow="About"
        title="오시는 길"
      />
      <AboutNav />
      <LocationSection />
    </>
  );
}
