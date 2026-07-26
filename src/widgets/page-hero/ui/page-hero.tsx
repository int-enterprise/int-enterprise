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
  /** ReactNode다 — 제품 워드마크(`<ProductMark />`)를 넣을 수 있어야 한다. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="relative pb-16 pt-16 sm:pb-20 sm:pt-24">
      {/* main이 위쪽에서 잘리므로 첫 섹션의 블롭에 음수 top을 주지 않는다
          (음수를 주면 콘텐츠 최상단에 직선 자른 자국이 생긴다) */}
      <Blob color="teal" size={440} className="left-[-60px] top-0" />
      <Blob
        color="navy"
        size={380}
        className="right-[-40px] top-[40px]"
        delay={4}
      />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <nav aria-label="현재 위치">
          {/* 손가락 기준 44px를 맞추려고 링크에 `py-2 -my-2`를 준다.
              글자를 키우는 것이 아니라 히트 영역만 넓히는 방식이다(줄 높이는 그대로). */}
          <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-faint">
            <li>
              <Link
                href="/"
                className="-mx-4 -my-2 inline-flex items-center justify-center px-4 py-2 transition-colors hover:text-body"
              >
                홈
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.href ? (
                  <Link
                    href={c.href}
                    className="-mx-4 -my-2 inline-flex items-center justify-center px-4 py-2 transition-colors hover:text-body"
                  >
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
