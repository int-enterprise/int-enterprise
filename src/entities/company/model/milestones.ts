export interface Milestone {
  date: string;
  title: string;
  description: string;
  /** 아직 일어나지 않은 계획. 타임라인에서 흐리게 표시한다. */
  planned?: boolean;
}

/**
 * 연혁.
 *
 * ⚠️ 법인 설립(2026.04.23)보다 앞선 과제가 있다. 발표 자료의 "3년 트랙 레코드"는
 * 법인 전환 이전 조직의 실적으로 보이나 문서상 확인되지 않았다
 * (docs/company-profile.md §2 확인 필요 항목).
 * 그래서 "설립 2026"과 "3년 실적"을 나란히 쓰지 않고, 날짜가 확인된 과제만 적는다.
 * 전신 조직 정보가 확정되면 맨 앞에 항목을 추가한다.
 */
export const milestones: readonly Milestone[] = [
  {
    date: "2024.11",
    title: "LG CNS 채용 AI 개발 착수",
    description:
      "신입사원 채용 AI를 개발해 2026년 Career Lens로 현업 채용 업무에 적용됐습니다.",
  },
  {
    date: "2025.09",
    title: "더그림 엔터테인먼트 OSMU AI",
    description:
      "국내 1위 웹툰 제작사와 웹툰 IP를 영상·굿즈로 확장하는 AI를 공동 개발하기 시작했습니다.",
  },
  {
    date: "2026.04",
    title: "(주)인트 법인 설립",
    description:
      "연구실에서 이어 온 기업 AI 과제를 계속하기 위해 박현규 대표를 중심으로 법인을 설립했습니다.",
  },
  {
    date: "2026.05",
    title: "turing. R&D 과제 착수",
    description:
      "씨엔티테크 운영사 추천으로 AI 운영 자동화 솔루션 turing.의 R&D를 TIPS 일반트랙으로 진행합니다.",
  },
  {
    date: "2026.하반기",
    title: "turing. 실증 파일럿",
    description:
      "대기업·공공·스타트업 세 고객층에서 turing.을 동시에 검증합니다.",
    planned: true,
  },
] as const;
