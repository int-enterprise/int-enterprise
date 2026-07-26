import { Container, DefinitionList, Section } from "@/shared/ui";
import { company } from "@/entities/company";
import { OfficeMap } from "@/features/map";

/**
 * 오시는 길.
 *
 * ⚠️ 제목은 문장이 아니라 이름이다("광흥창역에서 걸어서 6분입니다" 같은 문장 금지).
 * 탭·앵커와 같은 말로 맞춰 두면 어디에 있는지 바로 안다.
 *
 * 지도는 카드 뒤에 숨기지 않고 바로 띄운다(features/map이 키 없이도 지도를 그린다).
 */
export function LocationSection() {
  const contact = [
    { term: "주소", value: company.address.full },
    {
      term: "가까운 역",
      value: company.transit
        .map((t) => `${t.line} ${t.station} ${t.detail}`)
        .join(" · "),
    },
    {
      term: "이메일",
      value: (
        <a
          href={`mailto:${company.contact.email}`}
          className="text-heading underline-offset-4 hover:underline"
        >
          {company.contact.email}
        </a>
      ),
    },
    { term: "대표전화", value: company.contact.phone },
  ];

  return (
    <Section rhythm="large" id="location">
      <Container className="px-0">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Location
          </p>
          <h2 className="text-[2rem] leading-[1.16] tracking-[-0.03em] text-display sm:text-[2.5rem]">
            오시는 길
          </h2>
        </div>
      </Container>

      {/* 지도가 넓고 정보가 좁다 — 위치 페이지에서 주인공은 지도다 */}
      <div className="mt-12 overflow-hidden rounded-lg border border-line shadow-soft">
        <OfficeMap className="h-[380px] sm:h-[440px]" />
        <div className="grid gap-x-10 gap-y-6 border-t border-line bg-canvas p-8 sm:p-10">
          <DefinitionList items={contact} className="sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      </div>
    </Section>
  );
}
