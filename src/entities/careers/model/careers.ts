/** 출처: docs/company-profile.md §9 */

export interface Role {
  title: string;
  track: string;
  description: string;
  focus: readonly string[];
}

export interface WorkingPolicy {
  title: string;
  body: string;
}

export const roles: readonly Role[] = [
  {
    title: "AI 연구 엔지니어",
    track: "Evaluation / Multi-Agent",
    description:
      "AI의 품질을 무엇으로 잴지부터 설계합니다. 평가지표 라이브러리와 열화 감지·진단 로직을 함께 만듭니다.",
    focus: ["평가 방법론", "Multi-Agent 오케스트레이션", "통계적 검증"],
  },
  {
    title: "백엔드 엔지니어",
    track: "Platform",
    description:
      "고객사 AI의 로그를 실시간으로 받아 처리하는 파이프라인과, 운영자가 매일 보는 제품의 뒤편을 책임집니다.",
    focus: ["실시간 데이터 파이프라인", "API 설계", "Next.js 기반 프로덕트"],
  },
  {
    title: "인프라 엔지니어",
    track: "Infrastructure",
    description:
      "GPU 클러스터와 배포 파이프라인을 설계하고, 고객사 환경에 안전하게 나가는 경로를 만듭니다.",
    focus: ["Kubernetes / GPU 스케줄링", "관측성", "Canary 배포"],
  },
] as const;

/** 인재 유지 4개 제도 */
export const workingPolicies: readonly WorkingPolicy[] = [
  {
    title: "코어타임 10–19시, 주 1회 재택",
    body: "유연 출퇴근을 운영합니다. 짧게 여러 번 흔들리는 것보다 한 문제에 길게 들어가는 리듬을 지키는 데 씁니다.",
  },
  {
    title: "반기 성과급과 스톡옵션",
    body: "반기마다 성과급을 지급하고, 2년 베스팅 스톡옵션으로 회사가 커진 결과를 함께 나눕니다.",
  },
  {
    title: "학회와 논문을 계속",
    body: "AI 학회 참가비와 논문 게재 비용을 지원합니다. 현장에서 만난 문제를 연구로 남기는 것을 권장합니다.",
  },
  {
    title: "장비와 도구는 전액 지원",
    body: "입사 시 고성능 장비를 지급하고, 사용하는 소프트웨어와 클라우드 비용을 전액 지원합니다.",
  },
] as const;

export const applicationGuide = {
  subject: "[채용 지원] 지원자 성함 / 희망 직군",
  steps: [
    "희망 직군과 지원 동기를 적어 주세요.",
    "경력기술서 또는 작업물(GitHub, 포트폴리오, 논문 무엇이든)을 첨부해 주세요.",
    "영업일 기준 1–2일 안에 회신드립니다.",
  ],
} as const;
