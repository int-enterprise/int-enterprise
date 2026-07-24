/**
 * 법인 등기·사업자등록 기준의 사실 정보. 마케팅 카피를 여기에 섞지 않는다.
 * 값이 바뀌면 JSON-LD(Organization)와 푸터가 동시에 따라온다.
 */
export const company = {
  legalNameKo: "주식회사 인트",
  legalNameKoShort: "(주)인트",
  legalNameEn: "Int Corp.",
  brand: "int.",
  foundedAt: "2026.04.23",
  foundedYear: 2026,
  ceo: "박현규",
  ceoNameEn: "Park Hyungyu",
  ceoTitle: "Founder & CEO",
  businessRegistrationNumber: "158-88-03793",
  corporateRegistrationNumber: "1101110-956986",
  address: {
    full: "서울특별시 마포구 서강대길 22 2층 6호",
    line1: "서울특별시 마포구 서강대길 22",
    line2: "2층 6호",
    postalCode: "04107",
    lat: 37.5505,
    lng: 126.9408,
    kakaoMapLink:
      "https://map.kakao.com/link/search/서울특별시 마포구 서강대길 22",
    naverMapLink:
      "https://map.naver.com/p/search/%EC%84%9C%EA%B0%95%EB%8C%80%EA%B8%B8%2022",
  },
  contact: {
    phone: "0507-1336-0775",
    email: "info@intcorp.ai",
  },
  transit: [
    { line: "6호선", station: "광흥창역", detail: "도보 6분" },
    { line: "경의중앙선", station: "서강대역", detail: "도보 9분" },
  ],
} as const;

export type Company = typeof company;

export function copyright(year: number = new Date().getUTCFullYear()) {
  const start = company.foundedYear;
  const range = year > start ? `${start}–${year}` : `${start}`;
  // legalNameEn이 이미 "Int Corp."로 마침표를 포함한다. 마침표를 덧붙이지 않는다.
  return `© ${range} ${company.legalNameEn} All rights reserved.`;
}

/** 푸터·회사 페이지가 공유하는 법인 정보 항목. */
export const corporateFacts = [
  { term: "상호", value: company.legalNameKo },
  { term: "대표", value: company.ceo },
  { term: "설립", value: company.foundedAt },
  { term: "사업자등록번호", value: company.businessRegistrationNumber },
  { term: "법인등록번호", value: company.corporateRegistrationNumber },
  { term: "주소", value: company.address.full },
] as const;
