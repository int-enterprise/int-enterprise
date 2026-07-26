import type { NextConfig } from "next";

/**
 * 사라진 URL들. sitemap과 검색 색인에 이미 올라간 주소이므로 308로 살려 둔다.
 *
 * 1차: 구 IA(페이지 13개) → 통합 IA
 * 2차: 탭 개편으로 사업/제품 페이지가 /products 아래로 들어감
 *      (/services → /products/buildai, /turing → /products/turing)
 *
 * /delete-account, /privacy, /terms는 앱 스토어 심사에서 참조하는 주소다.
 * 절대 리다이렉트 대상에 넣지 않는다.
 */
const legacyRedirects = [
  // 제품 페이지 이전
  { source: "/services", destination: "/products/buildai" },
  { source: "/turing", destination: "/products/turing" },
  // 구 IA
  // 기업소개는 네 개의 개별 페이지다. /about 자체는 첫 항목으로 보낸다.
  { source: "/about", destination: "/about/greeting" },
  { source: "/about/ceo", destination: "/about/greeting" },
  { source: "/about/careers", destination: "/careers" },
  { source: "/clients", destination: "/#logos" },
  { source: "/partners", destination: "/#logos" },
  { source: "/insights", destination: "/press" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
