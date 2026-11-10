import type { LegalSection } from "../model/types";
import { AutoSpace } from "./autospace";
import { word } from "./word-styles";

interface LegalArticleProps {
  index: number;
  section: LegalSection;
}

/** 계약서 형식의 한 조항: "제N조 (제목)" + 항(1.) + 호((1)). 단락 간격 없음. */
export function LegalArticle({ index, section }: LegalArticleProps) {
  return (
    <section>
      <h2 className={word.heading}>
        <AutoSpace text={`제${index}조 (${section.heading})`} />
      </h2>
      <ol>
        {section.clauses.map((c, i) => (
          <li key={i}>
            <p className={word.clause}>
              <span className={word.clauseNo}>{i + 1}.</span>
              <AutoSpace text={c.text} />
            </p>
            {c.items && (
              <ol>
                {c.items.map((it, j) => (
                  <li key={j} className={word.item}>
                    <span className={word.itemNo}>({j + 1})</span>
                    <AutoSpace text={it} />
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
