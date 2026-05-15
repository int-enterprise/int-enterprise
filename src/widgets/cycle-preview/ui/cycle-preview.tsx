import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Section } from "@/shared/ui";
import { product } from "@/entities/product";

export function CyclePreview() {
  return (
    <Section surface="soft" className="py-20 sm:py-28">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              How it works
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-4xl">
              점검 → 감지 → 진단 → 계획 → 회복.
              <br />
              <span className="text-muted">한 번의 사이클로 끊임없이.</span>
            </h2>
          </div>
          <Link
            href="/turing"
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-all hover:gap-2"
          >
            제품 자세히 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {product.pillars.map((p, idx) => (
            <li
              key={p.key}
              className="relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-mint">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {idx < product.pillars.length - 1 && (
                  <ChevronRight
                    aria-hidden
                    className="hidden h-4 w-4 text-mint-deep lg:block"
                  />
                )}
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-strong">
                {p.tagline}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
