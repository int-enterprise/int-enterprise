import Link from "next/link";
import { BrandMark, Container } from "@/shared/ui";
import { company, copyright, corporateFacts } from "@/entities/company";
import { ctaNav, legalNav, navItems } from "@/shared/config";

const columns = [
  {
    title: "서비스",
    links: [
      ...navItems.map((n) => ({ label: n.label, href: n.href })),
      { label: ctaNav.label, href: ctaNav.href },
    ],
  },
  {
    title: "회사",
    links: [
      { label: "회사 이야기", href: "/about#origin" },
      { label: "연혁", href: "/about#history" },
      { label: "대표", href: "/about#founder" },
      { label: "파트너", href: "/about#partners" },
      { label: "오시는 길", href: "/about#location" },
    ],
  },
  {
    title: "자료",
    links: [
      { label: "보도·기고", href: "/press" },
      { label: "수행 과제", href: "/services#references" },
      { label: "고객사", href: "/services#clients" },
    ],
  },
  {
    title: "정책",
    links: legalNav.map((n) => ({ label: n.label, href: n.href })),
  },
];

export function Footer() {
  return (
    <footer className="mt-[100px] border-t border-line sm:mt-[200px]">
      <Container className="flex flex-col gap-16 py-16 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-14">
          <div className="flex flex-col gap-4">
            <BrandMark size="lg" />
            <div className="flex flex-col gap-1 text-sm">
              <a
                href={`mailto:${company.contact.email}`}
                className="text-body transition-colors hover:text-heading"
              >
                {company.contact.email}
              </a>
              <a
                href={`tel:${company.contact.phone}`}
                className="text-body transition-colors hover:text-heading"
              >
                {company.contact.phone}
              </a>
            </div>
          </div>

          <nav
            aria-label="사이트맵"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:gap-x-12"
          >
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h2 className="text-sm text-heading">{col.title}</h2>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.href}-${l.label}`}>
                      <Link
                        href={l.href}
                        className="text-sm text-subtle transition-colors hover:text-heading"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <dl className="grid gap-x-10 gap-y-4 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {corporateFacts.map((f) => (
            <div key={f.term} className="flex gap-3 text-sm">
              <dt className="shrink-0 text-faint">{f.term}</dt>
              <dd className="text-body">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-2 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright()}</p>
          <p>{company.legalNameEn}</p>
        </div>
      </Container>
    </footer>
  );
}
