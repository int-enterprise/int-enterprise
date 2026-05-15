export const product = {
  name: "turing.",
  fullName: "Turing",
  tagline: "변화에도 흔들리지 않는 기업용 AI",
  shortDescription:
    "기업의 AI가 매일 안정적으로 일할 수 있도록, turing.은 AI 운영의 모든 단계를 자동화합니다.",
  description:
    "AI는 만들어 두는 것이 아니라 계속 운영하는 것입니다. turing.은 기업의 AI가 변하는 환경 속에서도 일정한 품질로 일할 수 있도록, 운영의 처음부터 끝까지를 함께 책임집니다.",
  pillars: [
    {
      key: "evaluate",
      title: "매일 점검합니다",
      tagline: "Evaluation",
      description:
        "AI가 지금 어떤 일을, 얼마나 잘하고 있는지 매일 같은 기준으로 측정합니다. 기업의 업무가 바뀌면 측정 기준도 함께 따라옵니다.",
    },
    {
      key: "detect",
      title: "가장 먼저 알아챕니다",
      tagline: "Detection",
      description:
        "AI의 성능이 조금이라도 흔들리는 순간, 사용자가 알아채기 전에 먼저 신호를 잡아냅니다.",
    },
    {
      key: "diagnose",
      title: "원인을 함께 찾습니다",
      tagline: "Diagnosis",
      description:
        "어디서, 왜 문제가 생겼는지 빠르게 좁혀냅니다. AI 운영자가 추측이 아니라 근거 위에서 판단할 수 있게 합니다.",
    },
    {
      key: "plan",
      title: "안전한 회복 경로를 제시합니다",
      tagline: "Planning",
      description:
        "여러 회복 방안을 사전에 시뮬레이션해 보고, 가장 안전한 길을 선택할 수 있도록 안내합니다.",
    },
    {
      key: "recover",
      title: "운영을 멈추지 않고 회복합니다",
      tagline: "Recovery",
      description:
        "사용자 영향을 최소화하는 방식으로 단계적으로 회복합니다. 한 번에 바꾸지 않고, 안전이 확인된 만큼만 확장합니다.",
    },
  ],
  outcomes: [
    {
      title: "AI 운영 부담을 줄입니다",
      body: "운영 인력이 매일 추가로 들이는 시간을 자동화로 흡수합니다.",
    },
    {
      title: "고객 신뢰를 지킵니다",
      body: "AI의 품질을 사용자가 알아채기 전에 회사가 먼저 관리합니다.",
    },
    {
      title: "AI 자산의 가치를 키웁니다",
      body: "운영 기록이 쌓일수록 AI는 더 똑똑하고 더 안정적으로 진화합니다.",
    },
  ],
} as const;

export type Product = typeof product;
export type ProductPillar = (typeof product.pillars)[number];
export type ProductOutcome = (typeof product.outcomes)[number];
