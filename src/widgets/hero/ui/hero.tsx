import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark, Blob, Button, Container } from "@/shared/ui";
import { company } from "@/entities/company";
import { HeroScene } from "./hero-scene";

/**
 * 히어로 — 좌(워드마크 + 브랜드 뜻) / 중앙(3D) / 우(슬로건 + 버튼) 3열.
 *
 * ⚠️ 텍스트 좌 / 3D 우의 2열로 바꿨다가 되돌렸다. 이 3열이 확정된 구성이다.
 * DOM 순서가 그대로 좌→중앙→우 열에 대응하므로 모바일에서도 읽는 순서가 유지된다.
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
        className="grid items-center gap-y-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)_minmax(0,1fr)] lg:gap-x-10 lg:py-[120px]"
      >
        {/* 좌 — 워드마크와 브랜드의 뜻 */}
        <div className="flex flex-col items-start gap-5">
          <BrandMark size="xl" />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-light tracking-[-0.01em] text-faint">
              {company.brandMeaning}
            </p>
            <p className="text-lg font-semibold text-display">
              지능적인 새 기술로 기업의 일을 바꿉니다
            </p>
          </div>
        </div>

        {/* 중앙 — 이 화면의 시각 요소 */}
        <HeroScene className="mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none" />

        {/* 우 — 슬로건과 진입점 */}
        <div className="flex flex-col items-start gap-7">
          <h1 className="text-[2.4rem] font-bold leading-[1.12] tracking-[-0.035em] text-display sm:text-[3rem] lg:text-[3.4rem]">
            변화에 적응하는
            <br />
            기업용 AI
          </h1>

          <p className="max-w-[38ch] text-lg font-light leading-[1.75] text-body">
            기업용 AI를 직접 설계해 만들고, 그 AI가 시간이 지나도 제 성능을 내게
            합니다. 만드는 일과 만든 뒤를 지키는 일을 한 팀이 합니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
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
      </Container>
    </section>
  );
}
