import { BrandMark, Section } from "@/shared/ui";

interface Milestone {
  date: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    date: "2026.04",
    title: "(주)인트 법인 설립",
    description: "박현규 대표를 중심으로 (주)인트 법인을 정식 설립했습니다.",
  },
  {
    date: "2026.05",
    title: "TIPS 일반트랙 신청",
    description:
      "씨엔티테크 운영사 추천으로 변화 적응형 AI 운영 솔루션 R&D를 TIPS에 신청했습니다.",
  },
  {
    date: "2026.하반기",
    title: (
      <>
        <BrandMark size="sm" label="turing" /> β 공개 (예정)
      </>
    ),
    description: (
      <>
        AI 운영 자동화 솔루션{" "}
        <BrandMark size="xs" label="turing" />의 베타 버전을 파트너 기업과 함께
        검증합니다.
      </>
    ),
  },
];

export function History() {
  return (
    <Section surface="white" className="py-16 sm:py-20">
      <ol className="relative flex flex-col gap-10 border-l-2 border-border pl-8 sm:pl-12">
        {milestones.map((m, idx) => (
          <li key={idx} className="relative">
            <span className="absolute -left-[2.4rem] top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-background sm:-left-[3.4rem]">
              <span className="h-2.5 w-2.5 rounded-full bg-mint ring-4 ring-mint-soft" />
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
                {m.date}
              </span>
              <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {m.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-muted-strong">
                {m.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-16 max-w-2xl rounded-[20px] border border-border bg-mint-mist p-6 text-sm leading-relaxed text-ink-soft">
        새로운 마일스톤은 차례로 업데이트됩니다. 더 자세한 비전이나 협업 가능성에
        대해 듣고 싶으시다면 언제든 문의해 주세요.
      </p>
    </Section>
  );
}
