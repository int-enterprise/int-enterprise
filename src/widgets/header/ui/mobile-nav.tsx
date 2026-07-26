"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { BrandMark, Button, ProductMark } from "@/shared/ui";
import { company } from "@/entities/company";
import { ctaNav, navItems } from "@/shared/config";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  React.useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="사이트 메뉴"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas lg:hidden"
    >
      <div className="flex h-20 shrink-0 items-center justify-between px-6">
        <BrandMark size="md" />
        <button
          type="button"
          onClick={onClose}
          aria-label="메뉴 닫기"
          className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line bg-canvas text-heading"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <nav aria-label="주 메뉴" className="flex flex-1 flex-col gap-2 px-6 pt-4">
        {navItems.map((item) => (
          <div key={item.href} className="flex flex-col">
            <Link
              href={item.href}
              onClick={onClose}
              className="flex flex-col gap-1 rounded-md px-4 py-4 transition-colors hover:bg-canvas-2"
            >
              <span className="flex items-center justify-between text-xl text-heading">
                {item.label}
                <ArrowRight className="h-5 w-5 text-faint" aria-hidden />
              </span>
            </Link>

            {item.children ? (
              <ul className="mb-2 ml-4 flex flex-col border-l border-line pl-4">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={onClose}
                      className="block rounded-sm px-3 py-2.5 text-base text-body transition-colors hover:bg-canvas-2 hover:text-heading"
                    >
                      {child.mark ? (
                        <ProductMark name={child.label} />
                      ) : (
                        child.label
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </nav>

      <div className="flex shrink-0 flex-col gap-4 px-6 pb-10 pt-6">
        <Button asChild size="lg">
          <Link href={ctaNav.href} onClick={onClose}>
            {ctaNav.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
        <a
          href={`mailto:${company.contact.email}`}
          className="text-sm text-subtle"
        >
          {company.contact.email}
        </a>
      </div>
    </div>
  );
}
