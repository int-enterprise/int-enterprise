import Image from "next/image";
import { cn } from "@/shared/lib";

/**
 * int. 워드마크.
 *
 * ⚠️ 로고는 Pretendard가 아니라 별도 지오메트릭 워드마크다.
 * (i의 점이 원형, t의 종단이 평평하다 — 본문 폰트로 흉내 낼 수 없다)
 * 반드시 이 컴포넌트로만 표기하고, CSS로 글자를 그려 대신하지 않는다.
 *
 * 원본: public/brand/int-logo-raw.png
 * 크롭/화이트 변환: scripts/prepare-logo.mjs
 */
const RATIO = 2987 / 1629;

type Size = "sm" | "md" | "lg" | "xl";

/** 로고의 높이(px). 폭은 비율로 계산한다. */
const heights: Record<Size, number> = {
  sm: 18,
  md: 24,
  lg: 34,
  xl: 52,
};

export function BrandMark({
  size = "md",
  tone = "ink",
  className,
}: {
  size?: Size;
  /** 다크 배경에서는 "white" — 글자만 흰색으로 바뀌고 틸 점은 유지된다. */
  tone?: "ink" | "white";
  className?: string;
}) {
  const h = heights[size];
  const w = Math.round(h * RATIO);
  const src =
    tone === "white" ? "/brand/int-logo-white.png" : "/brand/int-logo.png";

  // ⚠️ 폭·높이를 둘 다 인라인으로 고정한다.
  // `w-auto`로 두면 flex column(align-items: stretch) 안에서 컨테이너 폭까지 늘어나
  // 워드마크가 가로로 찌그러진다(푸터에서 실제로 그랬다).
  return (
    <Image
      src={src}
      alt="int."
      width={w}
      height={h}
      priority
      className={cn("max-w-none shrink-0 select-none", className)}
      style={{ width: w, height: h }}
    />
  );
}
