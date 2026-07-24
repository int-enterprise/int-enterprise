import { Container, DefinitionList, Section } from "@/shared/ui";
import { company } from "@/entities/company";
import { OfficeMap } from "@/features/map";

export function LocationSection() {
  const contact = [
    { term: "주소", value: company.address.full },
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
    {
      term: "가까운 역",
      value: company.transit
        .map((t) => `${t.line} ${t.station} ${t.detail}`)
        .join(" · "),
    },
  ];

  return (
    <Section rhythm="large" id="location">
      <Container className="px-0">
        <h2 className="mx-auto max-w-[20ch] text-center text-[2rem] font-bold leading-[1.14] tracking-[-0.03em] text-display sm:text-[2.5rem]">
          마포 서강대길에 있습니다
        </h2>
      </Container>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col justify-between gap-8 rounded-lg border border-line bg-canvas p-9 shadow-soft">
          <DefinitionList items={contact} />
          <a
            href={company.address.kakaoMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-sm border border-line-strong px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-primary"
          >
            카카오맵에서 길찾기
            <span aria-hidden>→</span>
          </a>
        </div>

        <OfficeMap className="min-h-[380px] overflow-hidden rounded-lg border border-line shadow-soft" />
      </div>
    </Section>
  );
}
