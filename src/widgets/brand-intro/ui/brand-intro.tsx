import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark, Section, SectionHeader } from "@/shared/ui";

interface Card {
  label: string;
  title: React.ReactNode;
  description: string;
  href: string;
}

const cards: Card[] = [
  {
    label: "About",
    title: "(주)인트는 어떤 회사인가요?",
    description:
      "기업의 AI가 처음과 끝까지 안정적으로 굴러갈 수 있도록 만드는 AI 운영 전문 회사입니다.",
    href: "/about",
  },
  {
    label: "Product",
    title: (
      <>
        <BrandMark size="sm" label="turing" />
        <span className="ml-2">으로 무엇이 달라지나요?</span>
      </>
    ),
    description:
      "AI를 매일 점검하고, 가장 먼저 이상을 알아채고, 안전하게 회복합니다.",
    href: "/turing",
  },
  {
    label: "Clients",
    title: "어떤 기업과 함께하고 있나요?",
    description:
      "현장에서 검증된 고객사들과 실제 프로젝트로 협업하고 있습니다.",
    href: "/clients",
  },
];

export function BrandIntro() {
  return (
    <Section surface="white" className="py-20 sm:py-28">
      <div className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Why us"
          title={
            <>
              모델은 평준화되었습니다.
              <br />
              <span className="text-muted">이제 중요한 것은, 운영입니다.</span>
            </>
          }
          description="기업의 AI가 가장 빛나야 할 순간은 시연이 아니라, 운영입니다. (주)인트는 그 순간을 한국에서 가장 먼저 정의하는 회사입니다."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col gap-4 rounded-[20px] border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_12px_36px_rgba(10,10,10,0.06)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
                {c.label}
              </span>
              <h3 className="flex items-baseline flex-wrap text-lg font-semibold leading-snug text-ink">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-strong">
                {c.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-ink">
                자세히 보기
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
