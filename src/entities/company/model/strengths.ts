export interface Strength {
  label: string;
  title: string;
  body: string;
}

/**
 * 왜 (주)인트인가. 전부 확인 가능한 사실에 근거한다.
 *
 * ⚠️ TIPS를 강점 목록에 넣지 않는다. TIPS는 turing.이라는 한 솔루션의 R&D 자금원이자
 * 검증 트랙일 뿐 회사의 정체성이 아니다 (docs/company-profile.md §10).
 */
export const strengths: readonly Strength[] = [
  {
    label: "개발사이면서 운영사",
    title: "납품에서 끝내지 않습니다",
    body: "대부분의 AI 개발사는 만들어 넘기는 순간 관계가 끝납니다. (주)인트는 만든 AI를 계속 운영하며 데이터를 쌓고, 그 데이터로 turing.을 키웁니다.",
  },
  {
    // 숫자는 entities/client의 references·clients와 맞춰야 한다.
    // (레이어 규칙상 여기서 import할 수 없으므로 값이 바뀌면 함께 고친다)
    label: "6개 분야 · 4개 고객층",
    title: "한 분야에 갇혀 있지 않습니다",
    body: "IT, 의료, 채용·인사, 모빌리티, 마케팅, 콘텐츠를 대기업부터 공공기관·스타트업까지 직접 다뤘습니다. 업종이 달라도 무엇이 문제가 되는지 압니다.",
  },
  {
    label: "현업 운영 레퍼런스",
    title: "프로토타입이 아니라 실제로 쓰이고 있습니다",
    body: "LG CNS와의 1년 공동연구에서 개발 생산성 26.1% 향상을 입증하고 국제 학술지에 논문으로 등재했습니다. 그 결과물은 Career Lens로 현업 채용 업무에 쓰이고 있습니다.",
  },
  {
    label: "하나의 순환 루프",
    title: "평가부터 복구까지 끊기지 않습니다",
    body: "경쟁 솔루션은 평가·관측·보안을 각각 다른 계층으로 다룹니다. turing.은 다섯 단계를 하나의 루프로 묶었고, 이 구조로 특허를 출원했습니다.",
  },
] as const;
