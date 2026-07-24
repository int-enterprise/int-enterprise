import { Container, DefinitionList, Section } from "@/shared/ui";
import { company } from "@/entities/company";
import { ContactForm } from "@/features/contact-form";

/** 문의 — 좌 텍스트/연락처, 우 폼(카드). */
export function ContactDetail() {
  const channels = [
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
    { term: "주소", value: company.address.full },
    { term: "응답", value: "영업일 기준 1–2일 이내" },
  ];

  return (
    <Section rhythm="default">
      <Container className="grid gap-12 px-0 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-[1.3] tracking-[-0.02em] text-display sm:text-3xl">
              어떤 업무를 AI에 맡기고 싶으신가요
            </h2>
            <p className="max-w-[46ch] text-lg font-light leading-[1.7] text-body">
              도입 검토 단계가 아니어도 괜찮습니다. 지금 무엇이 막혀 있는지만
              알려주시면 실현 가능한 범위를 정리해 회신드립니다.
            </p>
          </div>
          <DefinitionList items={channels} className="sm:grid-cols-2" />
        </div>

        <div className="rounded-lg border border-line bg-canvas p-8 shadow-soft sm:p-10">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
