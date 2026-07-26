import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Marquee, Section, SectionHeader } from "@/shared/ui";
import { references, type Reference } from "@/entities/client";
import { cn } from "@/shared/lib";

const half = Math.ceil(references.length / 2);
const rowOne = references.slice(0, half);
const rowTwo = references.slice(half);

const stageTone: Record<string, string> = {
  "현업 운영": "bg-primary text-gray-0",
  "시범 적용": "bg-accent text-navy-40",
  개발: "border border-line text-body",
  "성능 평가": "border border-line text-body",
};

function WorkCard({ item }: { item: Reference }) {
  return (
    <article className="mr-5 flex w-[320px] shrink-0 flex-col gap-4 rounded-md border border-line bg-canvas p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-heading">{item.client}</span>
        <span
          className={cn(
            "rounded-pill px-2.5 py-1 text-xs font-semibold",
            stageTone[item.stage]
          )}
        >
          {item.stage}
        </span>
      </div>
      <p className="min-h-[76px] text-base font-light leading-[1.6] text-body">
        {item.title}
      </p>
      <div className="flex items-center justify-between font-mono text-xs text-faint">
        <span>{item.field}</span>
        <span>{item.period ?? (item.turing ? "turing. 내장" : "")}</span>
      </div>
    </article>
  );
}

export function WorkMarquee() {
  return (
    <Section rhythm="large" soft bleed id="references" className="overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Selected work"
          title="수행 과제"
          description="대기업부터 공공기관·스타트업까지, 업종이 다른 현장에서 AI를 설계하고 운영해 왔습니다."
        />
      </Container>

      <div className="mt-14 flex flex-col gap-5">
        <Marquee duration={55} label="수행 과제 목록">
          {rowOne.map((item) => (
            <WorkCard key={`${item.client}-${item.title}`} item={item} />
          ))}
        </Marquee>
        <Marquee duration={55} reverse>
          {rowTwo.map((item) => (
            <WorkCard key={`${item.client}-${item.title}`} item={item} />
          ))}
        </Marquee>
      </div>

      <Container className="mt-12 flex justify-center">
        <Link
          href="/products/buildai#references"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-link underline-offset-4 hover:underline"
        >
          수행 과제 전부 보기
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Container>
    </Section>
  );
}
