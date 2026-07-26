import Image from "next/image";
import { Container, Section } from "@/shared/ui";
import { company, founder, team } from "@/entities/company";

/**
 * 인사말. 좌측 대표 사진 + 우측 본문.
 *
 * ⚠️ **약력을 붙이지 않는다.** 학력·경력 목록은 인사말이 아니라 이력서다(대표 지시).
 * 사진은 팀 데이터에서 가져온다 — 팀 소개와 같은 사진이 쓰이도록.
 */
const ceo = team.find((m) => m.name === company.ceo);

export function GreetingSection() {
  return (
    <Section rhythm="large" id="greeting" className="relative">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-lg bg-canvas-2 shadow-soft">
            {ceo ? (
              <Image
                src={ceo.photo}
                alt={`${founder.name} ${founder.title}`}
                fill
                quality={92}
                sizes="(max-width: 1024px) 92vw, 320px"
                className="object-cover object-top"
                priority
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold text-heading">{founder.name}</p>
            <p className="font-mono text-xs text-accent">{founder.title}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            인사말
          </p>
          <blockquote className="max-w-[46ch] text-xl font-bold leading-[1.5] tracking-[-0.015em] text-display sm:text-2xl">
            “{founder.greeting[0]}”
          </blockquote>
          {founder.greeting.slice(1).map((p) => (
            <p
              key={p}
              className="max-w-[60ch] text-base font-light leading-[1.8] text-body"
            >
              {p}
            </p>
          ))}
          <p className="mt-4 font-mono text-xs text-faint">
            {company.legalNameKo} · {company.ceoTitle}
          </p>
        </div>
      </Container>
    </Section>
  );
}
