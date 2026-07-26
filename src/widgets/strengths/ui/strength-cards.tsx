import { Section } from "@/shared/ui";
import { differences, proofMetric } from "@/entities/company";

/**
 * 차별점.
 *
 * 카드 3장에 문단을 채우던 형식을 버렸다. "차별점"은 무엇과 다른지를 나란히 놓을 때만
 * 성립하고, 문단으로 풀면 자랑이 되면서 길어진다. 그래서 **대조표 한 장**으로 끝낸다.
 * 오른쪽 열(우리)만 배경을 깔아 시선이 그쪽으로 떨어지게 한다.
 *
 * 아래 지표 밴드는 대조표가 주장에 그치지 않도록 받치는 **숫자 하나**다.
 * 큰 모노 숫자 자체가 이 구간의 시각 요소다 — 아이콘 행은 바로 위 섹션이 이미 쓰고 있다.
 */
const ROW = "sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.15fr)]";

export function StrengthCards() {
  return (
    <Section rhythm="large">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Why int.
        </p>
        <h2 className="text-[2rem] leading-[1.16] tracking-[-0.03em] text-display sm:text-[2.6rem]">
          차별점
        </h2>
      </div>

      <div className="mt-12 overflow-hidden rounded-lg border border-line">
        <div
          className={`hidden border-b border-line bg-canvas-2 sm:grid ${ROW}`}
        >
          <span aria-hidden />
          <span className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-faint">
            보통의 AI 개발사
          </span>
          <span className="bg-navy-10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-display">
            (주)인트
          </span>
        </div>

        <dl className="flex flex-col">
          {differences.map((d) => (
            <div
              key={d.aspect}
              className={`grid border-t border-line first:border-t-0 sm:border-t sm:first:border-t-0 ${ROW}`}
            >
              <dt className="px-6 pb-1 pt-6 text-sm text-faint sm:py-7">
                {d.aspect}
              </dt>
              <dd className="px-6 pb-3 text-base font-light text-subtle sm:py-7">
                {d.typical}
              </dd>
              <dd className="bg-navy-10 px-6 py-5 text-base font-bold leading-[1.5] text-display sm:py-7">
                {d.ours}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ⚠️ 어둡게 칠하지 않는다 — 바로 아래 CTA가 이미 짙은 그라디언트 패널이다.
          두 개가 붙으면 페이지 끝이 무거워진다. 여기선 큰 숫자 자체가 시각 요소다. */}
      <div className="mt-10 grid items-center gap-6 rounded-lg border border-line bg-canvas-2 px-8 py-10 sm:grid-cols-[auto_1fr] sm:gap-14 sm:px-12">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[3rem] font-bold leading-none tracking-[-0.03em] text-display sm:text-[4rem]">
            {proofMetric.value}
          </p>
          <p className="text-sm font-semibold text-subtle">
            {proofMetric.label}
          </p>
        </div>
        <p className="max-w-[48ch] text-base font-light leading-[1.75] text-body">
          {proofMetric.note}
        </p>
      </div>
    </Section>
  );
}
