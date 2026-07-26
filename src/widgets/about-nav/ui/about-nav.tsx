"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/shared/ui";
import { navItems } from "@/shared/config";
import { cn } from "@/shared/lib";

/**
 * 기업소개 하위 탭.
 *
 * 인사말·기업연혁·팀·오시는 길은 **각각 독립된 페이지**다(한 페이지에 앵커로 쌓지 않는다).
 * 그래서 페이지 사이를 오갈 수단이 본문 안에 있어야 한다 — 헤더 드롭다운만으로는 불편하다.
 *
 * 항목은 `navItems`의 기업소개 children에서 가져온다. 메뉴와 이 탭이 갈라지지 않게.
 */
const about = navItems.find((n) => n.href.startsWith("/about"));

export function AboutNav() {
  const pathname = usePathname();
  const items = about?.children ?? [];

  return (
    <nav aria-label="기업소개 메뉴" className="border-b border-line">
      <Container>
        <ul className="-mb-px flex gap-1 overflow-x-auto">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-14 items-center whitespace-nowrap border-b-2 px-4 text-base transition-colors sm:px-5",
                    active
                      ? "border-primary font-semibold text-heading"
                      : "border-transparent text-subtle hover:text-heading"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
