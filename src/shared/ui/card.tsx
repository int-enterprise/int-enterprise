import * as React from "react";
import { cn } from "@/shared/lib";

/**
 * 카드. 스킬: 소프트 섀도우 + 하이라이트로 입체감. 모서리 12~24px.
 * 흰 배경 위에서는 그림자로 띄우고(Card), 그라디언트/이미지 위에서는 글래스(GlassCard).
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** hover 시 살짝 떠오름 (ease-out, translateY) — 링크·클릭 카드에만 */
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-line bg-card p-7 shadow-soft",
        interactive &&
          "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lift",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/** 그라디언트/이미지 위에 얹는 유리 카드. */
export const GlassCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass rounded-lg p-7",
        interactive &&
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
        className
      )}
      {...props}
    />
  )
);
GlassCard.displayName = "GlassCard";

/** 다크(Navy 그라디언트) 위에 얹는 유리 카드. */
export const GlassCardDark = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass-dark rounded-lg p-7",
        interactive &&
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
        className
      )}
      {...props}
    />
  )
);
GlassCardDark.displayName = "GlassCardDark";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-[1.35] text-heading", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base font-light leading-[1.7] text-body", className)}
    {...props}
  />
));
CardText.displayName = "CardText";
