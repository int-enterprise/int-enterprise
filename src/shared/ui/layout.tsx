import * as React from "react";
import { cn } from "@/shared/lib";

/** 가로 격자. 텍스트는 좁게, 시각 요소는 넓게. */
type Width = "text" | "wide" | "bleed";
const widthMap: Record<Width, string> = {
  text: "max-w-[1120px]",
  wide: "max-w-[1240px]",
  bleed: "max-w-[1440px]",
};

export function Container({
  width = "wide",
  className,
  children,
}: {
  width?: Width;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", widthMap[width], className)}>
      {children}
    </div>
  );
}

/**
 * 섹션 리듬. 스킬: 섹션 간 여백을 아주 크게(최소 120px, 히어로 160px+).
 * "숨 쉬는 느낌"은 여백에서 나온다. 배경색으로 리듬을 만들지 않는다.
 */
type Rhythm = "tight" | "default" | "large";
const rhythmMap: Record<Rhythm, string> = {
  tight: "py-16 sm:py-20",
  default: "py-20 sm:py-[120px]",
  large: "py-24 sm:py-[150px]",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  rhythm?: Rhythm;
  width?: Width;
  /**
   * 아주 옅은 오프화이트 배경 (교차용, 최소한만).
   * 단색이 아니라 위·아래가 페이드되는 띠다 — 단색이면 섹션 경계가 직선으로 끊긴다.
   */
  soft?: boolean;
  bleed?: boolean;
}

export function Section({
  rhythm = "default",
  width = "wide",
  soft,
  bleed,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full scroll-mt-28",
        rhythmMap[rhythm],
        soft && "bg-soft-band",
        className
      )}
      {...props}
    >
      {bleed ? children : <Container width={width}>{children}</Container>}
    </section>
  );
}

/**
 * 섹션 라벨.
 *
 * ⚠️ 알약(pill) + 틸 점 + 그림자 조합을 쓰지 않는다. 어느 사이트에나 있는 흔한 모양이라
 * 브랜드가 없어 보인다. 대신 **자간 넓은 대문자 한 줄**로만 둔다 — 조용하고 편집물에 가깝다.
 * 테두리·배경·아이콘을 다시 붙이지 않는다.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.18em] text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * 섹션 헤더. 중앙정렬이 기본이지만 비대칭 레이아웃에선 left로.
 * 헤딩은 크게(Bold), 본문은 가볍게 max-width로 좁혀 여백감 유지.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "center",
  className,
}: {
  /** ReactNode다 — 제품 워드마크(`<ProductMark />`)를 넣을 수 있어야 한다. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-[2rem] leading-[1.12] tracking-[-0.03em] text-display sm:text-[2.75rem] lg:text-[3rem]",
          align === "center" && "mx-auto max-w-[18ch]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-[52ch] text-lg font-light leading-[1.7] text-body",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
      {action ? <div className="pt-1">{action}</div> : null}
    </header>
  );
}

/**
 * 그라디언트 블롭. 스킬의 시그니처 — 배경에 흐릿한 그라디언트 도형이
 * 천천히 떠다니며 형태가 변한다. 텍스트 가독성을 위해 항상 큰 blur.
 */
export function Blob({
  className,
  color = "teal",
  size = 420,
  delay = 0,
}: {
  className?: string;
  color?: "teal" | "navy" | "mix";
  size?: number;
  delay?: number;
}) {
  const fill =
    color === "teal"
      ? "radial-gradient(circle at 35% 35%, rgba(64,224,208,0.55), rgba(64,224,208,0) 70%)"
      : color === "navy"
        ? "radial-gradient(circle at 35% 35%, rgba(5,38,153,0.42), rgba(5,38,153,0) 70%)"
        : "radial-gradient(circle at 35% 35%, rgba(64,224,208,0.45), rgba(5,38,153,0.35) 55%, transparent 75%)";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 animate-blob blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: fill,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
