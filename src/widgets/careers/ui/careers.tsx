import { ArrowUpRight, Briefcase, Cpu, MessagesSquare } from "lucide-react";
import { Button, Section } from "@/shared/ui";
import { company } from "@/entities/company";

const culture = [
  {
    icon: Briefcase,
    title: "워라벨 + 깊은 몰입",
    body: "코어타임(10–19시) 기반의 유연 출퇴근과 주 1회 재택을 운영합니다. 번아웃 없이 장기적으로 한 문제에 깊이 들어가는 환경을 지향합니다.",
  },
  {
    icon: Cpu,
    title: "최고의 개발 환경",
    body: "고사양 장비를 자율적으로 선택하고, 사용하시는 소프트웨어·클라우드 크레딧을 전액 지원합니다. AI 컨퍼런스 참가비와 논문 게재도 지원합니다.",
  },
  {
    icon: MessagesSquare,
    title: "성장이 곧 보상",
    body: "단기 성과급은 개인 KPI + 팀 기여도와 연동되고, 장기적으로는 스톡옵션으로 성장의 결과를 함께 나눕니다.",
  },
];

const tracks = [
  {
    title: "AI 엔지니어 (Multi-Agent / LLMOps)",
    description: "Multi-Agent 아키텍처 기반 운영 자동화 시스템을 함께 만들 동료를 찾고 있습니다.",
  },
  {
    title: "프로덕트 엔지니어 (Full-stack)",
    description: "기업용 SaaS의 사용자 경험과 안정적인 백엔드를 함께 책임질 동료를 찾고 있습니다.",
  },
  {
    title: "AI 인프라 엔지니어",
    description: "Kubernetes/GPU 클러스터, AIOps 파이프라인 운영을 리딩하실 분을 찾고 있습니다.",
  },
];

export function Careers() {
  return (
    <>
      <Section surface="white" className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              AI를 만들고 끝내지 않고,
              <br />
              <span className="text-muted">함께 끝까지 운영해 내실 분.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-strong sm:text-lg">
              (주)인트는 변화 속에서도 안정적으로 일하는 기업용 AI를 만들고 있습니다.
              우리는 빠르게 움직이지만, 빠르게 흩어지지 않는 팀입니다.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-[24px] border border-border bg-mint-mist p-7 sm:p-9">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              지원 방법
            </span>
            <p className="text-base leading-relaxed text-ink-soft">
              관심 있는 직군과 함께 일하고 싶은 이유, 그리고 그것을 보여줄 수 있는
              경력 또는 작업물을 메일로 보내주세요. 늦어도 1–2일 안에 답장드립니다.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild variant="primary" size="md">
                <a
                  href={`mailto:${company.contact.email}?subject=${encodeURIComponent(
                    "[채용 문의] 지원자 성함 / 희망 직군"
                  )}`}
                >
                  이메일로 지원하기
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section surface="soft" className="py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            지금 함께하고 싶은 분
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {tracks.map((t) => (
              <div
                key={t.title}
                className="flex flex-col gap-3 rounded-[20px] border border-border bg-white p-7"
              >
                <h4 className="text-base font-semibold leading-snug text-ink">
                  {t.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-strong">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section surface="white" className="py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            우리의 일하는 방식
          </h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {culture.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="flex flex-col gap-4 rounded-[20px] border border-border bg-mint-mist p-7"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-mint">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="text-base font-semibold tracking-tight text-ink">
                    {c.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-strong">
                    {c.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
