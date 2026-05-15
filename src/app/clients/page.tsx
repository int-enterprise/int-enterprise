import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { ClientsPage } from "@/widgets/clients";
import { CtaStrip } from "@/widgets/cta-strip";

export const metadata = buildMetadata({
  title: "고객사",
  description:
    "(주)인트와 함께한 고객사. 대기업·중견기업·스타트업·공공기관까지, 다양한 산업의 AI 현장과 함께해 온 레퍼런스입니다.",
  path: "/clients",
  keywords: [
    "Int Corp 고객사",
    "(주)인트 고객사",
    "AI 솔루션 레퍼런스",
    "LG CNS AI",
    "더존 AI",
  ],
});

export default function ClientsRoute() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "고객사", url: "/clients" },
        ]}
      />
      <PageHeader
        eyebrow="Clients"
        image="clients"
        title={
          <>
            실제로 굴러가는 AI를,
            <br />
            <span className="text-muted">실제로 굴러가는 기업과 함께.</span>
          </>
        }
        description="대기업·중견기업·스타트업·학계·공공기관까지, (주)인트는 다양한 산업의 AI 현장과 함께 일해왔습니다."
      />
      <ClientsPage />
      <CtaStrip />
    </>
  );
}
