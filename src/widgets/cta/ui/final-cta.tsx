import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container, Section } from "@/shared/ui";
import { company } from "@/entities/company";

/**
 * 최종 CTA — 브랜드 그라디언트 패널.
 * 스킬: 포인트 컬러/그라디언트를 큰 면적에, 텍스트 위엔 얹지 않는다.
 * 그래서 그라디언트는 패널 배경으로만 쓰고 그 위에 흰 텍스트를 올린다.
 */
export function FinalCta({
  title = "만들고, 지키고, 계속 돌립니다.",
  body = "지금 운영 중인 AI가 있다면 어떤 점이 아쉬운지, 아직 없다면 어떤 업무를 맡기고 싶은지 알려주세요. 영업일 기준 1–2일 안에 회신드립니다.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section rhythm="large">
      <Container>
        <div className="bg-brand-gradient relative overflow-hidden rounded-lg px-8 py-16 text-center shadow-lift sm:px-16 sm:py-24">
          {/* 표면 하이라이트 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(50% 60% at 30% 0%, rgba(255,255,255,0.28), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-[18ch] text-[2rem] font-bold leading-[1.14] tracking-[-0.03em] text-gray-0 sm:text-[2.75rem]">
              {title}
            </h2>
            <p className="max-w-[52ch] text-lg font-light leading-[1.7] text-gray-0/80">
              {body}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild size="lg" variant="accent">
                <Link href="/contact">
                  문의하기
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="onDark">
                <a href={`mailto:${company.contact.email}`}>
                  {company.contact.email}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
