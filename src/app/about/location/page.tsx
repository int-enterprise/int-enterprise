import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { LocationDetail } from "@/widgets/location";

export const metadata = buildMetadata({
  title: "오시는 길",
  description:
    "(주)인트 본사 위치 안내. 서울특별시 마포구 서강대길 22 2층 6호. 카카오맵 경로 안내와 대중교통 정보를 함께 제공합니다.",
  path: "/about/location",
  keywords: [
    "인트 본사",
    "Int Corp 위치",
    "마포구 AI 스타트업",
    "(주)인트 주소",
  ],
});

export default function LocationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "회사 소개", url: "/about" },
          { name: "오시는 길", url: "/about/location" },
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "회사 소개", href: "/about" },
          { label: "오시는 길" },
        ]}
        eyebrow="Location"
        image="location"
        title="(주)인트 본사로 오시는 길."
        description="서울 마포구에 위치한 본사로 오시는 길 안내입니다. 미팅이 필요하시면 언제든 방문해 주세요."
      />
      <LocationDetail />
    </>
  );
}
