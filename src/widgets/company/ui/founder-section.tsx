import { Blob, Container, Section } from "@/shared/ui";
import { company, founder } from "@/entities/company";

/**
 * 대표 소개. 좌측 모노그램 카드(브랜드 그라디언트) + 우측 인용/약력.
 * TODO(자산): 정식 프로필 사진을 받으면 모노그램을 next/image로 교체.
 */
export function FounderSection() {
  return (
    <Section rhythm="large" id="founder" className="relative overflow-hidden">
      <Blob color="navy" size={420} className="right-[-80px] top-[40px]" />
      <Container className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <div className="bg-brand-gradient relative flex aspect-[4/5] w-full max-w-[300px] items-center justify-center overflow-hidden rounded-lg shadow-lift">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 0%, rgba(255,255,255,0.3), transparent 70%)",
              }}
            />
            <span className="relative text-6xl font-bold text-gray-0">
              {founder.initials}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold text-heading">{founder.name}</p>
            <p className="text-sm text-subtle">
              {founder.nameEn} · {founder.title}
            </p>
            <p className="text-sm text-faint">
              서강대학교 기술경영전문대학원 교수
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <blockquote className="text-xl font-semibold leading-[1.5] tracking-[-0.01em] text-display sm:text-2xl">
            “{founder.quote}”
          </blockquote>

          <div className="grid gap-8 sm:grid-cols-2">
            {founder.credentials.map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                  {group.label}
                </h3>
                <ul className="flex flex-col gap-2 border-t border-line pt-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[0.95rem] font-light leading-[1.7] text-body"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="font-mono text-xs text-faint">
            {company.legalNameKo} · {company.ceoTitle}
          </p>
        </div>
      </Container>
    </Section>
  );
}
