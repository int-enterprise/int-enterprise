"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { cn } from "@/shared/lib";

/**
 * 히어로 배경 3D 씬 로더.
 * WebGL 캔버스는 무거우므로 클라이언트에서만, 뷰포트 진입 시 지연 로드한다.
 * SSR·LCP를 건드리지 않고, prefers-reduced-motion이면 아예 로드하지 않는다.
 * 씬은 배경일 뿐이라 로드 실패·미지원 환경에서도 히어로는 성립한다.
 */
const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null }
);

export function HeroScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [show, setShow] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          // 캔버스가 붙을 시간을 주고 페이드 인
          const t = setTimeout(() => setReady(true), 120);
          io.disconnect();
          return () => clearTimeout(t);
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-1000",
        ready ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {show ? <HeroCanvas className="h-full w-full" /> : null}
    </div>
  );
}
