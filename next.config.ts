import type { NextConfig } from "next";

/**
 * 구 IA(페이지 13개)에서 신 IA(페이지 5개)로 통합하면서 사라진 URL들.
 * sitemap과 검색 색인에 이미 올라간 주소이므로 308로 살려 둔다.
 *
 * /delete-account, /privacy, /terms는 앱 스토어 심사에서 참조하는 주소다.
 * 절대 리다이렉트 대상에 넣지 않는다.
 */
const legacyRedirects = [
  { source: "/about/history", destination: "/about#history" },
  { source: "/about/location", destination: "/about#location" },
  { source: "/about/ceo", destination: "/about#founder" },
  { source: "/about/careers", destination: "/careers" },
  { source: "/clients", destination: "/services#references" },
  { source: "/partners", destination: "/about#partners" },
  { source: "/insights", destination: "/press" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
