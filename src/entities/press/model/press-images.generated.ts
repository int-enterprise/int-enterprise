/**
 * 자동 생성 파일 — 직접 고치지 않는다.
 * `node scripts/fetch-press-images.mjs`가 기사 URL의 og:image를 받아 만든 매핑이다.
 *
 * 기사를 추가하거나 이미지가 바뀌었으면 그 스크립트를 다시 돌린다.
 * press.ts의 `image`를 직접 적으면 그 값이 이 매핑을 이긴다(수동 우선).
 */
export const pressImagesByUrl: Readonly<Record<string, string>> = {
  "https://www.etnews.com/20260225000073": "/press/auto/etnews-20260225.png",
  "https://zdnet.co.kr/view/?no=20260211100416": "/press/auto/zdnet-20260211.png",
  "https://www.ddaily.co.kr/page/view/2026021110073163811": "/press/auto/ddaily-20260211.jpg"
};
