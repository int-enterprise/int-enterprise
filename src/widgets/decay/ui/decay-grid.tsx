import { Blob, Card, Section, SectionHeader } from "@/shared/ui";
import { decayAxes, product } from "@/entities/product";

/**
 * 성능열화 6개 축.
 * 각 카드에 큰 모노 번호를 배경 그래픽으로 깔아 활자 자체를 시각 요소로 쓴다.
 */
export function DecayGrid({ heading }: { heading?: string }) {
  return (
    <Section rhythm="large" soft className="relative overflow-hidden">
      <Blob color="teal" size={420} className="right-[-100px] top-[60px]" />

      <SectionHeader
        eyebrow="The problem"
        title={heading ?? product.tagline}
        description={product.statusQuo.body}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {decayAxes.map((axis) => (
          <Card
            key={axis.no}
            className="relative overflow-hidden p-7"
            interactive
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-3 -top-6 font-mono text-[6rem] font-bold leading-none text-navy-40/[0.06]"
            >
              {axis.no}
            </span>
            <div className="relative flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-heading">
                {axis.title}
              </h3>
              <p className="text-sm font-light leading-[1.7] text-body">
                {axis.body}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
