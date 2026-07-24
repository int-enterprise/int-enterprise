import * as React from "react";
import { cn } from "@/shared/lib";

/**
 * 무한 마퀴.
 * 이 사이트에는 스크롤 리빌 애니메이션이 없다. 페이지가 살아 있다는 느낌은
 * 전부 이 자동 루프와 0.2s 호버가 만든다.
 *
 * 목록을 두 번 렌더하고 -50%까지 이동시켜 이음매를 없앤다.
 * 자식은 반드시 원본 목록 1벌만 넘긴다 — 복제는 여기서 한다.
 */
export function Marquee({
  children,
  reverse,
  /** 느릴수록 고급스럽다. 로고 60s, 카드 100s가 기준. */
  duration = 100,
  className,
  label,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_120px,black_calc(100%-120px),transparent)]",
        className
      )}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div
        className="flex w-max shrink-0 items-stretch group-hover:[animation-play-state:paused]"
        style={{
          animationName: "marquee",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: reverse ? "reverse" : "normal",
        }}
        aria-hidden={Boolean(label)}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
