/**
 * 참여계약서(.docx) 서식을 옮긴 값.
 * 데스크톱(sm 이상)은 Word와 같은 pt, 모바일은 글자를 줄인다.
 * 들여쓰기·빈 줄은 em으로 적어 글자 크기에 맞춰 함께 줄어든다.
 *
 * Word 원본 (본문 11pt 기준 → em 환산)
 * - 단락 간격 0(간격 없음), 줄 간격 "1줄" ≈ 1.42배
 * - 조항 사이 빈 줄 = 10pt 빈 단락 1줄 = 14.2pt → 1.29em
 * - 항 "1." : 왼쪽 32.2pt(2.93em), 번호 위치 14.2pt(1.29em)
 * - 호 "(1)": 왼쪽 53pt(4.82em), 번호 위치 35pt(3.18em)
 * - 하단(12pt) 빈 줄 = 1.42em
 */
export const word = {
  body: "text-[13px] sm:text-[11pt] leading-[1.42] text-gray-100",
  title: "text-center text-[20px] sm:text-[20pt] font-bold leading-[1.42]",
  heading: "text-justify font-bold",
  /** 빈 단락(10pt, 간격 없음) 한 줄 높이 */
  blankLine: "h-[1.29em]",
  clause: "relative pl-[2.93em] text-justify",
  clauseNo: "absolute left-[1.29em]",
  item: "relative pl-[4.82em] text-justify",
  itemNo: "absolute left-[3.18em]",
  /** 하단 서명 영역(Word 12pt). 간격 없음 스타일은 글자 단위 줄바꿈(wordWrap=0) */
  sign: "text-[14px] sm:text-[12pt] leading-[1.42] [word-break:normal]",
  /** 하단 서명 영역의 빈 단락(12pt) 한 줄 높이 */
  blankLine12: "h-[1.42em]",
  closing: "text-center font-bold",
} as const;
