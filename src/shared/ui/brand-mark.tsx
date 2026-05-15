import { cn } from "@/shared/lib";

type MarkSize = "xs" | "sm" | "md" | "lg" | "xl" | "display";

/**
 * tone:
 *  - "ink"   : 검정 배경 외 모든 곳. 글자=잉크, 도트=민트 (브랜드 가이드 기본형)
 *  - "mint"  : 검정 배경. 글자=민트, 도트=민트 (배경이 검은색이면 글자도 민트)
 *  - "white" : 검정 배경에서 보조 사용. 글자=흰색, 도트=민트
 */
type Tone = "ink" | "mint" | "white";

interface BrandMarkProps {
  label?: "int" | "turing";
  size?: MarkSize;
  tone?: Tone;
  className?: string;
  as?: React.ElementType;
}

const sizeMap: Record<MarkSize, string> = {
  xs: "text-lg",
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-4xl sm:text-5xl",
  xl: "text-5xl sm:text-6xl lg:text-7xl",
  display: "text-6xl sm:text-7xl lg:text-8xl",
};

const toneText: Record<Tone, string> = {
  ink: "text-ink",
  mint: "text-mint",
  white: "text-white",
};

export function BrandMark({
  label = "int",
  size = "md",
  tone = "ink",
  className,
  as: Comp = "span",
}: BrandMarkProps) {
  return (
    <Comp
      className={cn(
        "brand-mark",
        sizeMap[size],
        toneText[tone],
        className
      )}
      aria-label={`${label}.`}
    >
      {label}
      <span className="brand-dot">.</span>
    </Comp>
  );
}
