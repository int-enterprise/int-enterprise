import Link from "next/link";
import { Blob, Container, Eyebrow } from "@/shared/ui";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * 하위 페이지 상단. 중앙정렬 텍스트 + 배경 그라디언트 블롭.
 * 스킬: 텍스트만으로 섹션을 채우지 않는다 — 옅은 블롭으로 시각 요소를 준다.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  action,
}: {
  crumbs: readonly Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24">
      <Blob color="teal" size={440} className="left-[-60px] top-[-40px]" />
      <Blob color="navy" size={380} className="right-[-40px] top-[20px]" delay={4} />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <nav aria-label="현재 위치">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-faint">
            <li>
              <Link href="/" className="transition-colors hover:text-body">
                홈
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-body">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-body">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}

        <h1 className="max-w-[20ch] text-[2.2rem] font-bold leading-[1.14] tracking-[-0.03em] text-display sm:text-[3rem]">
          {title}
        </h1>

        {description ? (
          <p className="max-w-[56ch] text-lg font-light leading-[1.7] text-body">
            {description}
          </p>
        ) : null}

        {action}
      </Container>
    </section>
  );
}
