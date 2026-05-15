import { Section } from "@/shared/ui";

const beliefs = [
  {
    no: "01",
    title: "모델보다 운영",
    body: "AI는 데모로 끝나지 않습니다. 진짜 가치는 매일 사용자 곁에서 흔들리지 않고 작동할 때 만들어집니다.",
  },
  {
    no: "02",
    title: "변화를 전제로",
    body: "환경은 반드시 변합니다. 변하지 않을 거라는 가정이 아니라, 변해도 괜찮은 시스템을 설계합니다.",
  },
  {
    no: "03",
    title: "사람의 시간을 아끼는 기술",
    body: "AI 운영은 사람의 시간을 잡아먹는 일이 아니어야 합니다. 자동화는 사람을 자유롭게 만드는 도구입니다.",
  },
];

export function Manifesto() {
  return (
    <Section surface="white" className="py-20 sm:py-28">
      <div className="flex flex-col gap-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-12">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-5xl">
            우리가 믿는
            <br />
            <span className="text-mint-deep">세 가지 원칙.</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-strong sm:text-lg">
            (주)인트는 AI를 어떻게 만들지보다, 어떻게 운영할지에 집중합니다.
            그 출발점이 되는 세 가지 원칙입니다.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {beliefs.map((b) => (
            <article
              key={b.no}
              className="relative flex h-full flex-col gap-5 rounded-[24px] border border-border bg-gradient-to-br from-white to-mint-mist p-8 transition-all hover:-translate-y-0.5 hover:border-mint-deep/30"
            >
              <span className="text-sm font-bold tracking-[0.18em] text-mint-deep">
                {b.no}
              </span>
              <h3 className="text-xl font-semibold leading-tight tracking-tight text-ink">
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-strong">
                {b.body}
              </p>
              <span
                aria-hidden
                className="absolute right-6 top-6 inline-block h-2.5 w-2.5 rounded-full bg-mint opacity-60"
              />
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
