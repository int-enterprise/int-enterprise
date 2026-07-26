import Link from "next/link";
import { BrandMark, Container } from "@/shared/ui";
import { company, copyright, corporateFacts } from "@/entities/company";
import { ctaNav, legalNav, navItems } from "@/shared/config";

const [about, products, careers] = navItems;

/**
 * 푸터 — 국내 기업 사이트의 통상 구조를 따른다.
 *
 * 뉴트럴 다크(거의 검정) 배경 / 좌측 화이트 로고 + 법인 정보 / 우측 사이트맵 /
 * 하단 구분선 아래 카피라이트 + 법적 고지 링크. 개인정보처리방침만 굵게(관례).
 *
 * ⚠️ 배경을 **브랜드 네이비로 칠하지 않는다.** 채도가 높아 푸터가 배너처럼 튄다.
 * 국내외 기업 푸터의 표준은 거의 검정에 가까운 무채색이다.
 * ⚠️ 흰 배경으로도 되돌리지 않는다. 어두운 푸터가 본문과 끝을 갈라 준다.
 * ⚠️ 법인 정보에 법인등록번호·설립일을 넣지 않는다(등기 서류용 항목이다).
 */
const columns = [
  {
    title: products.label,
    links: [
      { label: "제품 한눈에 보기", href: products.href },
      ...products.children!.map((n) => ({ label: n.label, href: n.href })),
    ],
  },
  {
    title: about.label,
    links: about.children!.map((n) => ({ label: n.label, href: n.href })),
  },
  {
    title: "자료 · 문의",
    links: [
      { label: "고객사·파트너", href: "/#logos" },
      { label: "보도·기고", href: "/press" },
      { label: careers.label, href: careers.href },
      { label: ctaNav.label, href: ctaNav.href },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-[100px] bg-gray-90 text-gray-0 sm:mt-[160px]">
      <Container className="flex flex-col gap-14 py-16 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-6">
            <BrandMark size="lg" tone="white" />

            <dl className="flex flex-col gap-1.5 text-sm text-gray-0/60">
              {corporateFacts.map((f) => (
                <div key={f.term} className="flex gap-2">
                  <dt className="shrink-0">{f.term}</dt>
                  <dd className="text-gray-0/80">{f.value}</dd>
                </div>
              ))}
              <div className="flex gap-2">
                <dt className="shrink-0">전화</dt>
                <dd className="text-gray-0/80">
                  <a
                    href={`tel:${company.contact.phone}`}
                    className="transition-colors hover:text-gray-0"
                  >
                    {company.contact.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0">이메일</dt>
                <dd className="text-gray-0/80">
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="transition-colors hover:text-gray-0"
                  >
                    {company.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <nav
            aria-label="사이트맵"
            className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:gap-x-16"
          >
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h2 className="text-sm font-semibold text-gray-0">
                  {col.title}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.href}-${l.label}`}>
                      <Link
                        href={l.href}
                        className="text-sm text-gray-0/60 transition-colors hover:text-gray-0"
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

        <div className="flex flex-col gap-4 border-t border-gray-0/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-0/50">{copyright()}</p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    // 관례상 개인정보처리방침만 강조한다
                    l.href === "/privacy"
                      ? "text-sm font-semibold text-gray-0 hover:underline"
                      : "text-sm text-gray-0/60 transition-colors hover:text-gray-0"
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
