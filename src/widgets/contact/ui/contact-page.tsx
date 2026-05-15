import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/shared/ui";
import { company } from "@/entities/company";
import { ContactForm } from "@/features/contact-form";

export function ContactPage() {
  return (
    <Section surface="white" className="py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
            문의 유형을 선택하고
            <br />
            내용을 적어주세요.
          </h2>
          <p className="text-base leading-relaxed text-muted-strong">
            제품 도입, PoC, 파트너십, 취재 등 어떤 문의든 환영합니다.
            영업일 기준 1–2일 안에 답신드립니다.
          </p>
          <ul className="flex flex-col gap-4">
            <ContactItem
              icon={<Mail className="h-5 w-5" />}
              label="이메일"
              value={company.contact.email}
              href={`mailto:${company.contact.email}`}
            />
            <ContactItem
              icon={<Phone className="h-5 w-5" />}
              label="대표전화"
              value={company.contact.phone}
              href={`tel:${company.contact.phone}`}
            />
            <ContactItem
              icon={<MapPin className="h-5 w-5" />}
              label="주소"
              value={company.address.full}
            />
          </ul>
        </div>

        <div className="rounded-[24px] border border-border bg-surface p-6 sm:p-9">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-mist text-mint-deep">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        <span className="text-base font-medium text-ink">{value}</span>
      </div>
    </div>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="block hover:text-mint-deep">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}
