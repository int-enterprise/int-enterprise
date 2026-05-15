import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { History } from "@/widgets/history";
import { CtaStrip } from "@/widgets/cta-strip";

export const metadata = buildMetadata({
  title: "연혁",
  description:
    "(주)인트의 발자취. 법인 설립부터 turing. 베타 공개까지, Int Corp.가 걸어온 길과 앞으로의 방향을 안내합니다.",
  path: "/about/history",
  keywords: ["인트 연혁", "Int Corp history", "(주)인트 설립", "TIPS 인트"],
});

export default function HistoryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "회사 소개", url: "/about" },
          { name: "연혁", url: "/about/history" },
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "회사 소개", href: "/about" },
          { label: "연혁" },
        ]}
        eyebrow="History"
        image="history"
        title="Int Corp.의 발자취"
        description="(주)인트가 어떻게 시작되었고, 앞으로 어디로 향하는지. 차례로 업데이트되는 마일스톤입니다."
      />
      <History />
      <CtaStrip />
    </>
  );
}
