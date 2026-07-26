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
        {/* 좁은 화면(360px)에서 네 탭이 간신히 들어간다 — 그래서 두 가지를 함께 건다.
            ① 모바일 좌우 패딩을 줄여 우선 다 들어가게 하고,
            ② 그래도 넘치면 **화면 끝까지 이어지는 스크롤 띠**가 되게 한다.
            컨테이너 안쪽에서만 스크롤하면 마지막 탭이 잘린 것처럼 보여 스크롤인 줄 모른다. */}
        <ul className="-mx-5 -mb-px flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-14 min-w-[44px] items-center justify-center whitespace-nowrap border-b-2 px-3 text-base transition-colors sm:px-5",
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
