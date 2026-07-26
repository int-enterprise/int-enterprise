import { cn } from "@/shared/lib";

/**
 * 제품 워드마크 — `buildAI.` `turing.`
 *
 * 표기 규칙(int. 로고와 같은 규칙이다):
 *   1) **가장 두꺼운 웨이트.** Pretendard Variable을 45~920으로 실었으니 920이 최대다.
 *      `font-black`(900)이 아니라 `font-[920]`을 쓴다.
 *   2) **마침표는 Accent(Teal).** 브랜드 가이드라인의 로고 규칙이다
 *      (다크 배경 위 흰 글자 + 틸 점 / 라이트 배경 위 검정 글자 + 틸 점).
 *   3) **자간을 조금 좁게.** 헤딩 기본(-0.025em)보다 살짝 더 좁힌다.
 *
 * ⚠️ "흰 배경 위에 Teal 텍스트 금지" 규칙의 유일한 예외다.
 * 마침표는 읽어야 하는 글자가 아니라 브랜드 마크의 일부다.
 * 이 컴포넌트 밖에서 제품명을 직접 조판하지 않는다 — 규칙이 갈라진다.
 */
export function ProductMark({
  name,
  className,
}: {
  /** 마침표를 포함한 표기명. 예: "buildAI." */
  name: string;
  className?: string;
}) {
  const hasDot = name.endsWith(".");
  const base = hasDot ? name.slice(0, -1) : name;

  return (
    // ⚠️ `normal-case`는 필수다. Eyebrow처럼 `uppercase`가 걸린 곳 안에 들어가면
    // buildAI.가 BUILDAI.로 찍혀 소문자 표기 규칙이 깨진다.
    // ⚠️ 글자색을 기본값으로 못박는다. 상속에 맡기면 Eyebrow(text-accent) 안에서
    // 글자까지 틸이 되어 "흰 배경 위 Teal 텍스트 금지"를 어긴다(틸은 마침표만).
    // 다른 색이 필요하면 className으로 덮는다 — twMerge가 뒤쪽을 이긴다.
    <span
      className={cn(
        "font-[920] normal-case tracking-[-0.035em] text-heading",
        className
      )}
    >
      {base}
      {hasDot ? <span className="text-accent">.</span> : null}
    </span>
  );
}
