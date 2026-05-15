import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, Section } from "@/shared/ui";
import { company } from "@/entities/company";

interface CtaStripProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function CtaStrip({ title, description }: CtaStripProps = {}) {
  return (
    <Section surface="white" className="py-20 sm:py-28">
      <div className="flex flex-col items-start gap-8 rounded-[28px] bg-ink p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
            {title ?? (
              <>
                AI 운영, 어디서부터 시작할지
                <br className="hidden sm:block" />
                <span className="text-mint">함께 정리해 드릴게요.</span>
              </>
            )}
          </h2>
          <p className="text-base text-white/70">
            {description ??
              "도입 검토 단계, 사용 환경, 해결하고 싶은 문제까지. 영업일 1~2일 안에 답신드립니다."}
          </p>
          <p className="text-sm text-white/50">
            Email · <a href={`mailto:${company.contact.email}`} className="text-mint hover:underline underline-offset-4">{company.contact.email}</a>
            <span className="mx-3 text-white/20">·</span>
            Tel · <a href={`tel:${company.contact.phone}`} className="text-white hover:underline underline-offset-4">{company.contact.phone}</a>
          </p>
        </div>
        <Button asChild size="lg" variant="mint" className="shrink-0">
          <Link href="/contact">
            문의하기
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
