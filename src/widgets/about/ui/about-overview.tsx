import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, User } from "lucide-react";
import { BrandMark, Section } from "@/shared/ui";
import { company } from "@/entities/company";

const subPages = [
  {
    title: "연혁",
    description: "(주)인트의 발자취",
    href: "/about/history",
  },
  {
    title: "CEO 프로필",
    description: "Founder 박현규",
    href: "/about/ceo",
  },
  {
    title: "채용 안내",
    description: "함께할 사람을 찾고 있습니다",
    href: "/about/careers",
  },
  {
    title: "오시는 길",
    description: "본사 위치와 연락처",
    href: "/about/location",
  },
] as const;

export function AboutOverview() {
  return (
    <>
      <Section surface="white" className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="flex flex-col gap-7">
            <BrandMark size="display" />
            <p className="text-lg leading-relaxed text-ink-soft sm:text-xl">
              (주)인트는 변화하는 환경에서도 안정적으로 작동하는 기업용 AI 운영의
              표준을 만들어 가는 회사입니다.
            </p>
            <p className="text-base leading-relaxed text-muted-strong">
              AI 모델의 시대는 평준화 단계에 들어섰고, 이제 진짜 경쟁은 만들어진
              AI를 어떻게 안정적으로 운영하느냐에 있습니다. (주)인트는 그
              운영의 영역을, 추측이 아니라 시스템으로 풀어냅니다. 우리의 첫 제품{" "}
              <BrandMark size="xs" label="turing" />은 기업의 AI가 변화 속에서도
              어제와 같은 품질로 일할 수 있게 만드는 운영 자동화 솔루션입니다.
            </p>
          </div>

          <dl className="grid gap-4 rounded-[24px] border border-border bg-mint-mist p-7 sm:p-8">
            <InfoRow icon={<User className="h-4 w-4" />} label="대표">
              {company.ceo} ({company.ceoTitle})
            </InfoRow>
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="본사">
              {company.address.full}
            </InfoRow>
            <InfoRow icon={<Mail className="h-4 w-4" />} label="이메일">
              <a
                href={`mailto:${company.contact.email}`}
                className="hover:text-mint-deep"
              >
                {company.contact.email}
              </a>
            </InfoRow>
            <InfoRow icon={<Phone className="h-4 w-4" />} label="대표전화">
              <a
                href={`tel:${company.contact.phone}`}
                className="hover:text-mint-deep"
              >
                {company.contact.phone}
              </a>
            </InfoRow>
            <InfoRow label="사업자등록번호">
              {company.businessRegistrationNumber}
            </InfoRow>
            <InfoRow label="법인등록번호">
              {company.corporateRegistrationNumber}
            </InfoRow>
            <InfoRow label="설립">{company.foundedAt}</InfoRow>
          </dl>
        </div>
      </Section>

      <Section surface="soft" className="py-16 sm:py-20">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            회사 소개 더 보기
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subPages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex h-full flex-col justify-between gap-6 rounded-[20px] border border-border bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_12px_36px_rgba(10,10,10,0.06)]"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[100px_1fr] items-baseline gap-3">
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {icon}
        {label}
      </dt>
      <dd className="text-sm font-medium text-ink">{children}</dd>
    </div>
  );
}
