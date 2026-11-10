/**
 * 참여계약서(.docx) 서식을 그대로 옮긴 값. 단위는 Word와 같은 pt.
 * - 단락 간격 0(간격 없음), 줄 간격 "1줄" ≈ 1.42배(Pretendard 기준)
 * - 조항 사이 빈 줄 = 10pt 빈 단락 1줄 = 10pt × 1.42
 * - 항 "1." : 왼쪽 644twip(32.2pt), 내어쓰기 360twip(18pt)
 * - 호 "(1)": 왼쪽 1060twip(53pt), 내어쓰기 360twip(18pt)
 */
export const word = {
  body: "text-[11pt] leading-[1.42] text-gray-100",
  title: "text-center text-[20pt] font-bold leading-[1.42]",
  heading: "text-justify font-bold",
  /** 빈 단락(10pt, 간격 없음) 한 줄 높이 */
  blankLine: "h-[14.2pt]",
  /** 하단 서명 영역의 빈 단락(12pt) 한 줄 높이 */
  blankLine12: "h-[17pt]",
  clause: "relative pl-[32.2pt] text-justify",
  clauseNo: "absolute left-[14.2pt]",
  item: "relative pl-[53pt] text-justify",
  itemNo: "absolute left-[35pt]",
  closing: "text-center text-[12pt] font-bold leading-[1.42]",
  /** 간격 없음 스타일은 줄 바꿈 시 단어 잘림 허용(wordWrap=0) */
  sign: "text-[12pt] leading-[1.42] [word-break:normal]",
} as const;
