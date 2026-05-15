import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Button, Section } from "@/shared/ui";
import { company } from "@/entities/company";
import { OfficeMap } from "@/features/map";

export function LocationPreview() {
  return (
    <Section surface="soft" className="py-20 sm:py-28">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              Location
            </span>
            <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              본사로 직접 오셔도 좋습니다.
            </h2>
          </div>
          <Link
            href="/about/location"
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-all hover:gap-2"
          >
            오시는 길 자세히
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <OfficeMap height={420} />
          <div className="flex flex-col gap-5 rounded-[24px] border border-border bg-white p-7">
            <Item icon={<MapPin className="h-5 w-5" />} label="본사">
              {company.address.line1}
              <br />
              {company.address.line2}
            </Item>
            <Item
              icon={<Phone className="h-5 w-5" />}
              label="대표전화"
              href={`tel:${company.contact.phone}`}
            >
              {company.contact.phone}
            </Item>
            <Item
              icon={<Mail className="h-5 w-5" />}
              label="이메일"
              href={`mailto:${company.contact.email}`}
            >
              {company.contact.email}
            </Item>
            <Button asChild variant="outline" size="sm" className="self-start">
              <a
                href={`https://map.kakao.com/link/search/${encodeURIComponent(
                  company.address.full
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                카카오맵 길찾기
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Item({
  icon,
  label,
  children,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  const value = href ? (
    <a href={href} className="text-ink hover:text-mint-deep">
      {children}
    </a>
  ) : (
    <span className="text-ink">{children}</span>
  );
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-mist text-mint-deep">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        <span className="text-base font-medium leading-snug">{value}</span>
      </div>
    </div>
  );
}
