import {
  BookOpen,
  Clock,
  Cookie,
  GraduationCap,
  House,
  Laptop,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { Container, Section } from "@/shared/ui";
import { benefits, type Benefit } from "@/entities/careers";

/**
 * 복지·지원.
 *
 * 카드가 아니라 **얇은 구분선으로 나눈 아이콘 격자**다.
 * 카드 그림자를 아홉 번 반복하면 무거워지고, 이 페이지의 다른 섹션과도 겹친다.
 * 아이콘은 선 굵기 1.25로 가늘게 — 활자보다 앞서 보이면 안 된다.
 *
 * 아이콘 매핑은 여기(뷰)에서 한다. entities가 아이콘 컴포넌트를 들고 있으면
 * 데이터 레이어에 뷰 의존이 섞인다.
 */
const ICONS: Record<Benefit["icon"], typeof Clock> = {
  clock: Clock,
  house: House,
  cookie: Cookie,
  utensils: UtensilsCrossed,
  graduation: GraduationCap,
  book: BookOpen,
  laptop: Laptop,
  wallet: Wallet,
  trending: TrendingUp,
};

export function BenefitsGrid() {
  return (
    <Section rhythm="large" id="benefits">
      <Container>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Benefits
          </p>
          <h2 className="text-[2rem] leading-[1.16] tracking-[-0.03em] text-display sm:text-[2.6rem]">
            복리후생
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = ICONS[b.icon];
            return (
              <li
                key={b.title}
                className={[
                  "flex flex-col items-center gap-4 px-4 text-center",
                  // 모바일 2열에서 홀수 개면 마지막 칸이 왼쪽에 혼자 남는다
                  "last:odd:col-span-2 sm:last:odd:col-span-1",
                  // 세로 구분선 — 각 줄의 첫 칸에는 넣지 않는다
                  "border-line [&:not(:nth-child(2n+1))]:border-l",
                  "sm:[&:not(:nth-child(2n+1))]:border-l-0 sm:[&:not(:nth-child(3n+1))]:border-l",
                  "lg:[&:not(:nth-child(3n+1))]:border-l-0 lg:[&:not(:nth-child(4n+1))]:border-l",
                ].join(" ")}
              >
                <Icon
                  className="h-9 w-9 text-faint"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold text-heading">
                    {b.title}
                  </p>
                  <p className="text-sm font-light text-subtle">{b.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
