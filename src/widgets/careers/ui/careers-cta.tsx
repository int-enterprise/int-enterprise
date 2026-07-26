import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container, Section } from "@/shared/ui";

/**
 * 인재채용 → 채용 공고로 넘기는 구간.
 *
 * ⚠️ 지원 경로는 항상 **인재채용 → 채용 공고** 순서다.
 * 이 페이지에 메일 지원 버튼을 직접 두지 않는다 — 공고 페이지에서 받는다.
 */
export function CareersCta() {
  return (
    <Section rhythm="large">
      <Container>
        <div className="bg-brand-gradient relative overflow-hidden rounded-lg px-8 py-16 text-center shadow-lift sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(50% 60% at 30% 0%, rgba(255,255,255,0.28), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-[20ch] text-[1.9rem] font-bold leading-[1.16] tracking-[-0.03em] text-gray-0 sm:text-[2.5rem]">
              지원 안내
            </h2>
            <p className="max-w-[46ch] text-lg font-light leading-[1.75] text-gray-0/80">
              지금 맞는 공고가 없어도 상시 지원은 열려 있습니다.
            </p>
            <Button asChild size="lg" variant="accent" className="mt-2">
              <Link href="/careers/jobs">
                채용 공고 보기
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
