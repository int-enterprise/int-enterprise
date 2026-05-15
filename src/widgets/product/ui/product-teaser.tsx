import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark, Button, Section } from "@/shared/ui";
import { product } from "@/entities/product";

export function ProductTeaser() {
  return (
    <Section surface="ink" className="py-20 sm:py-28">
      <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            Product
          </span>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
            기업용 AI 운영의 표준,
            <br />
            <BrandMark size="xl" label="turing" tone="mint" />
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {product.shortDescription}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="mint" size="lg">
              <Link href="/turing">
                제품 자세히 보기
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white hover:text-ink"
            >
              <Link href="/contact">도입 문의</Link>
            </Button>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {product.pillars.map((p, idx) => (
            <li
              key={p.key}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint text-xs font-bold text-ink">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">
                  {p.tagline}
                </span>
                <span className="text-base font-semibold text-white">
                  {p.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
