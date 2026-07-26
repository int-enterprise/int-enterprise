import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container, Section } from "@/shared/ui";
import type { ContactTopic } from "@/features/contact-form";

/**
 * 최종 CTA — 브랜드 그라디언트 패널.
 * 접수는 문의 폼으로 보낸다(메일 주소 버튼을 두지 않는다).
 * 스킬: 포인트 컬러/그라디언트를 큰 면적에, 텍스트 위엔 얹지 않는다.
 * 그래서 그라디언트는 패널 배경으로만 쓰고 그 위에 흰 텍스트를 올린다.
 */
export function FinalCta({
  title = "도입 문의",
  body = "지금 운영 중인 AI가 있다면 어떤 점이 아쉬운지, 아직 없다면 어떤 업무를 맡기고 싶은지 알려주세요.",
  topic,
}: {
  title?: string;
  body?: string;
  /** 문의 페이지에서 미리 선택될 문의 유형 */
  topic?: ContactTopic;
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
            {/* ⚠️ 메일 링크를 다시 붙이지 않는다. 접수는 폼으로 받는다. */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild size="lg" variant="accent">
                <Link href={topic ? `/contact?type=${topic}` : "/contact"}>
                  문의 남기기
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
