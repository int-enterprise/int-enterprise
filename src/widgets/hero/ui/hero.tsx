import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BrandMark, Blob, Button, Container } from "@/shared/ui";
import { company } from "@/entities/company";
import { HeroScene } from "./hero-scene";
import { HeroStage } from "./hero-stage";

/**
 * 히어로 — 첫 화면을 꽉 채우는 핀 구간. 좌(워드마크·브랜드 뜻·버튼) / 중앙(3D).
 *
 * 스크롤을 내리면 히어로가 화면에 붙은 채로 3D가 천천히 돌며 커지고, 문구는 흐려진다.
 * 활주로가 끝나면 핀이 풀리고 다음 섹션이 올라온다 — 무대는 `HeroStage`가 만든다.
 *
 * ⚠️ 우측 슬로건 칸은 없앴다. "변화에 적응하는 기업용 AI" 같은 슬로건 문단을 다시 넣지 않는다.
 * 우측 칸을 비워 두는 것은 3D를 화면 가운데에 두기 위해서다(그리드는 3열 유지).
 *
 * **모바일에서는 3D를 맨 아래로 내린다(`order-last`).**
 * DOM 순서대로 쌓으면 3D 정사각형이 화면을 통째로 먹고 버튼이 첫 화면 밖으로 밀린다.
 * 좁은 화면의 읽는 순서는 **브랜드 → 한 줄 → 버튼 → 3D**다.
 *
 * 브랜드 풀네임(intelligent new technologies)이 나오는 자리는 **여기 한 곳뿐이다.**
 */
export function Hero() {
  return (
    <HeroStage>
      {/* 3D 뒤에 깔리는 옅은 광원. 배경을 채우지는 않는다. */}
      <Blob
        color="mix"
        size={560}
        className="left-1/2 top-[12%] -translate-x-1/2 opacity-70"
      />
      <Blob
        color="teal"
        size={360}
        className="bottom-[12%] left-1/2 -translate-x-[70%] opacity-50"
        delay={5}
      />

      <Container
        width="bleed"
        className="grid w-full items-center gap-y-9 sm:gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)_minmax(0,1fr)] lg:gap-x-10"
      >
        {/* 좌 — 워드마크, 브랜드의 뜻, 진입점. 스크롤하면 먼저 물러난다. */}
        <div
          className="flex flex-col items-start gap-7"
          style={{
            opacity: "calc(1 - var(--hero-p, 0) * 1.8)",
            transform: "translateY(calc(var(--hero-p, 0) * -28px))",
          }}
        >
          <div className="flex flex-col items-start gap-5">
            <BrandMark size="xl" />
            <div className="flex flex-col gap-2">
              <p className="text-lg font-light tracking-[-0.01em] text-faint">
                {company.brandMeaning}
              </p>
              {/*
                이 페이지의 h1. 슬로건 문단을 없앴으므로 여기가 유일한 최상위 헤딩이다.
                ⚠️ "바꿉니다" "혁신" 같은 홍보 동사를 쓰지 않는다. 하는 일을 공학 용어로 적는다 —
                신뢰성(reliability)은 만들고(설계) 운영하는(유지) 두 사업을 한 단어로 묶는 축이다.
              */}
              <h1 className="text-lg font-semibold text-display">
                기업 AI의 신뢰성을 설계하고 유지합니다
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                도입 문의
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/careers">인재채용</Link>
            </Button>
          </div>
        </div>

        {/* 중앙 — 이 화면의 시각 요소. 우측 칸은 비워 3D를 화면 가운데에 둔다. */}
        <div
          className="relative order-last mx-auto aspect-square w-full max-w-[280px] sm:max-w-[420px] lg:order-none lg:max-w-none"
          // 끝자락(0.7~1)에서만 살짝 흐려진다. 일찍 흐려지면 볼거리 없는 화면이 길어진다.
          style={{
            opacity: "calc(1 - max(0, var(--hero-p, 0) - 0.7) * 1.4)",
          }}
        >
          {/*
            ⚠️ 캔버스를 칸보다 20% 넓게 그린다. 칸 크기에 딱 맞추면 스크롤로 회전할 때
            도형이 캔버스 경계에서 잘린다(캔버스가 곧 카메라 프레임이다).
            카메라도 같은 비율로 물러나 있어(hero-canvas의 z) 화면상 크기는 그대로다.
          */}
          <HeroScene className="absolute -inset-[20%]" />
        </div>
      </Container>

      {/* 스크롤 힌트 — 첫 화면이 꽉 차 있으므로 더 내려갈 곳이 있음을 알린다. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint sm:flex"
        style={{ opacity: "calc(1 - var(--hero-p, 0) * 4)" }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em]">
          scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-float" />
      </div>
    </HeroStage>
  );
}
