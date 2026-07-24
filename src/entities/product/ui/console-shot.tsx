import Image from "next/image";
import { cn } from "@/shared/lib";

const SRC = "/turing/console.png";
const W = 1440;
const H = 1030;

/**
 * turing. 콘솔 전체 화면.
 * 화면 자체가 흰 배경이라 그냥 얹으면 페이지에 녹는다.
 * 뒤에 광원을 깔고 1px 링 + 그림자로 "떠 있는 화면"으로 읽히게 한다.
 */
export function ConsoleShot({
  className,
  priority,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 bottom-4 top-12 -z-10 rounded-[48px] blur-[64px]"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 45%, rgba(64,224,208,0.45), rgba(4,4,74,0.16) 62%, transparent 100%)",
        }}
      />
      <div className="overflow-hidden rounded-lg bg-canvas p-1.5 shadow-[0_0_0_1px_var(--color-line),0_28px_70px_-28px_rgba(4,4,74,0.4)]">
        <Image
          src={SRC}
          alt="turing. 콘솔 화면 — 프로젝트별 Agent 운영 상태와 리소스 그룹 현황, 누적 평가 횟수를 보여 준다."
          width={W}
          height={H}
          sizes="(max-width: 1200px) 100vw, 1160px"
          priority={priority}
          className="w-full rounded-[10px]"
        />
      </div>
    </figure>
  );
}

/**
 * 콘솔 화면에서 잘라 쓸 영역들.
 * 원본(1440×1030) 좌표계 기준이다. 스크린샷을 교체하면 이 값을 다시 잡아야 한다.
 */
const REGIONS = {
  /** 좌측 내비게이션 전체 */
  nav: { x: 8, y: 8, w: 200, h: 360 },
  /** 프로젝트 헤더 — 이름·설명·누적 평가 횟수 */
  project: { x: 270, y: 70, w: 1120, h: 110 },
  /** Agent 카드 3개가 늘어선 줄 */
  agents: { x: 280, y: 270, w: 1090, h: 300 },
  /** Agent 카드 한 장 */
  agent: { x: 285, y: 275, w: 355, h: 300 },
  /** 운영 리소스 그룹 현황 */
  resources: { x: 300, y: 525, w: 330, h: 240 },
  /** CPU·메모리 사용률 바 */
  usage: { x: 300, y: 790, w: 330, h: 125 },
} as const;

export type ConsoleRegion = keyof typeof REGIONS;

/**
 * 콘솔의 특정 영역만 창처럼 잘라 보여 준다.
 * 좌표를 감으로 찍지 않고 위 REGIONS 표에서 가져오므로 결과가 예측 가능하다.
 *
 * 카드 안에서는 텍스트와 겹치지 않도록 항상 한쪽에 붙여 놓고,
 * 카드 밖으로 흘려보내 "더 있다"를 암시한다.
 */
export function ConsoleWindow({
  region,
  scale = 1,
  className,
}: {
  region: ConsoleRegion;
  scale?: number;
  className?: string;
}) {
  const r = REGIONS[region];
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none select-none overflow-hidden rounded-[10px] bg-canvas shadow-[0_0_0_1px_var(--color-line),0_18px_40px_-22px_rgba(4,4,74,0.3)]",
        className
      )}
      style={{ width: r.w * scale, height: r.h * scale }}
    >
      <div
        className="relative"
        style={{ width: r.w * scale, height: r.h * scale }}
      >
        <Image
          src={SRC}
          alt=""
          width={W}
          height={H}
          sizes="1440px"
          className="absolute max-w-none"
          style={{
            width: W * scale,
            left: -r.x * scale,
            top: -r.y * scale,
          }}
        />
      </div>
    </div>
  );
}
