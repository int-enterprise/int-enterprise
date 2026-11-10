import { company } from "@/entities/company";
import { word } from "./word-styles";

const rows = [
  { label: "상호", value: company.legalNameKo },
  { label: "대표자", value: company.ceo },
  { label: "주소", value: company.address.full },
  { label: "사업자등록번호", value: company.businessRegistrationNumber },
  { label: "대표전화", value: company.contact.phone },
  { label: "이메일", value: company.contact.email },
];

/** 균등 분할 라벨: Word에서 공백으로 맞춘 "소          속 :" 형태를 재현. */
function SpreadLabel({ text }: { text: string }) {
  return (
    <span className="inline-flex items-baseline">
      <span className="inline-flex w-[7em] justify-between">
        {[...text].map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </span>
      <span className="ml-[0.3em]">:</span>
    </span>
  );
}

/** 문서 하단 시행 문구 + 날짜 + 회사 정보(계약서 서명란 표 형식, 테두리 없음). */
export function LegalIssuer({
  closing,
  effectiveDate,
}: {
  closing: string;
  effectiveDate: string;
}) {
  return (
    <footer className={word.sign}>
      {/* 원본: 마지막 조항 뒤 빈 단락 3줄, 문구·날짜 사이 2줄, 날짜·표 사이 2줄 */}
      <div className={word.blankLine12} />
      <div className={word.blankLine12} />
      <div className={word.blankLine12} />
      <p className={word.closing}>{closing}</p>
      <div className={word.blankLine12} />
      <div className={word.blankLine12} />
      <p className={word.closing}>{effectiveDate}</p>
      <div className={word.blankLine12} />
      <div className={word.blankLine12} />
      {/* 데스크톱: Word 표 열 비율 796 : 3740 : 4490 (twip), 행 간격·테두리 없음.
          모바일: 첫 열을 숨기고 "라벨 : 값" 2열로. */}
      <dl className="grid grid-cols-[auto_1fr] gap-x-[0.6em] sm:grid-cols-[8.8%_41.4%_49.8%] sm:gap-x-0">
        {rows.map((r, i) => (
          <div key={r.label} className="contents">
            <span className="hidden sm:block">
              {i === 0 ? "( 회사 )" : ""}
            </span>
            <dt>
              <SpreadLabel text={r.label} />
            </dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
    </footer>
  );
}
