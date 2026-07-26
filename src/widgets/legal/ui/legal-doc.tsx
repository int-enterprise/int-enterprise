import { Container } from "@/shared/ui";

export interface LegalSection {
  heading: string;
  bodies?: readonly string[];
  items?: readonly string[];
}

/**
 * 법적 고지 문서(개인정보처리방침·이용약관·계정 삭제 안내)의 공통 껍데기.
 * 본문은 각 라우트가 데이터로 넘긴다 — 이 컴포넌트는 조판만 책임진다.
 * 데이터 형태(heading/bodies/items)는 기존 문서와 동일하게 유지한다.
 */
export function LegalDoc({
  sections,
  effectiveDate,
  footnote,
}: {
  sections: readonly LegalSection[];
  effectiveDate?: string;
  footnote?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-canvas py-20 sm:py-24">
      <Container>
        <div className="flex max-w-3xl flex-col gap-12">
          {effectiveDate ? (
            <p className="text-sm text-faint">
              시행일 {effectiveDate}
            </p>
          ) : null}

          {sections.map((section, i) => (
            <section key={section.heading} className="flex flex-col gap-4">
              <h2 className="flex items-baseline gap-3 text-lg text-heading sm:text-xl">
                <span className="text-sm font-medium text-gray-40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>

              {section.bodies?.map((p) => (
                <p key={p} className="text-base leading-[1.8] text-body">
                  {p}
                </p>
              ))}

              {section.items ? (
                <ul className="flex flex-col gap-2 border-t border-line pt-4">
                  {section.items.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-base leading-[1.75] text-gray-75"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {footnote ? (
            <div className="rounded-lg bg-canvas-2 p-6 text-sm leading-[1.75] text-body">
              {footnote}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
