import type { LogoSize } from "./clients";

/**
 * 로고 월에 올리는 곳들. 랜딩의 "주요 고객사 및 파트너" 한 구간이 이 배열을 그린다.
 *
 * ⚠️ 이 목록은 **고객사와 파트너를 구분하지 않는다.** 구분해서 적으려면
 * 그 회사가 고객인지 파트너인지 확정된 사실이 필요한데, 아래 일부는 로고 자산만
 * 전달받았고 관계가 문서로 확인되지 않았다. 확인되기 전에 "고객사"로 단정해 적으면
 * 회사가 사실과 다른 주장을 하게 된다. 그래서 한 구간에 섞어 놓고 이름만 표기한다.
 *
 * 관계가 확정되면 clients / partners(clients.ts)로 옮기고 여기서는 그 값을 참조한다.
 *
 * 순서 = 화면 순서. 검증된 대표 레퍼런스를 앞에 세운다.
 * 크기는 `node scripts/prepare-client-logos.mjs`가 출력한 실제 파일 크기다.
 */
export interface WallLogo extends LogoSize {
  name: string;
  logoUrl: string;
  /** 관계가 아직 확인되지 않은 곳 — 카피에서 "고객사"라고 쓰지 않는다. */
  unclassified?: boolean;
}

export const wallLogos: readonly WallLogo[] = [
  // ── 확인된 고객사 ────────────────────────────────────────────────
  { name: "LG CNS", logoUrl: "/clients/lg-cns.svg", logoWidth: 119, logoHeight: 28 },
  {
    name: "현대NGV",
    logoUrl: "/clients/hyundai-ngv.svg",
    logoWidth: 191,
    logoHeight: 54,
  },
  { name: "STEPI", logoUrl: "/clients/stepi.png", logoWidth: 318, logoHeight: 52 },

  // ── 확인된 파트너 ────────────────────────────────────────────────
  {
    name: "씨엔티테크",
    logoUrl: "/clients/cnt-tech.png",
    logoWidth: 122,
    logoHeight: 120,
  },
  {
    name: "영림원소프트랩",
    logoUrl: "/clients/younglimwon.png",
    logoWidth: 591,
    logoHeight: 120,
  },
  {
    name: "University of Cambridge",
    logoUrl: "/clients/cambridge.png",
    logoWidth: 195,
    logoHeight: 47,
  },
  { name: "OGQ", logoUrl: "/clients/ogq.png", logoWidth: 230, logoHeight: 78 },
  { name: "KEIT", logoUrl: "/clients/keit.png", logoWidth: 276, logoHeight: 120 },

  // ── 로고만 전달받은 곳 (고객사/파트너 구분 확인 필요) ──────────────
  {
    name: "FUST Lab.",
    logoUrl: "/clients/fust-lab.png",
    logoWidth: 433,
    logoHeight: 120,
    unclassified: true,
  },
  {
    name: "icore",
    logoUrl: "/clients/icore.png",
    logoWidth: 294,
    logoHeight: 120,
    unclassified: true,
  },
  {
    name: "Mobisight",
    logoUrl: "/clients/mobisight.png",
    logoWidth: 240,
    logoHeight: 120,
    unclassified: true,
  },
  {
    name: "STRA",
    logoUrl: "/clients/stra.png",
    logoWidth: 120,
    logoHeight: 120,
    unclassified: true,
  },
  {
    name: "VOWING",
    logoUrl: "/clients/vowing.png",
    logoWidth: 240,
    logoHeight: 120,
    unclassified: true,
  },
  {
    name: "청해ENV",
    logoUrl: "/clients/cheonghae-env.png",
    logoWidth: 451,
    logoHeight: 120,
    unclassified: true,
  },
  {
    name: "저장대학교",
    logoUrl: "/clients/zhejiang-university.png",
    logoWidth: 197,
    logoHeight: 57,
    unclassified: true,
  },
] as const;
