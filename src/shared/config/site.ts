export const siteConfig = {
  brand: "int.",
  legalName: "주식회사 인트",
  enLegalName: "Int Corp.",
  title: "int. · 변화에 적응하는 기업용 AI",
  tagline: "변화에 적응하는 기업용 AI",
  description:
    "(주)인트는 변화하는 환경에서도 안정적으로 작동하는 기업용 AI 운영 솔루션 'turing.'을 만듭니다. AI Agent 운영 자동화, 성능 모니터링, 변화 적응형 AI 운영 표준을 제시합니다.",
  url: "https://intcorp.ai",
  ogImage: "/og.png",
  locale: "ko_KR",
  // Google Search Console 사이트 인증 토큰. 단일 진실 공급원.
  // 값이 있으면 layout이 <meta name="google-site-verification">를 주입하고,
  // BrandMark의 마침표(.)가 함께 나타난다. 비우면 메타태그도 마침표도 사라진다.
  googleSiteVerification: "hWJzdhKKd5QZYa_sGfpwHkjdbHuUbuquMjIlH7yDBKQ",
  keywords: [
    "인트",
    "(주)인트",
    "주식회사 인트",
    "Int Corp",
    "intcorp",
    "intcorp.ai",
    "turing",
    "튜링",
    "AI 운영",
    "AI 운영 자동화",
    "AI Agent 운영",
    "AI Operations",
    "AI Agent Operations",
    "변화 적응형 AI",
    "변화적응형 AI",
    "기업용 AI",
    "Enterprise AI",
    "AI Harness",
    "AIOps",
    "Multi-Agent",
    "AI Agent",
    "AI 평가",
    "AI 모니터링",
    "AI 성능 관리",
    "AI 안정성",
    "박현규",
    "TIPS 창업",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  cta?: boolean;
  highlight?: boolean;
  children?: readonly NavItem[];
}

export const navItems: readonly NavItem[] = [
  {
    label: "회사 소개",
    href: "/about",
    children: [
      { label: "회사 개요", href: "/about", description: "(주)인트는 어떤 회사인가요" },
      { label: "연혁", href: "/about/history", description: "Int Corp.의 발자취" },
      { label: "위치", href: "/about/location", description: "오시는 길과 연락처" },
      { label: "CEO 프로필", href: "/about/ceo", description: "Founder 박현규" },
      { label: "채용 안내", href: "/about/careers", description: "함께할 사람을 찾습니다" },
    ],
  },
  {
    label: "turing.",
    href: "/turing",
    highlight: true,
    description: "기업용 AI 운영 솔루션",
  },
  {
    label: "고객사",
    href: "/clients",
    description: "함께한 기업들",
  },
  {
    label: "관계사",
    href: "/partners",
    description: "기술·연구·전략 파트너",
  },
  {
    label: "인사이트",
    href: "/insights",
    description: "뉴스 · 보도자료 · 기사",
  },
  {
    label: "문의하기",
    href: "/contact",
    cta: true,
  },
] as const;
