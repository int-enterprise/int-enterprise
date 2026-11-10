/** 조항 안의 항(1., 2., …). items는 그 아래 호((1), (2), …). */
export interface LegalClause {
  text: string;
  items?: string[];
}

/** 하나의 조(제 N 조 (heading)). */
export interface LegalSection {
  heading: string;
  clauses: LegalClause[];
}
