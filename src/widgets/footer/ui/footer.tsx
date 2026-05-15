import Link from "next/link";
import { BrandMark } from "@/shared/ui";
import { company, copyright } from "@/entities/company";

const legalLinks = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <BrandMark size="sm" />
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-medium text-muted-strong hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid gap-x-6 gap-y-1.5 text-xs text-muted sm:grid-cols-2 lg:grid-cols-3">
            <FooterRow label="상호">{company.legalNameKo}</FooterRow>
            <FooterRow label="대표">{company.ceo}</FooterRow>
            <FooterRow label="사업자등록번호">
              {company.businessRegistrationNumber}
            </FooterRow>
            <FooterRow label="주소">{company.address.full}</FooterRow>
            <FooterRow label="이메일">
              <a
                href={`mailto:${company.contact.email}`}
                className="text-muted-strong hover:text-ink"
              >
                {company.contact.email}
              </a>
            </FooterRow>
            <FooterRow label="대표전화">
              <a
                href={`tel:${company.contact.phone}`}
                className="text-muted-strong hover:text-ink"
              >
                {company.contact.phone}
              </a>
            </FooterRow>
          </dl>

          <div className="flex flex-col gap-1 border-t border-border pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>{copyright()}</p>
            <p>{company.legalNameEn}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <dt className="font-medium text-ink-soft">{label}</dt>
      <dd className="text-muted-strong">{children}</dd>
    </div>
  );
}
