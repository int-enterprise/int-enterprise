import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container, Eyebrow } from "@/shared/ui";
import { Photo } from "@/shared/ui/photo";

/**
 * 인재채용 상단 — 문장 위, 단체사진 아래.
 *
 * 다른 페이지의 PageHero(가운데 정렬 + 블롭)를 쓰지 않는다.
 * 채용 페이지는 사람이 주인공이라 사진이 화면을 넓게 차지해야 한다.
 * 사진 아래쪽은 배경색으로 페이드시켜 다음 섹션과 이어지게 한다.
 *
 * 사진 자산: `public/careers/team.jpg` (없으면 브랜드 패널로 대체된다)
 */
export function CareersHero() {
  return (
    <section className="relative">
      <Container className="flex flex-col items-center gap-6 pb-14 pt-16 text-center sm:pt-20">
        <Eyebrow>Team</Eyebrow>

        <h1 className="max-w-[22ch] text-[2.4rem] font-bold leading-[1.14] tracking-[-0.035em] text-display sm:text-[3.2rem]">
          만든 뒤까지 책임지는 팀을
          <br />
          만들고 있습니다
        </h1>

        <p className="max-w-[46ch] text-lg font-light leading-[1.75] text-body">
          네 명이 시작했습니다. 합류하는 사람의 몫이 큽니다.
        </p>

        <Button asChild size="lg" className="mt-2">
          <Link href="/careers/jobs">
            채용 공고 보기
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </Container>

      {/* 단체사진 — 화면 폭을 꽉 채우고 아래로 갈수록 배경에 녹인다 */}
      <div className="relative">
        <Photo
          src="/careers/team.jpg"
          alt="(주)인트 구성원 단체 사진"
          priority
          sizes="100vw"
          className="h-[320px] w-full sm:h-[440px] lg:h-[520px]"
          placeholder="단체사진이 들어갈 자리입니다 (public/careers/team.jpg)"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-canvas))",
          }}
        />
      </div>
    </section>
  );
}
