import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * 최상단 고지 바. sticky가 아니라 페이지와 함께 스크롤되어 올라간다.
 * 연구실에서 출발한 회사라는 사실을 첫 화면에서 한 번 짚고 지나가는 자리다.
 */
export function AnnouncementBar() {
  return (
    <Link
      href="/about#origin"
      className="group flex h-14 w-full items-center justify-center gap-3 border-b border-line px-4 text-center"
    >
      <span className="text-sm font-medium text-heading">
        서강대 연구실에서 시작했습니다
      </span>
      <span className="hidden text-sm text-subtle transition-colors group-hover:text-body sm:inline">
        박현규 교수 연구팀의 기업 AI 과제에서 출발해 2026년 법인이 됐습니다
      </span>
      <ArrowRight
        className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}
