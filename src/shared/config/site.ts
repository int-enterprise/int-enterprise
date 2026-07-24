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
  description: string;
}

/** 헤더·모바일 메뉴·푸터가 공유하는 주 메뉴. CTA(문의하기)는 별도로 둔다. */
export const navItems: readonly NavItem[] = [
  {
    label: "기업용 AI 구축",
    href: "/services",
    description: "업무에 맞는 AI를 설계하고 만듭니다",
  },
  {
    label: "turing.",
    href: "/turing",
    description: "만든 AI가 계속 제 성능을 내게 합니다",
  },
  {
    label: "회사 소개",
    href: "/about",
    description: "원칙 · 연혁 · 대표 · 오시는 길",
  },
  {
    label: "채용",
    href: "/careers",
    description: "함께할 동료를 찾습니다",
  },
] as const;

export const ctaNav = {
  label: "문의하기",
  href: "/contact",
} as const;

/** 푸터 하단 법적 고지. 앱 스토어 심사가 참조하는 주소이므로 임의로 지우지 않는다. */
export const legalNav: readonly NavItem[] = [
  { label: "개인정보처리방침", href: "/privacy", description: "" },
  { label: "이용약관", href: "/terms", description: "" },
  { label: "계정 삭제 요청", href: "/delete-account", description: "" },
] as const;
