import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Section } from "@/shared/ui";
import { company } from "@/entities/company";
import { ContactForm } from "@/features/contact-form";

export function ContactInline() {
  return (
    <Section surface="white" className="py-20 sm:py-28" id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              Contact
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-5xl">
              지금 바로
              <br />
              <span className="text-muted">문의 남기세요.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-strong">
              제품 도입, PoC, 파트너십, 취재 등 어떤 문의든 환영합니다.
              영업일 기준 1~2일 안에 답신드립니다.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            <Channel
              icon={<Mail className="h-5 w-5" />}
              label="이메일"
              value={company.contact.email}
              href={`mailto:${company.contact.email}`}
            />
            <Channel
              icon={<Phone className="h-5 w-5" />}
              label="대표전화"
              value={company.contact.phone}
              href={`tel:${company.contact.phone}`}
            />
          </ul>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-all hover:gap-2"
          >
            전용 문의 페이지에서 작성하기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[24px] border border-border bg-surface p-6 sm:p-9">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

function Channel({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a href={href} className="flex items-start gap-4 hover:text-mint-deep">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-mist text-mint-deep">
          {icon}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {label}
          </span>
          <span className="text-base font-medium text-ink">{value}</span>
        </div>
      </a>
    </li>
  );
}
