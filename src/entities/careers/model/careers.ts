/** 출처: docs/company-profile.md §9 + 대표 확인 사항 */

/**
 * int. 인재상.
 *
 * 형식: 영문 키워드 + 한글 한 줄. 다섯 줄이 이어서 **한 문장으로 읽히도록** 썼다
 * ("주인의식을 가지고 … 한 걸음 앞을 보는 사람"). 국내 기업 인재상 페이지의 통상 형식이다.
 *
 * ⚠️ 항목을 직설적으로 적지 않는다. "일을 빨리 한다" "소통을 잘한다"처럼 쓰면
 * 요구사항 목록이 되어 읽는 사람이 자기 이야기로 받아들이지 못한다.
 * 행동으로 바꿔 적는다("미루지 않고 오늘 안에 움직이고").
 *
 * `icon`은 lucide-react 아이콘 이름이다 — 매핑은 widget이 한다.
 */
export interface TalentValue {
  icon: "crown" | "flame" | "zap" | "speech" | "telescope";
  /** 영문 키워드(대문자로 조판된다) */
  key: string;
  /** 이어 읽히는 한글 한 줄 */
  line: string;
}

export const talentValues: readonly TalentValue[] = [
  { icon: "crown", key: "Ownership", line: "주인의식을 가지고" },
  { icon: "flame", key: "Passion", line: "열정과 몰입으로 도전하며" },
  { icon: "zap", key: "Speed", line: "미루지 않고 오늘 안에 움직이고" },
  { icon: "speech", key: "Openness", line: "막히기 전에 먼저 말을 꺼내며" },
  { icon: "telescope", key: "Depth", line: "시킨 일의 한 걸음 앞을 보는" },
] as const;

/** 다섯 줄 뒤에 붙는 맺음말 */
export const talentClosing = "그런 분과 함께 일하고 싶습니다.";

/**
 * 복지·지원.
 *
 * `icon`은 lucide-react의 아이콘 이름이다 — 실제 매핑은 widget이 한다
 * (entities가 아이콘 컴포넌트를 직접 들고 있으면 뷰 의존이 섞인다).
 *
 * ⚠️ 확인된 것만 적는다. 국내 회사가 흔히 넣는 항목이라도 우리가 실제로 하지 않으면 넣지 않는다.
 */
export interface Benefit {
  icon:
    | "clock"
    | "house"
    | "cookie"
    | "utensils"
    | "graduation"
    | "book"
    | "laptop"
    | "wallet"
    | "trending";
  /** 두 줄로 끊어 적는다 — 아이콘 격자에서 줄 길이가 들쭉날쭉하면 지저분하다 */
  title: string;
  detail: string;
}

export const benefits: readonly Benefit[] = [
  { icon: "clock", title: "유연근무제", detail: "코어타임 10–19시" },
  { icon: "house", title: "주 1회 재택", detail: "집중이 필요한 날에" },
  { icon: "cookie", title: "간식 상시 제공", detail: "언제든 꺼내 먹기" },
  { icon: "utensils", title: "야근 시 저녁식사", detail: "교통비까지 지급" },
  { icon: "graduation", title: "학회 참가 지원", detail: "논문 게재 비용 포함" },
  { icon: "book", title: "교육 지원", detail: "직무 역량 개발" },
  { icon: "laptop", title: "장비·소프트웨어", detail: "필요한 만큼 전액" },
  { icon: "wallet", title: "반기 성과급", detail: "성과는 반기마다" },
  { icon: "trending", title: "스톡옵션", detail: "2년 베스팅" },
] as const;

/**
 * 채용 공고.
 *
 * ⚠️ **빈 배열이면 "진행 중인 공고 없음"으로 표시된다.** 가짜 공고를 채우지 않는다.
 * 공고가 열리면 여기에 항목을 넣기만 하면 목록이 살아난다.
 */
export interface JobPosting {
  id: string;
  title: string;
  /** 직군 — 예: "AI 연구" */
  track: string;
  employment: "정규직" | "계약직" | "인턴";
  location: string;
  summary: string;
  /** 채용 절차가 공고마다 다르면 여기에 적는다 */
  responsibilities?: readonly string[];
  requirements?: readonly string[];
}

export const jobPostings: readonly JobPosting[] = [];

/** 상시 지원 안내 — 공고가 없어도 지원 경로는 열어 둔다 */
export const applicationGuide = {
  subject: "[채용 지원] 지원자 성함 / 희망 직군",
  steps: [
    "희망 직군과 지원 동기를 적어 주세요.",
    "경력기술서 또는 작업물(GitHub, 포트폴리오, 논문 무엇이든)을 첨부해 주세요.",
  ],
} as const;

/** 채용 절차 — 일반적인 단계만 적는다 */
export const hiringProcess = [
  { step: "서류 전형", detail: "경력기술서와 작업물을 봅니다." },
  { step: "실무 인터뷰", detail: "맡을 문제를 놓고 함께 이야기합니다." },
  { step: "대표 인터뷰", detail: "일하는 방식이 맞는지 확인합니다." },
  { step: "처우 협의 · 입사", detail: "조건을 맞추고 합류 일정을 정합니다." },
] as const;
