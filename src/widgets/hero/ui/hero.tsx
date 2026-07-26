import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark, Blob, Button, Container } from "@/shared/ui";
import { company } from "@/entities/company";
import { HeroScene } from "./hero-scene";

/**
 * 히어로 — 좌(워드마크 + 브랜드 뜻) / 중앙(3D) / 우(슬로건 + 버튼) 3열.
 *
 * ⚠️ 텍스트 좌 / 3D 우의 2열로 바꿨다가 되돌렸다. 이 3열이 확정된 구성이다.
 *
 * **모바일에서는 3D를 맨 아래로 내린다(`order-last`).**
 * DOM 순서대로 쌓으면 3D 정사각형이 화면 하나를 통째로 먹고, 슬로건과 버튼이
 * 첫 화면 밖으로 밀린다 — 휴대폰에서는 아무도 도입 문의 버튼을 못 본다.
 * 좁은 화면의 읽는 순서는 **브랜드 → 슬로건 → 버튼 → 3D**다.
 *
 * 브랜드 풀네임(intelligent new technologies)이 나오는 자리는 **여기 한 곳뿐이다.**
 *
 * ⚠️ 섹션에 overflow-hidden을 걸지 않는다. 걸면 블롭이 경계에서 직선으로 잘린다.
 * ⚠️ 첫 섹션이므로 블롭에 음수 top을 주지 않는다(main 위쪽에서 잘린다).
 */
export function Hero() {
  return (
    <section className="relative">
      {/* 3D 뒤에 깔리는 옅은 광원. 배경을 채우지는 않는다. */}
      <Blob
        color="mix"
        size={560}
        className="left-1/2 top-[80px] -translate-x-1/2 opacity-70"
      />
      <Blob
        color="teal"
        size={360}
        className="bottom-[40px] left-1/2 -translate-x-[70%] opacity-50"
        delay={5}
      />

      <Container
        width="bleed"
        className="grid items-center gap-y-9 py-14 sm:gap-y-10 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)_minmax(0,1fr)] lg:gap-x-10 lg:py-[120px]"
      >
        {/* 좌 — 워드마크, 브랜드의 뜻, 진입점 */}
        <div className="flex flex-col items-start gap-7">
          <div className="flex flex-col items-start gap-5">
            <BrandMark size="xl" />
            <div className="flex flex-col gap-2">
              <p className="text-lg font-light tracking-[-0.01em] text-faint">
                {company.brandMeaning}
              </p>
              {/* 이 페이지의 h1. 슬로건 문단을 없앴으므로 여기가 유일한 최상위 헤딩이다. */}
              <h1 className="text-lg font-semibold text-display">
                지능적인 새 기술로 기업의 일을 바꿉니다
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
        <HeroScene className="order-last mx-auto aspect-square w-full max-w-[280px] sm:max-w-[420px] lg:order-none lg:max-w-none" />
      </Container>
    </section>
  );
}
