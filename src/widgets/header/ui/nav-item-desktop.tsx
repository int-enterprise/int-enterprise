"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib";
import { BrandMark } from "@/shared/ui";
import type { NavItem } from "@/shared/config";

interface NavItemDesktopProps {
  item: NavItem;
}

// 모든 nav 아이템은 turing. 브랜드마크와 동일한 타이포 톤
// (Pretendard Black 900, tight tracking)으로 통일.
const NAV_LABEL =
  "font-black tracking-[-0.04em] text-[15px] leading-none";

export function NavItemDesktop({ item }: NavItemDesktopProps) {
  const pathname = usePathname();
  const active =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(item.href + "/"));

  const isBrandItem = item.highlight && item.label === "turing.";

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "rounded-full px-4 py-2 transition-colors",
          active ? "text-ink" : "text-muted-strong hover:text-ink"
        )}
      >
        {isBrandItem ? (
          <BrandMark size="xs" label="turing" />
        ) : (
          <span className={NAV_LABEL}>{item.label}</span>
        )}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-4 py-2 transition-colors",
          active ? "text-ink" : "text-muted-strong group-hover:text-ink"
        )}
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <span className={NAV_LABEL}>{item.label}</span>
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
      </button>

      <div
        role="menu"
        className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-0 opacity-0 pt-3 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="min-w-[260px] rounded-2xl border border-border bg-white p-2 shadow-[0_24px_60px_rgba(10,10,10,0.10)]">
          {item.children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={cn(
                "flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-mint-mist",
                pathname === c.href && "bg-mint-pale"
              )}
            >
              <span className="text-sm font-semibold text-ink">{c.label}</span>
              {c.description && (
                <span className="text-xs text-muted">{c.description}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
