import { buildMetadata, BreadcrumbJsonLd } from "@/shared/seo";
import { PageHeader } from "@/widgets/page-header";
import { Section, Card } from "@/shared/ui";

export const metadata = buildMetadata({
  title: "Account Deletion Request · Donky Note",
  description:
    "Donky Note 앱의 계정 및 데이터 삭제 요청 방법을 안내합니다. info@intcorp.ai로 이메일을 보내주세요.",
  path: "/delete-account",
  keywords: ["Donky Note 계정 삭제", "Donky Note account deletion"],
});

const deletedData = [
  "계정 정보",
  "소셜 로그인 식별자",
  "업로드 또는 녹음한 음성 파일",
  "STT 전사 결과",
  "AI 요약 결과",
  "회의록 데이터",
  "업로드한 파일 또는 문서",
];

const retainedData = [
  "보안, 부정 이용 방지, 법적 의무 이행, 서비스 운영을 위해 필요한 최소 로그",
  "결제 기록이 있는 경우 관련 법령에 따라 보관이 필요한 정보",
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
      <PageHeader
        breadcrumbs={[{ label: "계정 삭제 요청" }]}
        eyebrow="Donky Note"
        title="Account Deletion Request"
        description="계정 삭제 요청 — Donky Note 앱을 이용 중인 사용자를 위한 안내입니다."
      />
      <Section>
        <div className="flex max-w-3xl flex-col gap-14">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              1. 앱 이름
            </span>
            <p className="text-lg text-ink">Donky Note</p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              2. 삭제 요청 방법
            </span>
            <p className="leading-relaxed text-muted-strong">
              계정 및 관련 데이터 삭제를 원할 경우 아래 이메일로 요청해 주세요.
            </p>
            <p className="text-lg font-semibold text-ink">info@intcorp.ai</p>
            <p className="leading-relaxed text-muted-strong">
              요청 시 앱에서 사용한 이메일 주소 또는 소셜 로그인 계정을 함께 보내주세요.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              3. 삭제되는 데이터
            </span>
            <Card className="p-6">
              <ul className="flex flex-col gap-2">
                {deletedData.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 leading-relaxed text-muted-strong"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              4. 보관될 수 있는 데이터
            </span>
            <Card className="p-6">
              <ul className="flex flex-col gap-2">
                {retainedData.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 leading-relaxed text-muted-strong"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              5. 처리 기간
            </span>
            <p className="leading-relaxed text-muted-strong">
              본인 확인 후 영업일 기준 7일 이내 처리됩니다.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
