import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib";
import { images, type ImageKey } from "@/shared/assets/images";

export interface PageHeaderCrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: PageHeaderCrumb[];
  image?: ImageKey;
  align?: "left" | "center";
  surface?: "white" | "mist" | "ink";
}

const surfaceMap = {
  white: "bg-background",
  mist: "bg-gradient-to-b from-mint-mist to-background",
  ink: "bg-ink text-white",
} as const;

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  align = "left",
  surface = "mist",
}: PageHeaderProps) {
  const invert = surface === "ink";
  const img = image ? images[image] : null;

  return (
    <section
      className={cn(
        "relative isolate w-full pt-16 pb-12 sm:pt-24 sm:pb-20",
        surfaceMap[surface]
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-5 sm:px-8",
          align === "center" && "text-center"
        )}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "mb-6 flex flex-wrap items-center gap-1.5 text-xs",
              align === "center" && "justify-center",
              invert ? "text-white/60" : "text-muted"
            )}
          >
            {breadcrumbs.map((c, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span key={idx} className="inline-flex items-center gap-1.5">
                  {c.href && !isLast ? (
                    <Link
                      href={c.href}
                      className={cn(
                        invert ? "hover:text-white" : "hover:text-ink"
                      )}
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        isLast && (invert ? "text-white" : "text-ink")
                      )}
                    >
                      {c.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="h-3.5 w-3.5" />}
                </span>
              );
            })}
          </nav>
        )}

        <div
          className={cn(
            "grid gap-10 lg:items-center",
            img ? "lg:grid-cols-[1.2fr_1fr]" : ""
          )}
        >
          <div
            className={cn(
              "flex max-w-3xl flex-col gap-5",
              align === "center" && "mx-auto items-center"
            )}
          >
            {eyebrow && (
              <span
                className={cn(
                  "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
                  invert ? "text-mint" : "text-mint-deep"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                {eyebrow}
              </span>
            )}
            <h1
              className={cn(
                "text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] leading-[1.1]",
                invert ? "text-white" : "text-ink"
              )}
            >
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  "text-base leading-relaxed sm:text-lg",
                  invert ? "text-white/70" : "text-muted-strong"
                )}
              >
                {description}
              </p>
            )}
          </div>

          {img && (
            <div className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-surface lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
