/**
 * 고객사와 수행 과제.
 * 출처: docs/company-profile.md §5. 사실만 적는다 — 진행 단계를 부풀리지 않는다.
 * (프로토타입 단계인 과제를 "운영 중"으로 쓰지 않는다)
 */

export type Segment = "대기업" | "중견기업" | "스타트업" | "공공";
export type Field = "IT" | "의료" | "채용·인사" | "모빌리티" | "마케팅" | "콘텐츠";
export type Stage = "현업 운영" | "시범 적용" | "개발" | "성능 평가";

/**
 * ⚠️ 고객사·파트너의 외부 웹사이트 링크를 넣지 않는다.
 * 방문자를 고객사 사이트로 내보내지 않는다는 결정이다. website 필드를 다시 만들지 말 것.
 */
export interface Client {
  name: string;
  enName?: string;
  /** 회사를 한 줄로 설명하는 수식. 이름만으로 알기 어려운 곳에만 채운다. */
  note?: string;
  segment: Segment;
  /** public/clients/ 아래 자산. 없으면 회사명을 워드마크처럼 조판해 대체한다. */
  logoUrl?: string;
}

export interface Reference {
  client: string;
  field: Field;
  title: string;
  stage: Stage;
  /** 수행 기간. 확인된 것만 적는다. */
  period?: string;
  /** 튜링을 내장한 과제인지 */
  turing?: boolean;
}

export const clients: readonly Client[] = [
  {
    name: "LG CNS",
    enName: "LG CNS",
    segment: "대기업",
    logoUrl: "/clients/lgcns.svg",
  },
  {
    name: "현대NGV",
    enName: "Hyundai NGV",
    segment: "대기업",
    logoUrl: "/clients/hyundai-ngv.svg",
  },
  {
    name: "STEPI",
    enName: "과학기술정책연구원",
    note: "과학기술정책연구원",
    segment: "공공",
    logoUrl: "/clients/stepi.png",
  },
  {
    name: "히포크랏랩스",
    enName: "Hippocrat Labs",
    segment: "스타트업",
  },
  {
    name: "더그림 엔터테인먼트",
    enName: "The Grim Entertainment",
    note: "국내 1위 웹툰 제작사",
    segment: "스타트업",
  },
  {
    name: "파우더룸",
    enName: "Powderroom",
    segment: "중견기업",
  },
  {
    name: "부엉이들",
    enName: "Booungs",
    segment: "스타트업",
  },
] as const;

export const references: readonly Reference[] = [
  {
    client: "LG CNS",
    field: "IT",
    title: "신입사원 채용 AI — 2026년 Career Lens로 현업 채용 업무에 적용",
    stage: "현업 운영",
    period: "2024.11–2025.08",
  },
  {
    client: "LG CNS",
    field: "IT",
    title: "AI 도입 효과 측정 모델",
    stage: "현업 운영",
  },
  {
    client: "더그림 엔터테인먼트",
    field: "콘텐츠",
    title: "웹툰 IP를 영상·굿즈로 확장하는 OSMU AI",
    stage: "개발",
    period: "2025.09–",
  },
  {
    client: "현대NGV",
    field: "모빌리티",
    title: "스마트 차량 실내(캐빈) AI",
    stage: "개발",
  },
  {
    client: "부엉이들",
    field: "모빌리티",
    title: "차량 상태·중고가치 평가 AI",
    stage: "개발",
  },
  {
    client: "파우더룸",
    field: "마케팅",
    title: "마케팅 리포트 자동 그래프화 AI",
    stage: "개발",
  },
  {
    client: "히포크랏랩스",
    field: "의료",
    title: "진료기록 정리 · 의료 진단서 작성 AI",
    stage: "성능 평가",
    turing: true,
  },
  {
    client: "STEPI",
    field: "채용·인사",
    title: "지원자 직무 적합성·역량 평가 AI",
    stage: "성능 평가",
    turing: true,
  },
] as const;

/** 사업 파트너. 출처: docs/company-profile.md §5 파트너십 */
export interface Partner {
  name: string;
  role: string;
  logoUrl?: string;
}

export const partners: readonly Partner[] = [
  {
    name: "씨엔티테크",
    role: "TIPS 운영사",
    logoUrl: "/clients/cnt-tech.png",
  },
  { name: "영림원소프트랩", role: "기술 파트너" },
  { name: "OGQ", role: "기술 파트너" },
  { name: "University of Cambridge", role: "연구 협력" },
  { name: "KIAT", role: "공공 협력" },
  { name: "KEIT", role: "공공 협력" },
] as const;

/** 분야 수와 고객층 수 — "5개 분야 × 4개 고객층"이라는 강점의 근거. */
export const coverage = {
  fields: [...new Set(references.map((r) => r.field))],
  segments: [...new Set(clients.map((c) => c.segment))],
} as const;
