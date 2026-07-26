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
  /**
   * /about 인사말 본문. 대표가 1인칭으로 하는 말이므로 마케팅 문구를 섞지 않는다.
   * ⚠️ 제품명을 괄호로 끼워 넣지 않는다(buildAI.·turing. 같은 표기는 제품 페이지의 몫이다).
   * 사실 근거: docs/company-profile.md §1·§5.
   */
  greeting: [
    "AI 모델을 만드는 경쟁은 이미 평준화됐습니다. 남는 문제는 만들어 둔 AI를 현장에서 흔들림 없이 굴려 내는 일입니다.",
    "업종을 가리지 않고 대기업과 공공기관, 중견기업과 스타트업의 AI를 직접 만들고 운영해 왔습니다. 그 과정에서 확인한 것은 문제가 대개 만드는 단계가 아니라 만든 다음에 생긴다는 사실이었습니다.",
    "그래서 저희는 납품에서 관계를 끝내지 않습니다. 운영을 계속 맡아 데이터를 쌓고, 그 데이터로 다시 제품을 키웁니다. 오래 붙잡을 문제를 골랐고, 오래 함께할 팀을 만들고 있습니다.",
  ] as readonly string[],
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
