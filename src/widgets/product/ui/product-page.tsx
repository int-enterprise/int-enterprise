import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, BrandMark, Button, Section } from "@/shared/ui";
import { PillarCard, product } from "@/entities/product";

export function ProductPage() {
  return (
    <>
      <Section surface="white" className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <Badge variant="outline">Enterprise AI Operations</Badge>
            <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl lg:text-6xl">
              <BrandMark size="xl" label="turing" />
              <span className="mt-2 block text-muted text-xl sm:text-2xl font-medium">
                {product.tagline}
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-strong sm:text-lg">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" variant="primary">
                <Link href="/contact">
                  도입·PoC 문의
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-[24px] border border-border bg-mint-mist p-8 sm:p-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              한 문장으로
            </h3>
            <p className="mt-4 text-lg font-medium leading-relaxed text-ink sm:text-xl">
              "기업의 AI가 변화 속에서도, 어제와 같은 품질로 일하도록."
            </p>
          </div>
        </div>
      </Section>

      <Section surface="soft" className="py-20 sm:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              How it works
            </span>
            <h3 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              운영의 다섯 단계, 끊김 없이 하나로.
            </h3>
            <p className="max-w-2xl text-base leading-relaxed text-muted-strong">
              <BrandMark size="xs" label="turing" />은 점검 → 감지 → 진단 → 계획 → 회복의 다섯 단계를
              하나의 운영 사이클로 자동화합니다. 어떤 단계가 약해도, 다음 단계가
              그 결과를 곧장 흡수합니다.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.pillars.map((p, idx) => (
              <PillarCard key={p.key} pillar={p} index={idx} />
            ))}
          </div>
        </div>
      </Section>

      <Section surface="white" className="py-20 sm:py-24">
        <div className="flex flex-col gap-10">
          <h3 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
            도입하면 무엇이 달라지나요?
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {product.outcomes.map((o) => (
              <div
                key={o.title}
                className="flex flex-col gap-3 rounded-[20px] border border-border bg-mint-mist p-7"
              >
                <h4 className="text-base font-semibold tracking-tight text-ink">
                  {o.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-strong">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
