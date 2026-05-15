import * as React from "react";
import { cn } from "@/shared/lib";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-xs font-medium text-ink-soft tracking-wide uppercase",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";
