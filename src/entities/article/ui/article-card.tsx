import { ArrowUpRight, Newspaper } from "lucide-react";
import { cn } from "@/shared/lib";
import type { Article } from "../model/articles";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const isLink = Boolean(article.href);
  const Wrapper = (isLink ? "a" : "div") as "a" | "div";

  return (
    <Wrapper
      {...(isLink
        ? { href: article.href, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[20px] border bg-card transition-all",
        article.placeholder
          ? "border-dashed border-border bg-surface"
          : "border-border hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-[0_12px_36px_rgba(10,10,10,0.06)]"
      )}
    >
      <ArticleThumb article={article} />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between text-xs text-muted">
          <span
            className={cn(
              "font-semibold uppercase tracking-[0.16em]",
              article.placeholder ? "text-muted" : "text-mint-deep"
            )}
          >
            {article.publisher}
          </span>
          <span>{article.date}</span>
        </div>
        <h3
          className={cn(
            "text-base font-semibold leading-snug tracking-tight",
            article.placeholder ? "text-ink-soft" : "text-ink"
          )}
        >
          {article.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        {isLink && (
          <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            <span>기사 보기</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

function ArticleThumb({ article }: { article: Article }) {
  if (article.imageUrl) {
    return (
      <div className="relative h-44 w-full overflow-hidden bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
        />
      </div>
    );
  }
  return (
    <div className="relative flex h-44 w-full items-center justify-center bg-gradient-to-br from-mint-mist via-white to-mint-pale">
      <Newspaper
        className="h-10 w-10 text-mint-deep opacity-50"
        strokeWidth={1.5}
      />
      {article.placeholder && (
        <span className="absolute top-3 left-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted backdrop-blur">
          Preview
        </span>
      )}
    </div>
  );
}
