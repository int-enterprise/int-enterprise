import { cn } from "@/shared/lib";
import { ProductMark } from "@/shared/ui";

/**
 * turing.이 무엇을 하는지 한 장으로 보여 주는 그래프.
 *
 * 문장으로 "성능이 떨어지기 전에 되돌린다"고 열 줄 쓰는 것보다,
 * **내려가는 회색 곡선**과 **떨어질 때마다 되돌아오는 틸 선**을 나란히 두는 편이 빠르다.
 * 점선 임계선은 "고객이 알아채는 지점" — 회색 곡선만 그 선을 넘는다.
 *
 * 값은 실측 데이터가 아니라 **개념 도해**다. 축에 눈금 숫자를 넣지 않는 이유가 이것이다.
 * (수치를 넣으면 측정 결과처럼 읽힌다 — entities는 사실만 적는다)
 */
const W = 560;
const H = 320;
const X0 = 56;
const X1 = 512;
const TOP = 44;
const BASE = 250;
/** 고객이 알아채는 지점 */
const THRESHOLD = 178;

/** 그대로 두면 — 완만하게 시작해 가팔라진다 */
const DECAY = `M ${X0} ${TOP + 18} C 180 68, 300 118, ${X1} 232`;

/** turing. 적용 — 흔들릴 때마다 되돌아온다 */
const RECOVER_POINTS: readonly [number, number][] = [
  [X0, TOP + 18],
  [136, 96],
  [172, 64],
  [258, 104],
  [294, 66],
  [380, 108],
  [416, 68],
  [X1, 74],
];
const RECOVER = RECOVER_POINTS.map(
  ([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`
).join(" ");
/** 되돌린 지점만 점을 찍는다 */
const RECOVERED = RECOVER_POINTS.filter((_, i) => i % 2 === 0 && i > 0);

export function DecayChart({ className }: { className?: string }) {
  return (
    <figure className={cn("flex flex-col gap-5", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="운영 기간이 길어질수록 AI 성능은 떨어지고, 방치하면 고객이 알아채는 수준까지 내려갑니다. turing.을 적용하면 흔들릴 때마다 성능이 되돌아옵니다."
      >
        {/* 가로 기준선 — 아주 옅게 */}
        {[TOP, 110, 176, 242].map((y) => (
          <line
            key={y}
            x1={X0}
            x2={X1}
            y1={y}
            y2={y}
            stroke="var(--color-line)"
            strokeWidth={1}
          />
        ))}

        {/* 고객이 알아채는 지점 */}
        <line
          x1={X0}
          x2={X1}
          y1={THRESHOLD}
          y2={THRESHOLD}
          stroke="var(--color-rose-30)"
          strokeWidth={1.5}
          strokeDasharray="5 6"
          opacity={0.55}
        />
        <text
          x={X1}
          y={THRESHOLD - 10}
          textAnchor="end"
          fill="var(--color-rose-30)"
          className="text-[15px]"
        >
          고객이 알아채는 지점
        </text>

        {/* 그대로 두면 */}
        <path
          d={DECAY}
          fill="none"
          stroke="var(--color-gray-40)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="7 7"
        />

        {/* turing. 적용 */}
        <path
          d={RECOVER}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {RECOVERED.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={5}
            fill="var(--color-canvas)"
            stroke="var(--color-accent)"
            strokeWidth={2.5}
          />
        ))}

        {/* 축 */}
        <line
          x1={X0}
          x2={X0}
          y1={TOP - 12}
          y2={BASE}
          stroke="var(--color-line-strong)"
          strokeWidth={1}
        />
        <line
          x1={X0}
          x2={X1}
          y1={BASE}
          y2={BASE}
          stroke="var(--color-line-strong)"
          strokeWidth={1}
        />
        <text
          x={X0 - 10}
          y={TOP - 16}
          textAnchor="end"
          fill="var(--color-faint)"
          className="text-[15px]"
        >
          성능
        </text>
        <text
          x={X1}
          y={BASE + 24}
          textAnchor="end"
          fill="var(--color-faint)"
          className="text-[15px]"
        >
          운영 기간
        </text>
      </svg>

      <figcaption className="flex flex-wrap items-center gap-x-7 gap-y-2">
        <span className="flex items-center gap-2.5 text-sm text-subtle">
          <span aria-hidden className="h-[3px] w-7 rounded-full bg-accent" />
          <ProductMark name="turing." className="text-sm" /> 적용
        </span>
        <span className="flex items-center gap-2.5 text-sm text-subtle">
          <span
            aria-hidden
            className="h-[3px] w-7 rounded-full bg-gray-40 opacity-70"
          />
          그대로 두면
        </span>
      </figcaption>
    </figure>
  );
}
