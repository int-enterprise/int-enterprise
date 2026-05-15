export const company = {
  legalNameKo: "주식회사 인트",
  legalNameKoShort: "(주)인트",
  legalNameEn: "Int Corp.",
  brand: "int.",
  foundedAt: "2026.04.23",
  foundedYear: 2026,
  ceo: "박현규",
  ceoTitle: "Founder & CEO",
  businessRegistrationNumber: "158-88-03793",
  corporateRegistrationNumber: "1101110-956986",
  address: {
    full: "서울특별시 마포구 서강대길 22 2층 6호",
    line1: "서울특별시 마포구 서강대길 22",
    line2: "2층 6호",
    postalCode: "04107",
    naverMapQuery: "서울특별시 마포구 서강대길 22",
    naverMapLink:
      "https://map.naver.com/p/search/%EC%84%9C%EA%B0%95%EB%8C%80%EA%B8%B8%2022",
  },
  contact: {
    phone: "0507-1336-0775",
    email: "info@intcorp.ai",
  },
  tagline: "변화에 적응하는 기업용 AI",
  description:
    "변화하는 환경에서도 안정적으로 작동하는 기업용 AI 운영의 표준을 만들어 가는 회사입니다.",
  social: {
    linkedin: "",
    github: "",
  },
} as const;

export type Company = typeof company;

export function copyright(year: number = new Date().getUTCFullYear()) {
  const startYear = company.foundedYear;
  const range = year > startYear ? `${startYear}–${year}` : `${startYear}`;
  return `© ${range} ${company.legalNameEn}. All rights reserved.`;
}
