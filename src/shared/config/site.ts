export const siteConfig = {
  brand: "int.",
  legalName: "주식회사 인트",
  enLegalName: "Int Corp.",
  title: "int. · 변화에 적응하는 기업용 AI",
  tagline: "변화에 적응하는 기업용 AI",
  /** 브랜드명의 뜻(전부 소문자). 사실의 원본은 entities/company의 `company.brandMeaning`이다. */
  brandMeaning: "intelligent new technologies",
  description:
    "int.는 intelligent new technologies의 약자입니다. (주)인트는 기업용 AI를 직접 만드는 'buildAI.'와, 만든 AI가 계속 제 성능을 내게 하는 운영 자동화 솔루션 'turing.'을 만듭니다.",
  url: "https://intcorp.ai",
  ogImage: "/og.png",
  locale: "ko_KR",
  // Google Search Console 사이트 인증 토큰. 단일 진실 공급원.
  // 값이 있으면 layout이 <meta name="google-site-verification">를 주입한다.
  // 비우면 인증이 풀린다.
  googleSiteVerification: "hWJzdhKKd5QZYa_sGfpwHkjdbHuUbuquMjIlH7yDBKQ",
  keywords: [
    "인트",
    "(주)인트",
    "주식회사 인트",
    "Int Corp",
    "intcorp",
    "intcorp.ai",
    "intelligent new technologies",
    "인텔리전트 뉴 테크놀로지스",
    "buildAI",
    "빌드에이아이",
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
    "기업용 AI 구축",
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
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export interface NavItem {
  label: string;
  href: string;
  description: string;
  /**
   * 제품 워드마크로 조판할 항목(`buildAI.` `turing.`).
   * 켜면 메뉴·푸터가 `<ProductMark />`로 그린다 — 가장 두꺼운 웨이트 + 틸 마침표.
   */
  mark?: boolean;
  /** 하위 메뉴. 있으면 헤더가 드롭다운으로, 모바일이 들여쓴 목록으로 그린다. */
  children?: readonly NavItem[];
}

/**
 * 헤더·모바일 메뉴·푸터가 공유하는 주 메뉴.
 *
 * 탭은 세 개다 — 회사소개 / 제품소개 / 인재채용. CTA(도입 문의)는 별도로 둔다.
 * 회사소개의 하위 항목은 /about 한 페이지의 앵커이고,
 * 제품소개의 하위 항목은 제품별 개별 페이지다.
 */
export const navItems: readonly NavItem[] = [
  {
    label: "기업소개",
    href: "/about/greeting",
    description: "인사말 · 기업연혁 · 팀 · 오시는 길",
    // ⚠️ 네 항목은 각각 독립된 페이지다. 한 페이지의 앵커(#)로 되돌리지 않는다.
    children: [
      { label: "인사말", href: "/about/greeting", description: "대표가 드리는 말" },
      { label: "기업연혁", href: "/about/history", description: "설립과 주요 연혁" },
      { label: "팀", href: "/about/team", description: "만들고 있는 사람들" },
      { label: "오시는 길", href: "/about/location", description: "마포 광흥창역 근처" },
    ],
  },
  {
    label: "제품소개",
    href: "/products",
    description: "buildAI. · turing.",
    children: [
      {
        label: "buildAI.",
        href: "/products/buildai",
        description: "업무에 맞는 AI를 설계하고 만듭니다",
        mark: true,
      },
      {
        label: "turing.",
        href: "/products/turing",
        description: "만든 AI가 계속 제 성능을 내게 합니다",
        mark: true,
      },
    ],
  },
  {
    label: "인재채용",
    href: "/careers",
    description: "함께할 동료를 찾습니다",
  },
] as const;

export const ctaNav = {
  label: "도입 문의",
  href: "/contact",
} as const;

/** 푸터 하단 법적 고지. 앱 스토어 심사가 참조하는 주소이므로 임의로 지우지 않는다. */
export const legalNav: readonly NavItem[] = [
  { label: "개인정보처리방침", href: "/privacy", description: "" },
  { label: "이용약관", href: "/terms", description: "" },
  { label: "계정 삭제 요청", href: "/delete-account", description: "" },
] as const;
