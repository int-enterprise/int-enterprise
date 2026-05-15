import { cn } from "@/shared/lib";
import { Section } from "@/shared/ui";

export interface LegalSection {
  heading: string;
  bodies?: string[];
  items?: string[];
}

interface LegalDocProps {
  effectiveDate: string;
  sections: LegalSection[];
}

export function LegalDoc({ effectiveDate, sections }: LegalDocProps) {
  return (
    <Section surface="white" className="py-16 sm:py-20">
      <article className="mx-auto flex max-w-3xl flex-col gap-10 text-ink-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
          시행일 · {effectiveDate}
        </p>

        {sections.map((s, idx) => (
          <section key={s.heading} className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
              <span className="mr-2 text-mint-deep">
                {String(idx + 1).padStart(2, "0")}.
              </span>
              {s.heading}
            </h2>
            {s.bodies?.map((b, i) => (
              <p
                key={i}
                className={cn(
                  "text-sm leading-relaxed text-muted-strong sm:text-base"
                )}
              >
                {b}
              </p>
            ))}
            {s.items && (
              <ul className="flex flex-col gap-1.5 pl-1 text-sm leading-relaxed text-muted-strong sm:text-base">
                {s.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-mint-deep" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </Section>
  );
}
