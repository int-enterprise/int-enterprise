/**
 * turing. — AI 운영 자동화 솔루션.
 * 출처: docs/company-profile.md §4.
 *
 * 대외 문구는 쉬운 표현을 쓰고, 기술 용어(BOCPD, 반사실적 추론 등)는
 * `tech` 필드에 따로 담아 기술 소개 자리에서만 노출한다.
 */

export interface LoopStage {
  key: string;
  step: string;
  /** 대외용 Agent 이름 */
  agent: string;
  en: string;
  title: string;
  /** 한 줄 요약 */
  summary: string;
  body: string;
  /** 기술 소개 섹션에서만 쓰는 핵심 기술 */
  tech: string;
}

export interface DecayAxis {
  no: string;
  title: string;
  body: string;
}

export const product = {
  name: "turing.",
  fullName: "Turing",
  tagline: "AI 문제는 고객이 알아채기 전에 이미 시작됩니다",
  lede: "AI는 도입 초기엔 잘 작동합니다. 그러나 운영 환경이 변하면 성능은 반드시 흔들립니다. turing.은 그 흔들림을 매일 측정하고, 원인을 찾아내고, 서비스를 멈추지 않은 채 되돌립니다.",
  /** 기존 업계의 대응 방식 — 우리가 무엇을 대체하는지 */
  statusQuo: {
    title: "지금까지는 고객 클레임이 알람이었습니다",
    steps: ["고객 클레임", "담당자 인지", "인력 투입", "수동 수정", "다시 반복"],
    body: "감지가 늦고, 비용이 사람 수에 비례하고, 고객사가 늘어날수록 감당이 안 됩니다.",
  },
  differentiator:
    "경쟁 솔루션은 평가·관측·보안을 각각 별개 계층으로 다룹니다. turing.은 평가부터 복구까지를 하나의 순환 루프로 묶었고, 이 구조로 특허를 출원했습니다. 운영하는 고객사가 늘수록 데이터가 쌓여 더 정확해집니다.",
  audiences: [
    "사내 AI 서비스를 이미 운영 중인 엔터프라이즈 IT 조직",
    "고객사에 AI를 납품하고 품질까지 책임져야 하는 SI·솔루션 기업",
    "AI Agent를 프로덕션에 올려 둔 제품팀",
  ],
} as const;

/** 성능열화가 일어나는 6개 축 — 문제 정의의 근거 */
export const decayAxes: readonly DecayAxis[] = [
  {
    no: "01",
    title: "기업 대내외 환경이 바뀐다",
    body: "모르는 질문에도 그럴듯한 오답을 내놓고, 사용자가 알아채지 못하면 AI는 그 오답을 정답으로 학습합니다.",
  },
  {
    no: "02",
    title: "업무 프로세스가 바뀐다",
    body: "확률적 추론에 기반하기 때문에 낯설고 복잡한 업무일수록 확신도가 떨어집니다. 코딩용 AI를 의료에 쓰는 것과 같은 상황이 서서히 만들어집니다.",
  },
  {
    no: "03",
    title: "담당자의 업무가 바뀐다",
    body: "최초 학습 데이터, AI가 스스로 만든 데이터, 새로 주입된 데이터가 뒤섞이며 모델이 무너집니다. 환각이 심해지고 토큰 소비가 늘어납니다.",
  },
  {
    no: "04",
    title: "연동된 도구가 바뀐다",
    body: "Slack, GitHub, Gmail 같은 외부 도구의 출력 형식이나 프로토콜이 바뀌면 AI는 스스로 교정하지 못합니다.",
  },
  {
    no: "05",
    title: "AI 의존도가 바뀐다",
    body: "장기 기억의 한계와 스스로를 칭찬하는 구조가 겹치면서 판단이 조금씩 밀려납니다.",
  },
  {
    no: "06",
    title: "쓰는 사람이 바뀐다",
    body: "같은 의도라도 말투가 다르면 결과가 달라집니다. 표현 차이에서 시작해 내용까지 달라집니다.",
  },
] as const;

/** 5개 Agent 순환 루프 — 실시간으로 돈다 */
export const loopStages: readonly LoopStage[] = [
  {
    key: "evaluate",
    step: "01",
    agent: "AI평가",
    en: "Evaluate",
    title: "무엇을 잘한 것으로 볼지부터 정합니다",
    summary: "운영 대상 AI를 프로파일링해 그 업무에 맞는 평가지표를 고릅니다.",
    body: "481개 평가지표 라이브러리에서 해당 AI에 맞는 지표를 선별합니다. 기존 지표로 부족하면 새 지표를 만들고, 타당성 검증을 통과한 것만 씁니다.",
    tech: "481개 지표 라이브러리 (범용 180 · Concept 120 · 도메인특화 95 · 과업별 60 · Evaluator특화 26)",
  },
  {
    key: "detect",
    step: "02",
    agent: "열화감지",
    en: "Detect",
    title: "사용자보다 먼저 알아챕니다",
    summary: "로그를 실시간으로 보며 흔들리기 시작한 시점을 잡아냅니다.",
    body: "언제부터 변했는지, 입력 분포가 얼마나 달라졌는지, 그 변화가 계속되는지를 각각 다른 방법으로 확인해 심각성 점수를 냅니다. 기준을 넘으면 다음 단계로 넘어갑니다.",
    tech: "BOCPD로 변화 시점 · KL Divergence/PSI/바서슈타인 거리로 분포 변화율 · CUSUM으로 지속성",
  },
  {
    key: "diagnose",
    step: "03",
    agent: "원인진단",
    en: "Diagnose",
    title: "원인을 확률로 환산합니다",
    summary: "무엇이 몇 퍼센트만큼 원인인지 숫자로 답합니다.",
    body: "성능이 떨어진 시점부터 시간을 거슬러 추적합니다. 열화가 없었다면 어땠을지를 시뮬레이션해 원인 후보의 영향력을 확률로 바꿉니다. 추측이 아니라 근거가 남습니다.",
    tech: "반사실적 추론 — 예: “입력 분포 변화가 78% 원인”",
  },
  {
    key: "plan",
    step: "04",
    agent: "복구플래닝",
    en: "Plan",
    title: "고치기 전에 미리 돌려 봅니다",
    summary: "여러 복구 전략의 효과를 사전에 검증하고 우선순위를 매깁니다.",
    body: "프롬프트 보정, RAG 갱신, 임베딩 재학습, 캐시 무효화 등 가능한 방안을 세우고 시뮬레이션으로 효과를 미리 확인합니다. 비용·시간·복잡도까지 비교해 무엇부터 할지 정합니다.",
    tech: "몬테카를로 · Agent-based 시뮬레이션",
  },
  {
    key: "recover",
    step: "05",
    agent: "열화복구",
    en: "Recover",
    title: "사용자가 모르는 사이에 되돌립니다",
    summary: "서비스를 내리지 않고, 안전이 확인된 만큼만 넓힙니다.",
    body: "검증을 통과한 방안만 단계적으로 적용합니다. 하나라도 실패하면 계획 단계로 되돌아가고, 문제가 생기면 자동으로 롤백합니다. 롤백 시 영향받는 트래픽은 최대 1%로 제한됩니다.",
    tech: "AST 호환성 검증 + 통계적 검증 · Canary Deployment 5단계 · Guardrail 위반 시 자동 롤백",
  },
] as const;

/** Multi-Agent 전체를 통제하는 보안 계층 */
export const harness = {
  name: "AI Harness",
  title: "Agent가 하는 모든 행위를 통제합니다",
  body: "Safety Guardrail이 입력과 출력 양쪽에서 민감정보를 실시간으로 마스킹합니다. 사람이 검토해서 막는 것이 아니라 구조적으로 새어 나가지 못하게 합니다.",
} as const;

export type Product = typeof product;
