// Unsplash 사진(상업 사용 가능) URL 모음.
// 실제 자체 촬영본 또는 라이센스 확보한 이미지로 교체할 때 이 한 파일만 손보면 된다.

const u = (id: string, q = 80, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const images = {
  hero: {
    src: u("photo-1497366216548-37526070297c"),
    alt: "정돈된 워크스페이스",
    credit: "Photo · Unsplash",
  },
  about: {
    src: u("photo-1497366811353-6870744d04b2"),
    alt: "현대적인 사무 환경",
    credit: "Photo · Unsplash",
  },
  history: {
    src: u("photo-1454165804606-c3d57bc86b40"),
    alt: "전략 화이트보드",
    credit: "Photo · Unsplash",
  },
  location: {
    src: u("photo-1554244933-d876deb6b2ff"),
    alt: "서울 도심 풍경",
    credit: "Photo · Unsplash",
  },
  ceo: {
    src: u("photo-1517694712202-14dd9538aa97"),
    alt: "기술 작업 환경",
    credit: "Photo · Unsplash",
  },
  careers: {
    src: u("photo-1556761175-5973dc0f32e7"),
    alt: "팀 협업",
    credit: "Photo · Unsplash",
  },
  turing: {
    src: u("photo-1518770660439-4636190af475"),
    alt: "데이터 인프라",
    credit: "Photo · Unsplash",
  },
  clients: {
    src: u("photo-1542744095-291d1f67b221"),
    alt: "비즈니스 협업",
    credit: "Photo · Unsplash",
  },
  partners: {
    src: u("photo-1521737711867-e3b97375f902"),
    alt: "파트너십 미팅",
    credit: "Photo · Unsplash",
  },
  insights: {
    src: u("photo-1486718448742-163732cd1544"),
    alt: "조망과 사고",
    credit: "Photo · Unsplash",
  },
  contact: {
    src: u("photo-1503676260728-1c00da094a0b"),
    alt: "연결과 소통",
    credit: "Photo · Unsplash",
  },
  workspace: {
    src: u("photo-1497366754035-f200968a6e72"),
    alt: "워크스페이스",
    credit: "Photo · Unsplash",
  },
} as const;

export type ImageKey = keyof typeof images;
