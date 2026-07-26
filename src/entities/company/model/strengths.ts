/**
 * 왜 (주)인트인가. 전부 확인 가능한 사실에 근거한다.
 *
 * ⚠️ TIPS를 강점 목록에 넣지 않는다. TIPS는 turing.이라는 한 솔루션의 R&D 자금원이자
 * 검증 트랙일 뿐 회사의 정체성이 아니다 (docs/company-profile.md §10).
 * ⚠️ **고객사 이름을 쓰지 않는다.** 이 목록은 제품 페이지에 나가는데,
 * 고객사 노출은 랜딩(`/`)의 로고 월 한 곳뿐이다. 유형으로만 적는다.
 * ⚠️ 이 목록은 buildAI. 페이지에 쓰인다 — **turing. 이야기를 섞지 않는다.**
 *
 * 형식이 산문이 아니라 **대조표**인 이유:
 * "차별점"은 무엇과 다른지를 말할 때만 성립한다. 문단으로 풀면 자랑이 되고 길어진다.
 * 왼쪽(보통의 AI 개발사)과 오른쪽(우리)을 나란히 두면 한 줄로 끝난다.
 */
export interface Difference {
  /** 비교하는 항목 */
  aspect: string;
  /** 보통의 AI 개발사 */
  typical: string;
  /** (주)인트 */
  ours: string;
}

export const differences: readonly Difference[] = [
  {
    aspect: "관계가 끝나는 시점",
    typical: "납품하면 끝",
    ours: "운영하는 동안 계속",
  },
  {
    // 숫자는 entities/client의 references·clients와 맞춰야 한다.
    // (레이어 규칙상 여기서 import할 수 없으므로 값이 바뀌면 함께 고친다)
    aspect: "다뤄 본 범위",
    typical: "한두 업종에 특화",
    ours: "6개 분야 · 4개 고객층",
  },
  {
    aspect: "넘길 때의 상태",
    typical: "데모",
    ours: "현업에서 매일 돌아가는 상태",
  },
] as const;

/**
 * 대조표만으로는 주장이 되고 만다. 숫자로 받쳐 주는 근거 하나.
 * ⚠️ 값을 바꾸려면 근거 문서를 먼저 확인한다 (docs/company-profile.md).
 */
export const proofMetric = {
  value: "26.1%",
  label: "개발 생산성 향상",
  note: "국내 대형 IT 서비스 기업과의 1년 공동연구에서 입증하고, 국제 학술지에 논문으로 등재했습니다. 그 결과물은 지금 현업 채용 업무에 쓰이고 있습니다.",
} as const;
