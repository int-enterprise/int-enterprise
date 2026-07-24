import { company } from "./company";

export interface CredentialGroup {
  label: string;
  items: readonly string[];
}

export const founder = {
  name: company.ceo,
  nameEn: company.ceoNameEn,
  title: company.ceoTitle,
  /** 모노그램 placeholder에 쓰는 이니셜. 정식 프로필 사진 확보 시 교체. */
  initials: "PH",
  quote:
    "AI 모델을 만드는 경쟁은 이미 평준화됐습니다. 다음 전장은 만들어 둔 AI를 현장에서 흔들림 없이 굴려 내는 능력입니다. 그 규칙을 한국에서 가장 먼저 쓰려고 (주)인트를 시작했습니다.",
  credentials: [
    {
      label: "Academia",
      items: [
        "Univ. of Cambridge 기술경영학 박사",
        "기술경영전문대학원 부교수",
        "3년 연속 연구업적 우수교원",
      ],
    },
    {
      label: "Industry",
      items: [
        "前 LG CNS 정보기술연구소 선임연구원",
        "레버리지 투자조합 1·2·3호 GP",
        "초기 스타트업 투자 선진화상 수상",
      ],
    },
  ] as readonly CredentialGroup[],
} as const;

export type Founder = typeof founder;
