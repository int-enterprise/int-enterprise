export type ClientCategory = "client" | "operator";

export interface Client {
  name: string;
  enName?: string;
  category: ClientCategory;
  logoUrl?: string;
  website?: string;
  description?: string;
}

// 로고는 public/clients/ 폴더에 각 회사 공식 사이트에서 받아온 자산을 보관한다.
// 추가/교체 시 이 파일의 logoUrl만 수정.
export const clients: readonly Client[] = [
  {
    name: "LG CNS",
    enName: "LG CNS",
    category: "client",
    logoUrl: "/clients/lgcns.svg",
    website: "https://www.lgcns.com",
    description:
      "AI Native Development 평가 솔루션 · AIDD 생산성 측정 연구 · sLLM 기반 Agentic AI 모듈",
  },
  {
    name: "더존비즈온",
    enName: "Douzone Bizon",
    category: "client",
    logoUrl: "/clients/douzone.png",
    website: "https://www.douzone.com",
    description: "EMR(전자의무기록) 서비스 STT 요약 AI 개발 및 PoC",
  },
  {
    name: "더그림",
    enName: "The Grim",
    category: "client",
    description:
      "오리지널 웹툰 IP의 MCP 기반 구조화 및 글로벌 OSMU 확장 AI 시스템",
  },
  {
    name: "현대NGV",
    enName: "Hyundai NGV",
    category: "client",
    logoUrl: "/clients/hyundai-ngv.svg",
    website: "https://www.hyundai-ngv.com",
    description: "멀티모달 AI 기반 스마트 캐빈 기술 기획",
  },
];

export const operators: readonly Client[] = [
  {
    name: "씨엔티테크",
    enName: "CNT Tech",
    category: "operator",
    logoUrl: "/clients/cnt-tech.png",
    website: "https://www.cntt.co.kr",
    description: "TIPS 운영사 · 포트폴리오 500여 개 사 네트워크 보유",
  },
];

export const flagshipReferences = [
  "AI Native Development 평가 솔루션 (LG CNS)",
  "AIDD 생산성 측정 연구 (LG CNS)",
  "인터뷰 분석 및 인재 평가 sLLM 기반 Agentic AI 모듈 (LG CNS)",
  "EMR STT 요약 AI 개발 및 PoC (더존비즈온)",
  "오리지널 웹툰 IP MCP 기반 글로벌 OSMU 확장 AI (더그림)",
  "멀티모달 AI 기반 스마트 캐빈 기술 기획 (현대NGV)",
] as const;
