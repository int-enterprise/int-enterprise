import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { Careers } from "@/widgets/careers";

export const metadata = buildMetadata({
  title: "채용 안내",
  description:
    "(주)인트는 AI를 만들고 끝내지 않고 함께 끝까지 운영해 낼 동료를 찾습니다. AI 엔지니어·프로덕트 엔지니어·AI 인프라 엔지니어 직군을 항시 모집합니다.",
  path: "/about/careers",
  keywords: [
    "(주)인트 채용",
    "Int Corp 채용",
    "AI 스타트업 채용",
    "AI 엔지니어 채용",
    "AI 운영 채용",
    "Multi-Agent 엔지니어",
    "TIPS 스타트업 채용",
  ],
});

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "회사 소개", url: "/about" },
          { name: "채용 안내", url: "/about/careers" },
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "회사 소개", href: "/about" },
          { label: "채용 안내" },
        ]}
        eyebrow="Careers"
        image="careers"
        title="함께할 사람을 찾고 있습니다."
        description="작지만 깊이 일하는 팀. AI 운영의 새로운 표준을 함께 만들 동료를 기다립니다."
      />
      <Careers />
    </>
  );
}
