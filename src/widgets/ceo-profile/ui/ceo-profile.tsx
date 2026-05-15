import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Button, Section } from "@/shared/ui";
import { company } from "@/entities/company";

const academic = [
  "Univ. of Cambridge 기술경영학 박사",
  "기술경영전문대학원 부교수",
  "3년 연속 연구업적 우수교원",
];

const industry = [
  "前 LG CNS 정보기술연구소 선임연구원",
  "레버리지 투자조합 1·2·3호 GP",
  "초기 스타트업 투자 선진화상 수상",
];

const philosophy = [
  {
    title: "모델보다 운영",
    body: "AI는 데모로 끝나지 않습니다. 진짜 가치는 사용자 곁에서 매일 안정적으로 작동할 때 만들어집니다.",
  },
  {
    title: "현장에서 출발한 기술",
    body: "여러 산업에서 실제로 굴러가는 AI를 만들어 본 경험이 (주)인트의 출발점입니다. 모든 의사결정은 현장의 문제에서 시작합니다.",
  },
  {
    title: "사람과 함께 성장",
    body: "기술의 가치는 결국 그 기술을 만드는 사람과 그것을 쓰는 사람에게서 나옵니다. 우리는 두 사람을 모두 깊이 존중합니다.",
  },
];

export function CeoProfile() {
  return (
    <>
      <Section surface="white" className="py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
          <CeoPortraitPlaceholder />
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
                Founder &amp; CEO
              </span>
              <h2 className="text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl">
                {company.ceo}
              </h2>
              <p className="text-base text-muted-strong">
                Park Hyungyu · CEO of {company.legalNameEn}
              </p>
            </div>

            <blockquote className="relative rounded-[20px] border border-border bg-mint-mist p-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              <Quote className="absolute -top-3 left-6 h-6 w-6 text-mint-deep" />
              "AI 모델 개발 경쟁의 시간은 끝났습니다. 다음 전장은, 만들어진 AI를
              현장에서 안정적으로 운영해 내는 능력입니다. (주)인트는 그 전장의
              규칙을 한국에서 가장 먼저 쓰겠습니다."
            </blockquote>

            <div className="grid gap-6 sm:grid-cols-2">
              <Credentials title="In Academia" items={academic} />
              <Credentials title="In Industry" items={industry} />
            </div>
          </div>
        </div>
      </Section>

      <Section surface="soft" className="py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            대표가 그리는 (주)인트의 세 가지 원칙
          </h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {philosophy.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-3 rounded-[20px] border border-border bg-white p-7"
              >
                <h4 className="text-base font-semibold tracking-tight text-ink">
                  {p.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-strong">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <div>
            <Button asChild variant="ghost">
              <Link href="/insights">
                관련 기사 보기
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function CeoPortraitPlaceholder() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-dashed border-border bg-gradient-to-br from-mint-mist via-white to-mint-pale">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted shadow-sm">
          Portrait coming soon
        </span>
        <p className="px-8 text-sm leading-relaxed text-muted-strong">
          대표 인물 사진은 추후 업데이트됩니다.
          <br />이 자리에 정식 프로필 사진이 들어갑니다.
        </p>
      </div>
    </div>
  );
}

function Credentials({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-[16px] border border-border bg-white p-5">
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
        {title}
      </h4>
      <ul className="flex flex-col gap-1.5">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
            <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-mint-deep" />
            <span className="leading-relaxed">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
