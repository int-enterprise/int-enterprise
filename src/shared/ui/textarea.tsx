import * as React from "react";
import { cn } from "@/shared/lib";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-32 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted",
        "focus-visible:outline-none focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-mint/40 transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
