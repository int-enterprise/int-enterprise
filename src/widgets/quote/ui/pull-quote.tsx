import { Blob, Container, Section } from "@/shared/ui";

/**
 * 대형 인용구. 제품/사업 블록 사이의 호흡.
 * 배경 그라디언트 블롭 + 큰 인용부호. 강조 구절만 진하게.
 */
export function PullQuote({
  lead,
  emphasis,
  tail,
  name,
  role,
  initials,
}: {
  lead: string;
  emphasis: string;
  tail?: string;
  name: string;
  role: string;
  initials?: string;
}) {
  return (
    <Section rhythm="large" className="relative overflow-hidden">
      <Blob color="mix" size={520} className="left-1/2 top-0 -translate-x-1/2" />
      <Container width="text">
        <figure className="flex flex-col items-center gap-8 text-center">
          <span
            aria-hidden
            className="font-serif text-6xl leading-none text-accent"
          >
            “
          </span>
          <blockquote className="max-w-[24ch] text-[1.6rem] font-semibold leading-[1.4] tracking-[-0.02em] text-display sm:text-[2rem] sm:leading-[1.4]">
            <span className="text-subtle">{lead} </span>
            <span className="text-display">{emphasis}</span>
            {tail ? <span className="text-subtle"> {tail}</span> : null}
          </blockquote>
          <figcaption className="flex items-center gap-3">
            {initials ? (
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-gray-0"
              >
                {initials}
              </span>
            ) : null}
            <span className="text-base font-semibold text-heading">{name}</span>
            <span className="text-sm text-subtle">{role}</span>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
