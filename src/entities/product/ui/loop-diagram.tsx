import { cn } from "@/shared/lib";
import { loopStages } from "../model/product";

const SIZE = 380;
const CENTER = SIZE / 2;
const RADIUS = 138;
const NODE = 30;

/** 12시 방향에서 시작해 시계 방향으로 균등 배치 */
function nodePosition(index: number, total: number) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

/**
 * turing.의 운영 루프를 하나의 그림으로 보여 준다.
 * 이 사이트에는 스크롤 리빌이 없으므로, 이 다이어그램의 자동 루프가
 * 히어로를 계속 살아 있게 만드는 역할을 한다. 전부 CSS keyframe이라 서버 컴포넌트다.
 */
export function LoopDiagram({ className }: { className?: string }) {
  const total = loopStages.length;

  return (
    <div className={cn("relative w-full max-w-[420px]", className)}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`turing. 운영 루프: ${loopStages
          .map((s) => s.en)
          .join(" → ")} 순으로 순환합니다.`}
      >
        {/* 바깥 궤도 */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={1}
        />
        {/* 흐르는 점선 */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          className="animate-dash"
          stroke="var(--color-accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="2 22"
        />

        {loopStages.map((stage, i) => {
          const { x, y } = nodePosition(i, total);
          return (
            <g key={stage.key}>
              {/* 노드에서 퍼지는 파동 — 순서대로 지연 */}
              <circle
                cx={x}
                cy={y}
                r={NODE}
                fill="var(--color-accent)"
                opacity={0.28}
                className="animate-pulse-ring"
                style={{
                  animationDelay: `${i * 0.55}s`,
                  transformOrigin: `${x}px ${y}px`,
                }}
              />
              <circle
                cx={x}
                cy={y}
                r={NODE}
                fill="var(--color-canvas)"
                stroke="var(--color-line)"
                strokeWidth={1}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill="var(--color-heading)"
                className="text-[15px]"
              >
                {stage.step}
              </text>
              <text
                x={x}
                y={y + NODE + 20}
                textAnchor="middle"
                fill="var(--color-subtle)"
                className="text-[12px] uppercase"
              >
                {stage.en}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 중심 — 제품 워드마크 */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5">
        <span className="text-3xl text-heading">turing.</span>
        <span className="text-[11px] uppercase tracking-[0.18em] text-faint">
          Always on
        </span>
      </div>
    </div>
  );
}
