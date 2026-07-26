"use client";

import * as React from "react";
import { HeroProgressContext } from "./hero-progress";

/**
 * 히어로 무대 — 첫 화면을 꽉 채우고, 스크롤하는 동안 제자리에 머문다.
 *
 * 구조: 바깥 섹션이 **200svh짜리 활주로**이고, 안쪽 블록이 `sticky top-0`으로 핀된다.
 * 그래서 한 화면을 내리는 동안 히어로는 화면에 붙어 있고(그동안 3D가 천천히 변한다),
 * 활주로가 끝나는 순간 핀이 풀리며 다음 섹션이 올라온다.
 *
 * 진행도(0~1)는 두 갈래로 흐른다.
 *   1) CSS 변수 `--hero-p` — 문구·스크롤 힌트의 페이드(리렌더 없음)
 *   2) `HeroProgressContext`의 ref — 3D 씬이 useFrame에서 읽는다
 *
 * ⚠️ prefers-reduced-motion이면 핀을 걸지 않는다(`motion-reduce:`). 활주로가 사라지면
 * runway ≤ 0이 되어 진행도는 0으로 고정되고, 히어로는 평범한 한 섹션이 된다.
 */
export function HeroStage({ children }: { children: React.ReactNode }) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const progress = React.useRef(0);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // 핀이 유지되는 거리 = 활주로 높이 − 화면 높이
      const runway = el.offsetHeight - window.innerHeight;
      const p =
        runway > 0
          ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / runway))
          : 0;
      progress.current = p;
      el.style.setProperty("--hero-p", p.toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <HeroProgressContext value={progress}>
      {/*
        -mt-16: 헤더(h-16)가 흐름에서 차지하는 높이만큼 끌어올려 **첫 화면을 꽉 채운다.**
        헤더는 sticky라 그대로 히어로 위에 떠 있는다. 이 여백을 두면 화면 아래가 64px 잘려
        스크롤 힌트가 접힌다.
      */}
      <section
        ref={sectionRef}
        className="relative -mt-16 h-[200svh] motion-reduce:mt-0 motion-reduce:h-auto"
      >
        {/* ⚠️ overflow-hidden을 걸지 않는다. 걸면 블롭이 경계에서 직선으로 잘린다. */}
        {/* sticky 자체가 위치 기준(containing block)이라 블롭·스크롤 힌트가 여기 붙는다 */}
        <div className="sticky top-0 flex h-[100svh] w-full items-center motion-reduce:relative motion-reduce:h-auto motion-reduce:py-16">
          {children}
        </div>
      </section>
    </HeroProgressContext>
  );
}
