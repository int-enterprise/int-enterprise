import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

/**
 * 버튼. 스킬: 각진 것과 pill을 섞어 단조로움을 피한다.
 * 기본 CTA는 radius-sm(12px), pill 변형은 헤더 등에.
 * hover 시 살짝 떠오르는 마이크로 인터랙션(ease-out).
 * 포인트 컬러는 절제 — primary=Navy, accent=Teal(도형 채움엔 검정 텍스트).
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "rounded-sm font-semibold",
    "transition-[transform,background-color,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link",
    "disabled:pointer-events-none disabled:opacity-40",
    "hover:-translate-y-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-primary text-gray-0 shadow-soft hover:bg-primary-hover hover:shadow-lift",
        accent: "bg-accent text-navy-40 shadow-soft hover:shadow-glow",
        outline:
          "border border-line-strong bg-canvas text-heading hover:border-primary",
        ghost: "text-heading hover:bg-canvas-2 hover:translate-y-0",
        onDark:
          "border border-gray-0/25 bg-gray-0/10 text-gray-0 backdrop-blur hover:bg-gray-0/20",
        link: "h-auto translate-y-0 rounded-none px-0 text-link underline-offset-4 hover:translate-y-0 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-[54px] px-7 text-base",
        icon: "h-11 w-11 px-0",
      },
      pill: { true: "rounded-pill", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", pill: false },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pill, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, pill }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
