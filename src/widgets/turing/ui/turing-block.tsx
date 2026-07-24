import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Blob,
  Button,
  Card,
  CardText,
  CardTitle,
  Eyebrow,
  Section,
} from "@/shared/ui";
import { ConsoleShot, loopStages, product } from "@/entities/product";

/**
 * turing. 쇼케이스 — 이 섹션의 시각 주인공은 실제 콘솔 화면이다.
 * 좌측 텍스트 + 우측 큰 화면(그라디언트 블롭 위에 소프트 섀도우로 띄움).
 * 아래에 5단계 루프를 카드로.
 */
const [evaluate, detect, diagnose, plan, recover] = loopStages;
const steps = [evaluate, detect, diagnose, plan, recover];

export function TuringBlock() {
  return (
    <Section rhythm="large" id="turing" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>turing. — AI 운영 자동화</Eyebrow>
          <h2 className="text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-display sm:text-[2.75rem]">
            평가부터 복구까지
            <br />
            끊기지 않는 하나의 루프
          </h2>
          <p className="max-w-[46ch] text-lg font-light leading-[1.7] text-body">
            {product.lede}
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/turing">
              제품 자세히 보기
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        {/* 콘솔 화면 — 그라디언트 블롭 위에 소프트 섀도우 + 하이라이트로 띄운다 */}
        <div className="relative">
          <Blob color="mix" size={520} className="-right-10 -top-10" />
          <Blob color="teal" size={360} className="-bottom-16 left-0" delay={4} />
          <ConsoleShot priority className="relative animate-float" />
        </div>
      </div>

      {/* 5단계 루프 */}
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {steps.map((s) => (
          <Card key={s.key} className="flex flex-col gap-3 p-6" interactive>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-accent">
                {s.step}
              </span>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-faint">
                {s.en}
              </span>
            </div>
            <CardTitle className="text-base">{s.title}</CardTitle>
            <CardText className="text-sm">{s.summary}</CardText>
          </Card>
        ))}
      </div>
    </Section>
  );
}
