import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Blob, ProductMark, Section, SectionHeader } from "@/shared/ui";
import { productBrands, type ProductBrand } from "@/entities/product";
import { cn } from "@/shared/lib";

/**
 * 두 사업(BM)을 한 화면에 나란히. 랜딩과 /products가 같은 블록을 쓴다.
 *
 * 스킬: 비대칭. 주력(turing.)만 브랜드 그라디언트로 톤을 올리고
 * buildAI.는 흰 카드 + 옅은 미스트로 둔다. 워드마크 자체가 시각 요소다.
 * 여기서는 목록을 길게 늘어놓지 않는다 — 자세한 내용은 제품 페이지가 맡는다.
 */
function ProductPanel({ brand }: { brand: ProductBrand }) {
  const dark = Boolean(brand.primary);

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg p-9 sm:p-11",
        "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
        dark
          ? "bg-brand-gradient shadow-lift"
          : "border border-line bg-card shadow-soft hover:shadow-lift"
      )}
    >
      {/* 표면 하이라이트 / 미스트 — 텍스트 위가 아니라 배경에만 */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          dark ? "opacity-55" : "opacity-100"
        )}
        style={{
          background: dark
            ? "radial-gradient(55% 60% at 20% 0%, rgba(255,255,255,0.3), transparent 70%)"
            : "radial-gradient(60% 60% at 85% 0%, rgba(64,224,208,0.14), transparent 70%)",
        }}
      />

      <div className="relative flex flex-1 flex-col gap-5">
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-pill px-3.5 py-1.5 text-xs font-semibold",
            dark
              ? "bg-accent text-navy-40"
              : "border border-line text-subtle"
          )}
        >
          {brand.role}
        </span>

        <ProductMark
          name={brand.name}
          className={cn(
            "text-[2.4rem] leading-none sm:text-[2.9rem]",
            dark ? "text-gray-0" : "text-display"
          )}
        />

        <h3
          className={cn(
            "text-xl font-semibold leading-[1.4] sm:text-2xl",
            dark ? "text-gray-0" : "text-heading"
          )}
        >
          {brand.headline}
        </h3>

        <p
          className={cn(
            "max-w-[44ch] text-base font-light leading-[1.75]",
            dark ? "text-gray-0/80" : "text-body"
          )}
        >
          {brand.body}
        </p>

        {/* ⚠️ 고객사 이름을 여기 적지 않는다. 레퍼런스는 제품 페이지와 로고 월이 맡는다. */}
        <div
          className={cn(
            "mt-auto flex items-center justify-end border-t pt-6",
            dark ? "border-gray-0/20" : "border-line"
          )}
        >
          <Link
            href={brand.href}
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline",
              dark ? "text-accent" : "text-link"
            )}
          >
            자세히 보기
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductDuo({
  title = "사업 영역",
  description = "(주)인트의 사업은 두 축입니다. 기업용 AI를 직접 설계해 만들고, 그 AI가 시간이 지나도 제 성능을 내게 합니다. 만들면서 쌓인 운영 데이터가 제품을 키우고, 제품이 다시 구축의 품질을 올립니다.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section rhythm="large" id="products" className="relative">
      {/* 히어로의 블롭과 이어지도록 섹션 위쪽으로 걸쳐 놓는다(경계에서 끊기지 않게) */}
      <Blob
        color="mix"
        size={560}
        className="left-[-180px] top-[-160px] opacity-70"
      />

      <SectionHeader eyebrow="What we do" title={title} description={description} />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
        {productBrands.map((brand) => (
          <ProductPanel key={brand.key} brand={brand} />
        ))}
      </div>
    </Section>
  );
}
