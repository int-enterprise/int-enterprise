import { Card, Section, SectionHeader } from "@/shared/ui";
import { strengths } from "@/entities/company";

/** 왜 (주)인트인가. 3열 카드, 각 카드에 큰 번호 그래픽. */
export function StrengthCards() {
  const items = strengths.slice(0, 3);
  return (
    <Section rhythm="large">
      <SectionHeader
        title="만드는 회사는 많습니다. 만든 뒤를 맡는 곳은 드뭅니다."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {items.map((s, i) => (
          <Card key={s.label} className="flex flex-col gap-4 p-8" interactive>
            <span className="font-mono text-sm font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
                {s.label}
              </span>
              <h3 className="text-xl font-semibold leading-[1.35] text-heading">
                {s.title}
              </h3>
            </div>
            <p className="text-[0.95rem] font-light leading-[1.7] text-body">
              {s.body}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
