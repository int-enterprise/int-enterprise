"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { BrandMark, Button } from "@/shared/ui";

const MOBILE_NAV_LABEL = "font-black tracking-[-0.04em] text-xl";
import { navItems } from "@/shared/config";
import { cn } from "@/shared/lib";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
    >
      <div className="flex items-center justify-between border-b border-border-soft px-5 py-3">
        <Link href="/" onClick={onClose}>
          <BrandMark size="md" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="메뉴 닫기"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-6">
        <ul className="flex flex-col gap-1">
          {navItems
            .filter((n) => !n.cta)
            .map((item) => (
              <MobileNavGroup key={item.href} item={item} onClose={onClose} />
            ))}
        </ul>
      </nav>

      <div className="border-t border-border-soft p-5">
        <Button asChild size="lg" className="w-full">
          <Link href="/contact" onClick={onClose}>
            문의하기
          </Link>
        </Button>
      </div>
    </div>
  );
}

function MobileNavGroup({
  item,
  onClose,
}: {
  item: (typeof navItems)[number];
  onClose: () => void;
}) {
  const [expanded, setExpanded] = React.useState(false);

  const isBrandItem = item.highlight && item.label === "turing.";

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onClose}
          className="block rounded-2xl px-4 py-4 text-ink hover:bg-muted-soft"
        >
          {isBrandItem ? (
            <BrandMark size="sm" label="turing" />
          ) : (
            <span className={MOBILE_NAV_LABEL}>{item.label}</span>
          )}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-ink hover:bg-muted-soft"
      >
        <span className={MOBILE_NAV_LABEL}>{item.label}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>
      {expanded && (
        <ul className="mt-1 flex flex-col gap-0.5 border-l border-border pl-4">
          {item.children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                onClick={onClose}
                className="block rounded-xl px-4 py-3 text-base text-muted-strong hover:bg-muted-soft hover:text-ink"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
