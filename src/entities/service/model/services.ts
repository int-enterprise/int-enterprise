/**
 * 세 가지 서비스 오퍼링.
 * 출처: docs/company-profile.md §3.
 *
 * 나열된 상품 목록이 아니라 **단계적 전략**이다:
 * 검증된 시장(①)에서 벌어 새 시장(②)을 직접 만들고, 그 제품만 떼어 세계로 나간다(③).
 * ②가 회사의 주력이다. 문구를 고칠 때 이 위계를 지운다면 회사를 잘못 그린 것이다.
 */

export interface Offering {
  no: string;
  name: string;
  role: string;
  headline: string;
  body: string;
  /** 이 오퍼링을 증명하는 고객사 */
  proof: readonly string[];
  /** 주력 오퍼링 — 화면에서 강조된다 */
  primary?: boolean;
}

export const positioning = {
  oneLiner: "기업용 AI를 만들고, 그 AI가 시간이 지나도 성능을 유지하도록 운영까지 책임집니다.",
  lede: "대부분의 AI 개발사는 납품에서 끝납니다. (주)인트는 만든 AI를 계속 운영하면서 데이터를 쌓고, 그 데이터로 자체 솔루션 turing.을 키웁니다. 사업과 제품이 서로를 먹여 주는 구조입니다.",
} as const;

export const offerings: readonly Offering[] = [
  {
    no: "01",
    name: "기업용 AI 통합구축",
    role: "검증된 시장",
    headline: "그 회사에만 맞는 AI를 설계해 납품합니다",
    body: "고객사의 업무와 요구사항을 분석해 최적화된 AI 시스템을 설계·구축합니다. 이미 수요가 확인된 영역이고, 새 시장으로 나가는 발판입니다.",
    proof: ["LG CNS", "파우더룸"],
  },
  {
    no: "02",
    name: "변화적응형 AI 통합구축",
    role: "주력",
    headline: "turing.을 내장해, 스스로 성능을 지키는 AI로 만듭니다",
    body: "같은 방식으로 구축하되 운영 솔루션 turing.을 처음부터 안에 넣습니다. 환경이 변해도 신뢰성과 안정성을 스스로 유지하는 AI입니다. 단순 개발사가 따라오기 어려운 영역이고, 회사가 가장 힘을 싣는 방향입니다.",
    proof: ["히포크랏랩스", "STEPI"],
    primary: true,
  },
  {
    no: "03",
    name: "AI 운영솔루션 공급",
    role: "글로벌 확장",
    headline: "이미 AI를 쓰고 있다면, turing.만 연동합니다",
    body: "자체 개발 인력이 있거나 통합구축이 부담스러운 곳에는 turing.만 클라우드로 연결해 운영을 자동화합니다. 해외 시장을 겨냥한 형태입니다.",
    proof: [],
  },
] as const;

/** 고객 규모별 협업 방식 — 출처: docs/company-profile.md §5 */
export interface Playbook {
  segment: string;
  approach: string;
  example: string;
}

export const playbooks: readonly Playbook[] = [
  {
    segment: "대기업",
    approach: "이미 돌아가고 있는 업무 위에 AI를 결합해 현업에 적용합니다.",
    example: "LG CNS",
  },
  {
    segment: "중견기업",
    approach: "이미 제공 중인 서비스 위에 AI 기능을 얹어 고도화합니다.",
    example: "파우더룸",
  },
  {
    segment: "스타트업",
    approach: "제품을 처음부터 함께 만드는 공동 개발로 들어갑니다.",
    example: "더그림 엔터테인먼트",
  },
] as const;
