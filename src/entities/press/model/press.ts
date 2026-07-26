/**
 * 언론 보도·기고·인터뷰.
 *
 * 실제로 게재된 것만 넣는다. 예정·가상의 기사를 채워 넣지 않는다.
 * 제목은 원문 그대로 옮긴다 — 따옴표·말줄임표·대괄호까지 손대지 않는다.
 *
 * ⚠️ 표기 주의: 아래 기사 중 일부는 법인명 "(주)인트"가 아니라 박현규 교수 연구팀
 * 명의로 보도됐다. 그래서 이 목록을 "(주)인트가 언론에 나왔다"로 단정해 쓰지 않는다.
 * 제목에 그 사실이 남아 있어도 우리 카피에서 연구실 서사를 덧붙이지 않는다.
 *
 * 추가 방법: items 배열에 항목을 넣기만 하면 최신순 정렬·랜딩 노출·전체 목록이 함께 갱신된다.
 * 사진은 `image`를 비워 두면 기사의 og:image가 자동으로 붙는다
 * (`node scripts/fetch-press-images.mjs`를 한 번 돌려 자산과 매니페스트를 갱신한다).
 * 매체 기본 로고가 og:image로 잡히는 곳이 있어서, 좋은 사진이 있으면 `image`에 직접 적는다.
 */

import { pressImagesByUrl } from "./press-images.generated";

export type PressKind = "보도자료" | "기고" | "인터뷰";

export interface PressItem {
  /** 기사 원문 제목 그대로 */
  title: string;
  outlet: string;
  /** YYYY-MM-DD (지면이 아니라 화면 표기 발행일) */
  date: string;
  kind: PressKind;
  url: string;
  /** 관련 고객사가 있으면 표기. entities/client의 이름과 맞춘다. */
  client?: string;
  /** public/press/ 아래 대표 이미지. 없으면 카드가 활자만으로 조판된다. */
  image?: string;
}

const items: readonly PressItem[] = [
  // public/press/에 있는 사진은 전부 쓴다. 사진이 있으면 카드가 사진을 주인으로 조판하고,
  // 없으면 브랜드 그라디언트 패널로 대체된다(PressCard).
  {
    title: "히포크랏랩스-서강대, '진료 요약 AI' 공동연구",
    outlet: "데일리메디",
    date: "2026-04-02",
    kind: "보도자료",
    client: "히포크랏랩스",
    url: "https://www.dailymedi.com/news/news_view.php?wr_id=935239",
    image: "/press/dailymedi-hippocrat.jpg",
  },
  {
    title:
      "더그림엔터-서강대 박현규 연구실, K웹툰 AI 자동변환 시스템 공동 개발",
    outlet: "이데일리 마켓in",
    date: "2026-03-26",
    kind: "보도자료",
    client: "더그림 엔터테인먼트",
    url: "https://marketin.edaily.co.kr/News/Read?newsId=04687126645387256",
    image: "/press/edaily-thegrim.jpg",
  },
  {
    title: '코딩툴로 생산성 끌어올린다…"AI 없는 개발은 침몰하는 배"',
    outlet: "디지털데일리",
    date: "2026-03-18",
    kind: "인터뷰",
    url: "https://www.ddaily.co.kr/page/view/2026031715504122119",
    image: "/press/ddaily-interview.jpg",
  },
  {
    title: "[기고] AI노동력을 평가하는 시대가 온다",
    outlet: "전자신문",
    date: "2026-02-25",
    kind: "기고",
    url: "https://www.etnews.com/20260225000073",
  },
  {
    title: "[기고]산업 AI 확산, '평가 솔루션'에 달렸다",
    outlet: "머니투데이",
    date: "2026-02-25",
    kind: "기고",
    url: "https://www.mt.co.kr/opinion/2026/02/25/2026022413274636886",
    image: "/press/mt-ai-evaluation.avif",
  },
  {
    title: '"AI 개발툴도 강하다"…LG CNS, \'AIND\'로 엔터프라이즈 승부수',
    outlet: "ZDNet Korea",
    date: "2026-02-11",
    kind: "보도자료",
    client: "LG CNS",
    url: "https://zdnet.co.kr/view/?no=20260211100416",
  },
  {
    title: "LG CNS, AI 코딩툴 생산성 효과 입증…깃허브 코파일럿보다 2배↑",
    outlet: "디지털데일리",
    date: "2026-02-11",
    kind: "보도자료",
    client: "LG CNS",
    url: "https://www.ddaily.co.kr/page/view/2026021110073163811",
  },
];

export const pressItems: readonly PressItem[] = [...items]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((item) => ({
    ...item,
    // 사진은 자동으로 붙는다: 위에 직접 적은 `image`가 우선이고,
    // 없으면 `node scripts/fetch-press-images.mjs`가 받아 둔 기사 og:image를 쓴다.
    // 둘 다 없으면 PressCard가 브랜드 그라디언트 패널로 조판한다.
    image: item.image ?? pressImagesByUrl[item.url],
  }));

export function hasPress() {
  return pressItems.length > 0;
}

/** 랜딩처럼 자리가 한정된 곳에서 쓰는 최신 N건. */
export function latestPress(count: number) {
  return pressItems.slice(0, count);
}

/** 유형별 건수 — 목록이 길어졌을 때 필터 UI의 근거. */
export function pressCountByKind() {
  return pressItems.reduce<Record<PressKind, number>>(
    (acc, item) => {
      acc[item.kind] += 1;
      return acc;
    },
    { 보도자료: 0, 기고: 0, 인터뷰: 0 }
  );
}

export function formatPressDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}
