import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHero } from "@/widgets/page-hero";
import { LegalDoc, type LegalSection } from "@/widgets/legal";
import { company } from "@/entities/company";

/**
 * Apple App Store 심사가 참조하는 계정 삭제 안내 페이지.
 * 경로(/delete-account)와 안내 문구는 심사 자료와 일치해야 하므로
 * 디자인만 바꾸고 내용은 그대로 유지한다.
 */
export const metadata = buildMetadata({
  title: "Account Deletion Request · Donky Note",
  description:
    "Donky Note 앱의 계정 및 데이터 삭제 요청 방법을 안내합니다. info@intcorp.ai로 이메일을 보내주세요.",
  path: "/delete-account",
  keywords: ["Donky Note 계정 삭제", "Donky Note account deletion"],
});

const sections: LegalSection[] = [
  {
    heading: "앱 이름",
    bodies: ["Donky Note"],
  },
  {
    heading: "삭제 요청 방법",
    bodies: [
      `계정 및 관련 데이터 삭제를 원할 경우 ${company.contact.email}로 요청해 주세요.`,
      "요청 시 앱에서 사용한 이메일 주소 또는 소셜 로그인 계정을 함께 보내주세요.",
    ],
  },
  {
    heading: "삭제되는 데이터",
    items: [
      "계정 정보",
      "소셜 로그인 식별자",
      "업로드 또는 녹음한 음성 파일",
      "STT 전사 결과",
      "AI 요약 결과",
      "회의록 데이터",
      "업로드한 파일 또는 문서",
    ],
  },
  {
    heading: "보관될 수 있는 데이터",
    items: [
      "보안, 부정 이용 방지, 법적 의무 이행, 서비스 운영을 위해 필요한 최소 로그",
      "결제 기록이 있는 경우 관련 법령에 따라 보관이 필요한 정보",
    ],
  },
  {
    heading: "처리 기간",
    bodies: ["본인 확인 후 영업일 기준 7일 이내 처리됩니다."],
  },
];

export default function DeleteAccountPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "/" },
          { name: "계정 삭제 요청", url: "/delete-account" },
        ]}
      />
      <PageHero
        crumbs={[{ label: "계정 삭제 요청" }]}
        eyebrow="Donky Note"
        title="Account Deletion Request"
        description="계정 삭제 요청 — Donky Note 앱을 이용 중인 사용자를 위한 안내입니다."
      />
      <LegalDoc
        sections={sections}
        footnote={
          <>
            문의는{" "}
            <a
              href={`mailto:${company.contact.email}`}
              className="font-medium text-link underline underline-offset-4"
            >
              {company.contact.email}
            </a>
            로 보내주세요.
          </>
        }
      />
    </>
  );
}
