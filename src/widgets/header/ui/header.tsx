"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandMark, Button } from "@/shared/ui";
import { navItems } from "@/shared/config";
import { cn } from "@/shared/lib";
import { NavItemDesktop } from "./nav-item-desktop";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white border-b transition-shadow",
        scrolled ? "border-border shadow-sm" : "border-border-soft"
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link href="/" aria-label="int. 홈으로" className="flex items-center">
          <BrandMark size="md" />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="주 메뉴"
        >
          {navItems
            .filter((n) => !n.cta)
            .map((item) => (
              <NavItemDesktop key={item.href} item={item} />
            ))}
        </nav>

        <div className="hidden lg:flex">
          <Button asChild size="sm" variant="primary">
            <Link href="/contact">문의하기</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="메뉴 열기"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-ink lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
