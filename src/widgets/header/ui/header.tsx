"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { BrandMark, Button } from "@/shared/ui";
import { ctaNav, navItems } from "@/shared/config";
import { cn } from "@/shared/lib";
import { MobileNav } from "./mobile-nav";

/**
 * sticky 알약 헤더.
 * 화면 위에 떠 있는 크롬이므로 pill 반경을 쓴다 — 콘텐츠 CTA와 구분되는 지점.
 * 스크롤 전에는 배경이 없고, 내려가면 반투명 배경 + 1px 링이 켜진다.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-[1220px] px-4 sm:top-6 sm:px-6">
      <nav
        aria-label="주 메뉴"
        className={cn(
          "flex h-14 items-center justify-between gap-6 rounded-pill pl-6 pr-2",
          "transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled
            ? "bg-canvas/70 shadow-soft backdrop-blur-2xl [border:1px_solid_var(--color-line)]"
            : "bg-transparent"
        )}
      >
        <Link href="/" aria-label="홈으로" className="flex items-center">
          <BrandMark size="md" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-pill px-3.5 text-sm font-medium transition-colors",
                    active
                      ? "text-heading"
                      : "text-subtle hover:text-heading"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-pill lg:inline-flex">
            <Link href={ctaNav.href}>{ctaNav.label}</Link>
          </Button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-canvas text-heading shadow-soft transition-colors hover:bg-canvas-2 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </nav>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
