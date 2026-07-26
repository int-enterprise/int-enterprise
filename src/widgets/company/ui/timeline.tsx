import { Container, Section } from "@/shared/ui";
import { milestonesByYear } from "@/entities/company";

/**
 * 기업연혁.
 *
 * ⚠️ 가로 스크롤 카드로 만들지 않는다(예전 방식). 카드가 화면 밖으로 나가면
 * 연혁이 몇 년치인지 한눈에 안 잡히고, 스크롤을 놓치면 뒤쪽을 아예 못 본다.
 *
 * 대신 **연도를 큰 활자로 왼쪽에 세우고, 그 해의 일을 오른쪽에 쌓는다.**
 * 연도는 sticky라 그 해의 항목을 읽는 동안 왼쪽에 붙어 있다.
 */
export function Timeline() {
  const years = milestonesByYear();

  return (
    <Section rhythm="large" soft id="history">
      <Container>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            History
          </p>
          <h2 className="text-[2rem] leading-[1.16] tracking-[-0.03em] text-display sm:text-[2.6rem]">
            기업연혁
          </h2>
        </div>

        <div className="mt-16 flex flex-col">
          {years.map(({ year, items }) => (
            <div
              key={year}
              className="grid gap-x-10 border-t border-line py-10 sm:grid-cols-[140px_1fr] lg:grid-cols-[200px_1fr]"
            >
              <p className="mb-6 font-mono text-[2.5rem] font-bold leading-none tracking-[-0.03em] text-navy-40/25 sm:sticky sm:top-28 sm:mb-0 sm:self-start sm:text-[3.25rem]">
                {year}
              </p>

              <ol className="flex flex-col gap-8">
                {items.map((m) => (
                  <li key={`${m.date}-${m.title}`} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="font-mono text-xs text-faint">
                        {m.date.slice(5)}월
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl">
                      {m.title}
                    </h3>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
