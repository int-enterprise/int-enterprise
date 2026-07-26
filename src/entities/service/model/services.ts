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

/**
 * buildAI.의 구축 절차.
 *
 * ⚠️ 여기에 turing. 이야기를 섞지 않는다. buildAI. 페이지는 **만드는 일**만 설명한다.
 * 운영 자동화는 turing. 페이지의 몫이고, 두 사업의 관계는 `/products`가 설명한다.
 */
export interface BuildStep {
  no: string;
  title: string;
  body: string;
}

export const buildSteps: readonly BuildStep[] = [
  { no: "01", title: "업무 분석", body: "담당자의 하루를 먼저 봅니다." },
  { no: "02", title: "설계", body: "구조와 평가 기준을 함께 정합니다." },
  { no: "03", title: "구축 · 납품", body: "쓰던 시스템 위에 얹어 넘깁니다." },
  { no: "04", title: "운영 인수", body: "사용 로그를 보며 계속 손봅니다." },
] as const;

/**
 * buildAI.가 다뤄 온 분야.
 *
 * `what`은 실제로 만든 것이다(entities/client의 references에서 가져왔다).
 * ⚠️ **고객사 이름을 쓰지 않는다** — 무엇을 만들었는지만 적는다.
 * `icon`은 lucide-react 아이콘 이름이고, 매핑은 widget이 한다.
 */
export interface BuildField {
  icon: "server" | "stethoscope" | "people" | "car" | "megaphone" | "content";
  name: string;
  what: string;
}

export const buildFields: readonly BuildField[] = [
  { icon: "server", name: "IT", what: "채용 AI · 개발 생산성 측정" },
  { icon: "stethoscope", name: "의료", what: "진료 기록 전사 · 진단서 작성" },
  { icon: "people", name: "채용·인사", what: "지원자 직무 적합성 평가" },
  { icon: "car", name: "모빌리티", what: "차량 실내 AI · 중고가치 평가" },
  { icon: "megaphone", name: "마케팅", what: "리포트 자동 그래프화" },
  { icon: "content", name: "콘텐츠", what: "IP를 영상·굿즈로 확장" },
] as const;

/**
 * ⚠️ `buildFields`는 **다 해 본 목록이 아니라 지금까지의 예시**다.
 * 업종을 가리지 않는다는 점이 이 회사의 강점이므로, 카피에서 여섯을 한계처럼 쓰지 않는다.
 */
export const scopeNote =
  "여기에 없는 업종도 같은 방식으로 시작합니다. 업무를 먼저 보고 기술을 고르기 때문에, 분야를 가리지 않습니다.";

/** 고객 유형별 협업 방식 — 출처: docs/company-profile.md §5 (대기업·공공·중견·스타트업 4개 고객층) */
export interface Playbook {
  icon: "enterprise" | "public" | "midmarket" | "startup";
  segment: string;
  approach: string;
}

export const playbooks: readonly Playbook[] = [
  {
    icon: "enterprise",
    segment: "대기업",
    approach: "이미 돌아가는 업무 위에 AI를 결합합니다.",
  },
  {
    icon: "public",
    segment: "공공기관",
    approach: "기관 규정과 절차에 맞춰, 근거가 남는 형태로 만듭니다.",
  },
  {
    icon: "midmarket",
    segment: "중견기업",
    approach: "제공 중인 서비스에 AI 기능을 얹어 고도화합니다.",
  },
  {
    icon: "startup",
    segment: "스타트업",
    approach: "제품을 처음부터 함께 만듭니다.",
  },
] as const;
