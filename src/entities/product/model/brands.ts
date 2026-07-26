/**
 * 회사의 두 사업(BM)을 각각 대표하는 제품 브랜드.
 * 출처: docs/company-profile.md §1·§3.
 *
 * ⚠️ 표기는 **`buildAI.` / `turing.`** 로 고정한다. AI만 대문자이고 마침표가 붙는다.
 * "buildai." "Buildai" "BuildAi" "Turing"처럼 쓰지 않는다. 화면·메타데이터 전부 이 표기다.
 *
 * ⚠️ 화면에 조판할 때는 반드시 `<ProductMark name={...} />`를 쓴다.
 * 가장 두꺼운 웨이트 + 마침표 Teal + 좁은 자간이 그 컴포넌트에 들어 있다.
 * 문장 속에 그냥 문자열로 박으면 그 규칙이 빠진다.
 *
 * 두 사업의 관계: buildAI.로 만든 AI를 turing.이 계속 지킨다.
 * 그래서 이 목록은 상품 두 개의 나열이 아니라 한 회사의 앞뒤다.
 */

export interface ProductBrand {
  key: "buildai" | "turing";
  /** 표기명. 마침표를 포함한다. 예: "buildAI." */
  name: string;
  /** 무엇인지 한 줄로 */
  role: string;
  headline: string;
  body: string;
  href: string;
  /** 이 사업을 증명하는 고객사. entities/client의 이름과 맞춘다. */
  proof: readonly string[];
  /** 화면에서 톤을 올리는 쪽(주력) */
  primary?: boolean;
}

export const productBrands: readonly ProductBrand[] = [
  {
    key: "buildai",
    name: "buildAI.",
    role: "기업용 AI 구축",
    headline: "그 회사에만 맞는 AI를 설계해 만듭니다",
    body: "업무와 요구사항을 먼저 분석하고, 거기에 최적화된 AI 시스템을 설계해 납품합니다. 대기업·공공·중견·스타트업을 모두 직접 다뤄 왔습니다.",
    proof: ["LG CNS", "현대NGV", "더그림 엔터테인먼트"],
    href: "/products/buildai",
  },
  {
    key: "turing",
    name: "turing.",
    role: "AI 운영 자동화",
    headline: "만든 AI가 계속 제 성능을 내게 합니다",
    body: "AI는 운영 환경이 변하면 반드시 흔들립니다. turing.은 그 흔들림을 매일 측정하고, 원인을 찾아내고, 서비스를 멈추지 않은 채 되돌립니다.",
    proof: ["히포크랏랩스", "STEPI"],
    href: "/products/turing",
    primary: true,
  },
] as const;

export const buildai = productBrands[0];
export const turing = productBrands[1];
