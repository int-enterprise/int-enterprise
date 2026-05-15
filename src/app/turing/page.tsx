import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { ProductPage } from "@/widgets/product";
import { CtaStrip } from "@/widgets/cta-strip";

export const metadata = buildMetadata({
  title: "turing. · 기업용 AI 운영 자동화",
  description:
    "turing.은 기업의 AI가 변하는 환경 속에서도 어제와 같은 품질로 일할 수 있도록, AI 운영의 처음부터 끝까지를 함께 책임지는 (주)인트의 솔루션입니다.",
  path: "/turing",
  keywords: [
    "turing",
    "튜링",
    "intcorp turing",
    "AI 운영 자동화",
    "AI Operations 솔루션",
    "AI 성능 모니터링",
    "AI 안정성 솔루션",
    "기업용 AI 운영",
  ],
});

export default function TuringPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "turing.", url: "/turing" },
        ]}
      />
      <PageHeader
        eyebrow="Product"
        image="turing"
        title={
          <>
            변화에도 흔들리지 않는
            <br />
            <span className="text-muted">기업용 AI 운영의 표준.</span>
          </>
        }
        description="turing.은 점검·감지·진단·계획·회복의 다섯 단계를 하나의 운영 사이클로 자동화합니다."
      />
      <ProductPage />
      <CtaStrip
        title={
          <>
            지금 가지고 계신 AI도,
            <br />
            <span className="text-mint">turing.으로 보호할 수 있습니다.</span>
          </>
        }
        description="현재 운영 환경을 알려주시면, 도입 단계별로 무엇이 달라지는지 한 페이지로 정리해 드릴게요."
      />
    </>
  );
}
