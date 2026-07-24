import * as React from "react";
import { cn } from "@/shared/lib";

/** 입력 필드도 12px 라운드. 보더가 아니라 옅은 채움 + 1px 링으로 만든다. */
const control = [
  "w-full rounded-sm bg-canvas-2 px-4 text-base text-heading",
  "shadow-[inset_0_0_0_1px_rgba(4,4,74,0.08)]",
  "placeholder:text-faint",
  "transition-shadow duration-200",
  "focus-visible:shadow-[inset_0_0_0_2px_var(--color-primary)] focus-visible:outline-none",
  "aria-[invalid=true]:shadow-[inset_0_0_0_1px_var(--color-rose-30)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(control, "h-12", className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(control, "min-h-36 resize-y py-3 leading-7", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium text-heading", className)}
    {...props}
  />
));
Label.displayName = "Label";

export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2 text-left", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className="ml-1 text-rose-30" aria-hidden>
            *
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p className="text-sm text-rose-30">{error}</p>
      ) : hint ? (
        <p className="text-sm text-subtle">{hint}</p>
      ) : null}
    </div>
  );
}
