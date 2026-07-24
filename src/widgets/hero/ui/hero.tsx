import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Blob, Button, Container } from "@/shared/ui";
import { HeroScene } from "./hero-scene";

/**
 * 히어로 — 스킬의 비대칭 레이아웃.
 * 텍스트는 좌측, 3D 오브젝트가 우측을 침범한다.
 * 배경엔 그라디언트 블롭이 천천히 떠다니고, 헤딩은 크고 굵게.
 * 시각 요소(3D)가 히어로에 반드시 들어간다 — 스킬 필수 조건.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* 배경 그라디언트 블롭 */}
      <Blob color="teal" size={520} className="right-[-80px] top-[40px]" />
      <Blob color="navy" size={460} className="left-[-120px] top-[220px]" delay={3} />
      <Blob color="mix" size={380} className="right-[220px] bottom-[40px]" delay={6} />

      {/* 우측을 침범하는 3D 씬 */}
      <HeroScene className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-full w-[62%] lg:block" />

      <Container className="grid items-center gap-12 py-24 sm:py-28 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:py-[130px]">
        <div className="flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-canvas/70 px-4 py-2 text-xs font-semibold text-subtle shadow-soft backdrop-blur">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            서강대 연구실에서 출발한 기업용 AI
          </span>

          <h1 className="text-[2.6rem] font-bold leading-[1.08] tracking-[-0.035em] text-display sm:text-[3.6rem] lg:text-[4.1rem]">
            AI는 배포한 다음 날부터
            <br />
            조용히 나빠집니다
          </h1>

          <p className="max-w-[46ch] text-lg font-light leading-[1.7] text-body">
            (주)인트는 기업용 AI를 직접 만들고, turing.으로 그 AI를 매일
            측정합니다. 흔들리는 시점을 사용자보다 먼저 잡아내고, 서비스를 멈추지
            않은 채 되돌립니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button asChild size="lg">
              <Link href="/turing">
                turing. 살펴보기
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services#references">구축 사례 보기</Link>
            </Button>
          </div>

          {/* 근거 지표 — 텍스트만이 아닌 작은 시각 위계 */}
          <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            <div className="flex flex-col">
              <dt className="text-xs text-faint">수행 과제</dt>
              <dd className="font-mono text-2xl font-semibold text-display">8건</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-xs text-faint">분야 · 고객층</dt>
              <dd className="font-mono text-2xl font-semibold text-display">6 · 4</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-xs text-faint">생산성 향상</dt>
              <dd className="font-mono text-2xl font-semibold text-display">
                26.1%
              </dd>
            </div>
          </dl>
        </div>

        {/* 모바일·태블릿용 3D 자리 (데스크톱은 배경 절대배치) */}
        <div className="relative min-h-[280px] lg:hidden">
          <HeroScene className="pointer-events-none absolute inset-0" />
        </div>
      </Container>
    </section>
  );
}
