import { cn } from "@/shared/lib";
import { ProductMark } from "@/shared/ui";

/**
 * turing.이 무엇을 하는지 한 장으로 보여 주는 그래프.
 *
 * 문장으로 "성능이 떨어지기 전에 되돌린다"고 열 줄 쓰는 것보다,
 * **내려가는 회색 곡선**과 **떨어질 때마다 되돌아오는 틸 선**을 나란히 두는 편이 빠르다.
 *
 * ⚠️ **SVG 안에 글자를 넣지 않는다.**
 * viewBox로 그린 그림은 컨테이너 폭에 맞춰 통째로 축소된다. 390px 화면에서는 배율이 0.5라
 * `text-[15px]`로 적어도 7.8px로 찍힌다(측정해서 확인했다) — 프로젝트 최소치 17px의 절반이다.
 * 그래서 축 이름·임계선 이름·범례는 전부 **SVG 밖 HTML**로 뺐다. 그림은 선만 그린다.
 *
 * 값은 실측 데이터가 아니라 **개념 도해**다. 눈금 숫자를 넣지 않는 이유가 이것이다.
 * (수치를 넣으면 측정 결과처럼 읽힌다 — entities는 사실만 적는다)
 */
const W = 480;
const H = 300;
const X0 = 16;
const X1 = 464;
const BASE = 250;
/** 고객이 알아채는 지점 */
const THRESHOLD = 176;

/** 그대로 두면 — 완만하게 시작해 가팔라진다 */
const DECAY = `M ${X0} 40 C 150 62, 270 116, ${X1} 236`;

/** turing. 적용 — 흔들릴 때마다 되돌아온다 */
const RECOVER_POINTS: readonly [number, number][] = [
  [X0, 40],
  [110, 84],
  [148, 44],
  [230, 92],
  [268, 46],
  [350, 96],
  [388, 48],
  [X1, 54],
];
const RECOVER = RECOVER_POINTS.map(
  ([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`
).join(" ");
/** 되돌린 지점만 점을 찍는다 */
const RECOVERED = RECOVER_POINTS.filter((_, i) => i % 2 === 0 && i > 0);

function Legend({
  swatch,
  children,
}: {
  swatch: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-2.5 text-sm text-subtle">
      {swatch}
      {children}
    </span>
  );
}

export function DecayChart({ className }: { className?: string }) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <p className="text-sm text-faint">성능</p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="운영 기간이 길어질수록 AI 성능은 떨어지고, 방치하면 고객이 알아채는 수준까지 내려갑니다. turing.을 적용하면 흔들릴 때마다 성능이 되돌아옵니다."
      >
        {[24, 92, 160, 228].map((y) => (
          <line
            key={y}
            x1={X0}
            x2={X1}
            y1={y}
            y2={y}
            stroke="var(--color-line)"
            strokeWidth={1.5}
          />
        ))}

        <line
          x1={X0}
          x2={X1}
          y1={THRESHOLD}
          y2={THRESHOLD}
          stroke="var(--color-rose-30)"
          strokeWidth={2}
          strokeDasharray="6 7"
          opacity={0.6}
        />

        <path
          d={DECAY}
          fill="none"
          stroke="var(--color-gray-40)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="8 8"
        />

        <path
          d={RECOVER}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {RECOVERED.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={6}
            fill="var(--color-canvas)"
            stroke="var(--color-accent)"
            strokeWidth={3}
          />
        ))}

        <line
          x1={X0}
          x2={X1}
          y1={BASE}
          y2={BASE}
          stroke="var(--color-line-strong)"
          strokeWidth={1.5}
        />
      </svg>

      <p className="text-right text-sm text-faint">운영 기간 →</p>

      <figcaption className="mt-3 flex flex-col gap-2.5 border-t border-line pt-5 sm:flex-row sm:flex-wrap sm:gap-x-7">
        <Legend
          swatch={
            <span aria-hidden className="h-[3px] w-7 shrink-0 rounded-full bg-accent" />
          }
        >
          <ProductMark name="turing." className="text-sm" />
          &nbsp;적용
        </Legend>
        <Legend
          swatch={
            <span
              aria-hidden
              className="w-7 shrink-0 border-t-[3px] border-dashed border-gray-40"
            />
          }
        >
          그대로 두면
        </Legend>
        <Legend
          swatch={
            <span
              aria-hidden
              className="w-7 shrink-0 border-t-2 border-dashed border-rose-30 opacity-70"
            />
          }
        >
          고객이 알아채는 지점
        </Legend>
      </figcaption>
    </figure>
  );
}
