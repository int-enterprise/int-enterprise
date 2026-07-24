import { Section, SectionHeader } from "@/shared/ui";
import { milestones } from "@/entities/company";
import { cn } from "@/shared/lib";

/** 연혁. 가로 스크롤 카드. */
export function Timeline() {
  return (
    <Section rhythm="large" soft bleed id="history">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <SectionHeader eyebrow="History" title="법인보다 과제가 먼저 있었습니다" />
      </div>

      <div className="mt-12 overflow-x-auto pb-4">
        <ol className="mx-auto flex min-w-max gap-5 px-5 sm:px-8 lg:justify-center">
          {milestones.map((m) => (
            <li
              key={m.date}
              className={cn(
                "flex w-[280px] shrink-0 flex-col gap-3 rounded-lg p-7 sm:w-[320px]",
                m.planned
                  ? "border border-dashed border-line-strong bg-canvas"
                  : "border border-line bg-canvas shadow-soft"
              )}
            >
              <span
                className={cn(
                  "font-mono text-sm font-semibold",
                  m.planned ? "text-faint" : "text-accent"
                )}
              >
                {m.date}
                {m.planned ? " · 예정" : ""}
              </span>
              <h3
                className={cn(
                  "text-lg font-semibold leading-[1.4]",
                  m.planned ? "text-subtle" : "text-heading"
                )}
              >
                {m.title}
              </h3>
              <p className="text-sm font-light leading-[1.7] text-body">
                {m.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
