import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui";
import { clients, operators } from "@/entities/client";
import { LogoMarquee } from "@/features/logo-marquee";

export function ClientsStrip() {
  const all = [...clients, ...operators];

  return (
    <Section surface="soft" className="py-20 sm:py-24">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              Clients
            </span>
            <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              현장에서 검증된 신뢰,
              <br className="hidden sm:block" />
              <span className="text-muted">함께한 기업들입니다.</span>
            </h2>
          </div>
          <Link
            href="/clients"
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink hover:gap-2 transition-all"
          >
            전체 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <LogoMarquee clients={all} />
      </div>
    </Section>
  );
}
