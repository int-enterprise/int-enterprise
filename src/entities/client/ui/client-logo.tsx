"use client";

import * as React from "react";
import { cn } from "@/shared/lib";
import type { Client } from "../model/clients";

interface ClientLogoProps {
  client: Client;
  className?: string;
  variant?: "card" | "pill" | "compact";
}

const sizeMap = {
  pill: "h-20 min-w-[200px] px-8",
  card: "h-28 w-full px-8",
  compact: "h-16 w-full px-5",
} as const;

export function ClientLogo({
  client,
  className,
  variant = "pill",
}: ClientLogoProps) {
  const [errored, setErrored] = React.useState(false);
  const showImage = Boolean(client.logoUrl) && !errored;
  const label = client.enName ?? client.name;

  return (
    <div
      className={cn(
        "group flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-border bg-white transition-all hover:border-ink/30 hover:shadow-[0_8px_28px_rgba(10,10,10,0.05)]",
        sizeMap[variant],
        className
      )}
      title={client.name}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.logoUrl}
          alt={`${client.name} 로고`}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-auto select-none object-contain opacity-95 transition-all group-hover:opacity-100",
            variant === "card" ? "max-h-14" : "max-h-10"
          )}
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-base font-semibold tracking-[-0.01em] text-ink">
          {label}
        </span>
      )}
    </div>
  );
}
