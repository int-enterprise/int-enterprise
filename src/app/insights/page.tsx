import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { Insights } from "@/widgets/insights";

export const metadata = buildMetadata({
  title: "인사이트",
  description:
    "(주)인트와 박현규 대표의 활동을 다룬 기사·인터뷰·보도자료. AI 운영, 변화 적응형 AI, 기업용 AI 산업에 대한 인사이트를 정리합니다.",
  path: "/insights",
  keywords: [
    "Int Corp 보도자료",
    "(주)인트 기사",
    "박현규 인터뷰",
    "AI 운영 인사이트",
    "AI Operations 인사이트",
  ],
});

export default function InsightsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "인사이트", url: "/insights" },
        ]}
      />
      <PageHeader
        eyebrow="Insights"
        image="insights"
        title={
          <>
            (주)인트의 시선,
            <br />
            <span className="text-muted">기사로 만나보세요.</span>
          </>
        }
        description="제품·산업·대표의 시선을 담은 기사와 보도자료. 새로운 소식은 차례로 업데이트됩니다."
      />
      <Insights />
    </>
  );
}
