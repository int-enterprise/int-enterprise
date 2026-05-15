import * as React from "react";
import { cn } from "@/shared/lib";

type Variant = "default" | "mint" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  default: "bg-ink/5 text-ink",
  mint: "bg-mint-soft text-mint-deep",
  outline: "border border-ink/20 text-ink-soft",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
