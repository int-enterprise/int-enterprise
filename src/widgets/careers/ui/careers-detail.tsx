import Link from "next/link";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Container,
  Section,
  SectionHeader,
} from "@/shared/ui";
import { applicationGuide, roles, workingPolicies } from "@/entities/careers";
import { company } from "@/entities/company";

const mailto = `mailto:${company.contact.email}?subject=${encodeURIComponent(
  applicationGuide.subject
)}`;

export function CareersDetail() {
  return (
    <>
      <Section rhythm="large" id="roles">
        <SectionHeader eyebrow="Open roles" title="지금 찾고 있는 동료" />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.title} className="flex flex-col gap-5 p-8" interactive>
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-accent">
                  {role.track}
                </span>
                <CardTitle>{role.title}</CardTitle>
              </div>
              <CardText>{role.description}</CardText>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {role.focus.map((f) => (
                  <li
                    key={f}
                    className="rounded-pill border border-line px-3 py-1.5 text-xs text-body"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section rhythm="large" soft>
        <SectionHeader
          eyebrow="How we work"
          title="오래 붙잡는 리듬을 지키는 방식"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {workingPolicies.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-2 rounded-lg border border-line bg-canvas p-8 shadow-soft"
            >
              <h3 className="text-lg font-semibold text-heading">{p.title}</h3>
              <p className="text-[0.95rem] font-light leading-[1.7] text-body">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section rhythm="large" id="apply">
        <Container>
          <div className="bg-brand-gradient relative overflow-hidden rounded-lg px-8 py-14 shadow-lift sm:px-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(50% 60% at 25% 0%, rgba(255,255,255,0.25), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col items-center gap-7 text-center">
              <h2 className="max-w-[20ch] text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] text-gray-0 sm:text-[2.25rem]">
                채용 페이지 대신 메일로 받습니다
              </h2>
              <ol className="flex max-w-[560px] flex-col gap-3 text-left">
                {applicationGuide.steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.95rem] font-light leading-[1.7] text-gray-0/85">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <Button asChild size="lg" variant="accent">
                <Link href={mailto}>{company.contact.email}로 지원하기</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
