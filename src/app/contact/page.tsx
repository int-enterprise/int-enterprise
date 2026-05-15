import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { ContactPage } from "@/widgets/contact";

export const metadata = buildMetadata({
  title: "문의하기",
  description:
    "(주)인트에 도입·PoC·파트너십·취재 등 어떤 문의든 보내주세요. 영업일 기준 1–2일 안에 답신드립니다. info@intcorp.ai",
  path: "/contact",
  keywords: [
    "Int Corp 문의",
    "(주)인트 문의",
    "AI 운영 도입 문의",
    "intcorp.ai 문의",
    "AI 솔루션 PoC",
  ],
});

export default function ContactRoute() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "문의하기", url: "/contact" },
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        image="contact"
        title={
          <>
            서비스를 도입하고 싶거나,
            <br />
            <span className="text-mint-deep">한 번 이야기해 보고 싶으신가요?</span>
          </>
        }
        description="제품 도입, PoC, 파트너십, 취재 등 어떤 문의든 환영합니다. 영업일 기준 1–2일 안에 답신드립니다."
      />
      <ContactPage />
    </>
  );
}
