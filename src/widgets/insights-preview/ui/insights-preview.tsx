import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button, Section } from "@/shared/ui";
import {
  articles,
  placeholderArticles,
  ArticleCard,
} from "@/entities/article";
import { company } from "@/entities/company";

export function InsightsPreview() {
  const hasReal = articles.length > 0;
  const cards = (hasReal ? articles : placeholderArticles).slice(0, 3);

  return (
    <Section surface="white" className="py-20 sm:py-28">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              Insights
            </span>
            <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              (주)인트의 소식과 시선.
            </h2>
            {!hasReal && (
              <p className="text-sm text-muted">
                실제 기사·보도자료는 차례로 업데이트됩니다. 아래는 디자인
                미리보기입니다.
              </p>
            )}
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-all hover:gap-2"
          >
            전체 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((a) => (
            <ArticleCard key={a.title} article={a} />
          ))}
        </div>

        {!hasReal && (
          <div className="flex flex-col items-start gap-3 rounded-[20px] border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-muted-strong">
              취재·인터뷰 일정 안내가 필요하시면 아래로 연락 주세요.
            </p>
            <Button asChild variant="outline" size="sm">
              <a
                href={`mailto:${company.contact.email}?subject=${encodeURIComponent(
                  "[취재/언론 문의] "
                )}`}
              >
                <Mail className="h-4 w-4" />
                {company.contact.email}
              </a>
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
