import { Fragment } from "react";

/** 한글 ↔ 영문·숫자 경계. */
const BOUNDARY = /(?<=[가-힣])(?=[A-Za-z0-9])|(?<=[A-Za-z0-9])(?=[가-힣])/;

/**
 * Word의 "한글과 숫자/영어 사이 간격 자동 조절"(autoSpaceDN/DE) 재현.
 * "제1조" → "제 1 조"처럼 경계에 1/4em 간격을 둔다.
 * 빈 inline-block 대신 margin을 써서 경계에서 줄이 끊기지 않게 한다.
 */
export function AutoSpace({ text }: { text: string }) {
  const parts = text.split(BOUNDARY);
  return (
    <>
      {parts.map((p, i) =>
        i === 0 ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <span key={i} className="ml-[0.25em]">
            {p}
          </span>
        )
      )}
    </>
  );
}
