import type { LegalSection } from "../model/types";
import { LegalArticle } from "./legal-article";
import { LegalIssuer } from "./legal-issuer";
import { word } from "./word-styles";
import { AutoSpace } from "./autospace";

interface LegalDocProps {
  title: string;
  preamble?: string;
  /** 하단 시행 문구. 예: "본 약관은 2026년 5월 1일부터 시행한다." */
  closing: string;
  effectiveDate: string;
  sections: LegalSection[];
}

/**
 * Word 문서(A4, 좌우 여백 1인치 → 본문 폭 약 159mm)처럼 보이는 법률 문서.
 * 단락 간격 없이 빈 줄로만 구분하고, 색·장식은 쓰지 않는다.
 */
export function LegalDoc({
  title,
  preamble,
  closing,
  effectiveDate,
  sections,
}: LegalDocProps) {
  return (
    <section className="w-full bg-canvas">
      <article
        className={`mx-auto w-full max-w-[calc(159mm+2.5rem)] px-5 py-16 sm:py-24 ${word.body}`}
      >
        <h1 className={word.title}>
          <AutoSpace text={title} />
        </h1>
        <div className={word.blankLine} />
        <div className={word.blankLine} />
        {preamble && (
          <>
            <p className={word.heading}>
              <AutoSpace text={preamble} />
            </p>
            <div className={word.blankLine} />
          </>
        )}
        {sections.map((s, idx) => (
          <div key={s.heading}>
            {idx > 0 && <div className={word.blankLine} />}
            <LegalArticle index={idx + 1} section={s} />
          </div>
        ))}
        <LegalIssuer closing={closing} effectiveDate={effectiveDate} />
      </article>
    </section>
  );
}
