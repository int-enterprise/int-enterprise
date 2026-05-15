export interface Article {
  title: string;
  publisher: string;
  date: string;
  excerpt: string;
  href?: string;
  imageUrl?: string;
  placeholder?: boolean;
}

// 실제 보도자료/기사 URL이 확정되면 articles 배열을 채워 넣고,
// placeholderArticles는 빈 상태에서 안내용으로만 사용합니다.
export const articles: readonly Article[] = [];

export const placeholderArticles: readonly Article[] = [
  {
    title: "(주)인트, 변화 적응형 AI 운영 솔루션 turing. 공개 예정",
    publisher: "보도자료 (예시)",
    date: "발행 예정",
    excerpt:
      "기업의 AI를 매일 점검하고, 가장 먼저 이상을 알아채고, 안전하게 회복합니다. (주)인트의 첫 제품 turing.이 곧 공개됩니다.",
    placeholder: true,
  },
  {
    title: "박현규 대표 인터뷰: AI는 운영의 시대로",
    publisher: "인터뷰 (예시)",
    date: "발행 예정",
    excerpt:
      "AI 모델 개발의 시대는 평준화됐다. 다음 전장은 운영이다. (주)인트가 그리는 변화 적응형 AI의 미래.",
    placeholder: true,
  },
  {
    title: "TIPS 선정 (주)인트, AI 운영 자동화 R&D 본격화",
    publisher: "스타트업뉴스 (예시)",
    date: "발행 예정",
    excerpt:
      "(주)인트는 AI 운영 자동화 솔루션 R&D로 TIPS 일반트랙에 신청. 3년간 변화 적응형 AI 운영 솔루션을 고도화합니다.",
    placeholder: true,
  },
] as const;
