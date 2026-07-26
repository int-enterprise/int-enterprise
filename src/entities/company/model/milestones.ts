export interface Milestone {
  /** "2026.04" 형식. 연도 묶음은 화면에서 앞 4자리로 만든다. */
  date: string;
  /** 한 줄로 끝낸다. **설명 문장을 덧붙이지 않는다.** */
  title: string;
}

/**
 * 기업연혁.
 *
 * ⚠️ **회사 차원의 사건만 적는다.** 법인 설립, 과제 선정, 인증·수상, 투자 유치,
 * 사무실 이전 같은 것들이다.
 * "○○ 개발 착수" "○○ 개발 시작" 같은 **개발·프로젝트 이력은 넣지 않는다** —
 * 그건 연혁이 아니라 수행 과제다.
 *
 * ⚠️ 고객사 이름을 쓰지 않는다(고객사 노출은 랜딩 로고 월 한 곳뿐).
 * ⚠️ 매출 수치는 넣지 않는다(투자 문서용 값이다).
 * ⚠️ **한 줄로 끝낸다.** "○○를 중심으로 법인을 설립했습니다" 같은 설명 문장을 붙이지 않는다.
 *
 * 지금은 법인이 2026년에 생겨 항목이 적다. 확인된 사건이 늘면 여기에 추가한다.
 */
export const milestones: readonly Milestone[] = [
  { date: "2026.04", title: "주식회사 인트 설립" },
  { date: "2026.05", title: "TIPS R&D 과제 선정" },
] as const;

/** 연도별로 묶는다 — 화면이 연도 단위로 끊어 읽히게. */
export function milestonesByYear() {
  const map = new Map<string, Milestone[]>();
  for (const m of milestones) {
    const year = m.date.slice(0, 4);
    map.set(year, [...(map.get(year) ?? []), m]);
  }
  return [...map.entries()].map(([year, items]) => ({ year, items }));
}
