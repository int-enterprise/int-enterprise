import { Blob, Eyebrow, ProductMark, Section } from "@/shared/ui";
import { DecayChart, loopStages, product, turing } from "@/entities/product";

/**
 * turing. 쇼케이스.
 *
 * ⚠️ 여기에 콘솔 화면을 다시 넣지 않는다 — 페이지 상단에서 이미 한 번 보여 준다.
 * 같은 이미지를 두 번 쓰면 화면이 늘어나기만 하고 새로 알려 주는 것이 없다.
 *
 * 대신 시각 주인공은 **성능 곡선 그래프**다. "떨어지기 전에 되돌린다"는 문장을
 * 열 줄 쓰는 것보다 내려가는 선과 되돌아오는 선을 나란히 두는 편이 빠르다.
 */
export function TuringBlock() {
  return (
    <Section rhythm="large" id="turing" className="relative">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>
            <ProductMark name={turing.name} />
            <span className="text-subtle"> — {turing.role}</span>
          </Eyebrow>
          <h2 className="text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-display sm:text-[2.75rem]">
            평가부터 복구까지
            <br />
            끊기지 않는 하나의 루프
          </h2>
          <p className="max-w-[42ch] text-lg font-light leading-[1.7] text-body">
            {product.differentiator}
          </p>
        </div>

        <div className="relative">
          <Blob color="mix" size={480} className="-right-16 -top-16" />
          <div className="relative rounded-lg border border-line bg-card p-7 shadow-soft sm:p-9">
            <DecayChart />
          </div>
        </div>
      </div>

      {/* 5단계 루프 — 이름과 한 줄만. 자세한 설명은 붙이지 않는다. */}
      <ol className="mt-20 border-t border-line">
        {loopStages.map((s) => (
          <li
            key={s.key}
            className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 border-b border-line py-6 sm:grid-cols-[auto_minmax(0,240px)_1fr] sm:gap-x-10"
          >
            <span className="font-mono text-sm font-semibold text-accent">
              {s.step}
            </span>
            <h3 className="text-xl font-bold tracking-[-0.02em] text-heading">
              {s.agent}
            </h3>
            <p className="col-start-2 text-base font-light leading-[1.7] text-body sm:col-start-3">
              {s.summary}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
