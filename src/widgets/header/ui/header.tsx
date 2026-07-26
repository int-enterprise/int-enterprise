"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { BrandMark, Button, ProductMark } from "@/shared/ui";
import { ctaNav, navItems } from "@/shared/config";
import { cn } from "@/shared/lib";
import { MobileNav } from "./mobile-nav";

/**
 * sticky 알약 헤더.
 * 화면 위에 떠 있는 크롬이므로 pill 반경을 쓴다 — 콘텐츠 CTA와 구분되는 지점.
 * 스크롤 전에는 배경이 없고, 내려가면 반투명 배경 + 1px 링이 켜진다.
 *
 * 하위 메뉴는 상태 없이 CSS로만 연다(hover + focus-within).
 * 키보드로 Tab 해 들어가면 focus-within으로 같이 열린다.
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
          "flex h-16 items-center justify-between gap-6 rounded-pill pl-6 pr-2",
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
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center gap-1.5 rounded-pill px-4 text-sm font-medium transition-colors",
                    active ? "text-heading" : "text-subtle hover:text-heading"
                  )}
                >
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      className="h-4 w-4 text-faint transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden
                    />
                  ) : null}
                </Link>

                {item.children ? (
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3",
                      "pointer-events-none opacity-0 transition-opacity duration-200",
                      "group-hover:pointer-events-auto group-hover:opacity-100",
                      "group-focus-within:pointer-events-auto group-focus-within:opacity-100"
                    )}
                  >
                    <ul className="w-[180px] rounded-md border border-line bg-canvas/95 p-2 shadow-lift backdrop-blur-2xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          {/* ⚠️ 설명 문구를 붙이지 않는다. 메뉴는 이름만 있으면 된다. */}
                          <Link
                            href={child.href}
                            className="block rounded-sm px-3.5 py-2.5 text-sm font-medium text-body transition-colors hover:bg-canvas-2 hover:text-heading"
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
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="md" className="hidden rounded-pill lg:inline-flex">
            <Link href={ctaNav.href}>{ctaNav.label}</Link>
          </Button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line bg-canvas text-heading shadow-soft transition-colors hover:bg-canvas-2 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </nav>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
