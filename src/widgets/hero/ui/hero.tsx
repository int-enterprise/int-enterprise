import Link from "next/link";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { Badge, BrandMark, Button } from "@/shared/ui";
import { images } from "@/shared/assets/images";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col gap-7 sm:gap-9">
            <Badge variant="mint" className="self-start">
              <Sparkles className="h-3.5 w-3.5" />
              변화에 적응하는 기업용 AI
            </Badge>

            <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-6xl lg:text-7xl">
              AI는 만드는 것이 아니라,
              <br />
              <span className="text-muted">운영하는 것</span>입니다
              <span
                aria-hidden
                className="ml-2 inline-block h-3 w-3 translate-y-[-4px] rounded-full bg-mint sm:h-4 sm:w-4 lg:h-5 lg:w-5"
              />
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted-strong sm:text-lg">
              (주)인트는 기업의 AI가 변하는 환경 속에서도 일정한 품질로 일할 수 있도록,
              AI 운영의 처음부터 끝까지를 함께 책임지는 솔루션{" "}
              <BrandMark size="xs" label="turing" />을 만듭니다.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" variant="primary">
                <Link href="/contact">
                  도입 문의하기
                  <ArrowDownRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/turing">제품 자세히 보기</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-surface lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3 text-white">
              <BrandMark size="lg" tone="white" />
              <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
                Enterprise AI Ops
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
