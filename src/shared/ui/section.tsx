import * as React from "react";
import { cn } from "@/shared/lib";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  bleed?: boolean;
  surface?: "white" | "soft" | "ink";
}

const surfaceMap = {
  white: "bg-background",
  soft: "bg-surface",
  ink: "bg-ink text-white",
} as const;

export function Section({
  id,
  className,
  bleed,
  surface = "white",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-24 sm:py-32",
        surfaceMap[surface],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          bleed ? "w-full" : "mx-auto w-full max-w-6xl px-6 sm:px-8"
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  invert,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 max-w-3xl",
        align === "center" && "items-center text-center mx-auto"
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em]",
            invert ? "text-mint" : "text-mint-deep"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              invert ? "bg-mint" : "bg-mint"
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]",
          invert ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            invert ? "text-white/70" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
