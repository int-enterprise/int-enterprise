import { ArrowUpRight, MapPin, Mail, Phone, Train } from "lucide-react";
import { Button, Section } from "@/shared/ui";
import { company } from "@/entities/company";
import { OfficeMap } from "@/features/map";

export function LocationDetail() {
  return (
    <Section surface="white" className="py-16 sm:py-20">
      <div className="flex flex-col gap-10">
        <OfficeMap height={480} />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-[24px] border border-border bg-mint-mist p-7 sm:p-9">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-mint">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  본사
                </span>
                <p className="text-lg font-semibold text-ink">
                  {company.address.line1}
                </p>
                <p className="text-base text-ink-soft">
                  {company.address.line2}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild size="sm" variant="primary">
                <a
                  href={`https://map.kakao.com/link/search/${encodeURIComponent(
                    company.address.full
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  카카오맵에서 보기
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a
                  href={`https://map.naver.com/p/search/${encodeURIComponent(
                    company.address.full
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  네이버 지도
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-[24px] border border-border bg-surface p-7 sm:p-9">
            <ContactRow
              icon={<Phone className="h-5 w-5" />}
              label="대표전화"
              value={company.contact.phone}
              href={`tel:${company.contact.phone}`}
            />
            <ContactRow
              icon={<Mail className="h-5 w-5" />}
              label="이메일"
              value={company.contact.email}
              href={`mailto:${company.contact.email}`}
            />
            <ContactRow
              icon={<Train className="h-5 w-5" />}
              label="대중교통"
              value="지하철 6호선 대흥역 도보 8분 · 2호선 신촌역 도보 12분"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactRow({
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
  const valueNode = href ? (
    <a
      href={href}
      className="text-base font-semibold text-ink hover:text-mint-deep"
    >
      {value}
    </a>
  ) : (
    <span className="text-base font-medium text-ink">{value}</span>
  );

  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        {valueNode}
      </div>
    </div>
  );
}
