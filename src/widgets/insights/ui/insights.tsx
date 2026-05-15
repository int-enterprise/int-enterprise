import { Mail, Sparkles } from "lucide-react";
import { Section } from "@/shared/ui";
import {
  articles,
  placeholderArticles,
  ArticleCard,
} from "@/entities/article";
import { company } from "@/entities/company";

export function Insights() {
  const hasReal = articles.length > 0;
  const cards = hasReal ? articles : placeholderArticles;

  return (
    <>
      <Section surface="white" className="py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          {!hasReal && (
            <div className="flex items-start gap-3 rounded-2xl border border-mint/30 bg-mint-pale/60 p-5">
              <Sparkles className="mt-0.5 h-5 w-5 text-mint-deep" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-ink">
                  아래 카드는 디자인 미리보기입니다.
                </p>
                <p className="text-sm leading-relaxed text-muted-strong">
                  실제 기사·보도자료는 발행 시점에 차례로 업데이트됩니다.
                  취재·게재 일정 안내가 필요하시면 아래 이메일로 연락 주세요.
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((a) => (
              <ArticleCard key={a.title} article={a} />
            ))}
          </div>
        </div>
      </Section>

      <Section surface="soft" className="py-16">
        <div className="flex flex-col items-start gap-4 rounded-[24px] border border-border bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              취재·인터뷰 문의
            </h3>
            <p className="text-sm leading-relaxed text-muted-strong">
              (주)인트의 비전·제품·산업 인사이트에 대해 인터뷰가 필요하시면
              아래로 연락 주세요.
            </p>
          </div>
          <a
            href={`mailto:${company.contact.email}?subject=${encodeURIComponent(
              "[취재/언론 문의] "
            )}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink-soft"
          >
            <Mail className="h-4 w-4" />
            {company.contact.email}
          </a>
        </div>
      </Section>
    </>
  );
}
