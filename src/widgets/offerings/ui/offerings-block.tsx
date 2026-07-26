import { Blob, Card, ProductMark, Section, SectionHeader } from "@/shared/ui";
import { offerings, playbooks, positioning } from "@/entities/service";
import { buildai } from "@/entities/product";
import { cn } from "@/shared/lib";

/**
 * 사업 구조 — 세 오퍼링을 단계로. 주력(②)만 브랜드 그라디언트로 강조.
 * 아래에 규모별 협업 방식.
 *
 * ⚠️ 고객사 이름(offering.proof / playbook.example)을 화면에 찍지 않는다.
 * 고객사 노출은 랜딩(`/`)의 로고 월 한 곳뿐이다. 데이터는 남겨 두되 렌더하지 않는다.
 */
export function OfferingsBlock() {
  return (
    <Section rhythm="large" id="offerings" className="relative">
      <Blob color="navy" size={480} className="left-[-140px] top-[80px]" />

      <SectionHeader
        eyebrow={<ProductMark name={buildai.name} />}
        title="사업 구조"
        description={positioning.lede}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {offerings.map((o) =>
          o.primary ? (
            <div
              key={o.no}
              className="bg-brand-gradient relative flex flex-col gap-3 overflow-hidden rounded-lg p-8 shadow-lift"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(60% 60% at 20% 0%, rgba(255,255,255,0.25), transparent 70%)",
                }}
              />
              <div className="relative flex items-center gap-2.5">
                <span className="font-mono text-sm text-accent">{o.no}</span>
                <span className="rounded-pill bg-accent px-2.5 py-1 text-xs font-semibold text-navy-40">
                  {o.role}
                </span>
              </div>
              <h3 className="relative text-xl font-semibold text-gray-0">
                {o.name}
              </h3>
              <p className="relative text-sm font-light leading-[1.7] text-gray-0/80">
                {o.headline}
              </p>
            </div>
          ) : (
            <Card key={o.no} className="flex flex-col gap-3 p-8" interactive>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm text-faint">{o.no}</span>
                <span className="rounded-pill border border-line px-2.5 py-1 text-xs font-semibold text-subtle">
                  {o.role}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-heading">{o.name}</h3>
              <p className="text-sm font-light leading-[1.7] text-body">
                {o.headline}
              </p>
            </Card>
          )
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {playbooks.map((p) => (
          <div
            key={p.segment}
            className={cn(
              "flex flex-col gap-2 rounded-md border border-line bg-canvas-2 p-6"
            )}
          >
            <h3 className="text-base font-semibold text-heading">
              {p.segment}
            </h3>
            <p className="text-sm font-light leading-[1.7] text-body">
              {p.approach}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
