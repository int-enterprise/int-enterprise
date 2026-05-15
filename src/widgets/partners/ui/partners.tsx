import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, Section } from "@/shared/ui";
import { ClientLogo, operators } from "@/entities/client";
import { company } from "@/entities/company";

export function Partners() {
  return (
    <>
      <Section surface="white" className="py-16 sm:py-20">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
                TIPS Operator
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                운영사
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-strong">
                (주)인트의 TIPS 일반트랙 운영사이자 사업화 단계별 멘토링·
                네트워크 지원을 함께하는 파트너입니다.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {operators.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-col gap-5 rounded-[20px] border border-border bg-mint-mist p-7"
                >
                  <ClientLogo client={p} variant="card" />
                  {p.description && (
                    <p className="text-sm leading-relaxed text-muted-strong">
                      {p.description}
                    </p>
                  )}
                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-ink hover:gap-2 transition-all"
                    >
                      웹사이트
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section surface="soft" className="py-16 sm:py-20">
        <div className="flex flex-col items-start gap-6 rounded-[24px] border border-border bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              새로운 파트너십을 함께 만들고 있습니다.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-strong">
              기술·연구·산업 영역의 협업 제안은 언제든 환영합니다.
              구체적인 아이디어가 있으시면 아래로 보내주세요.
            </p>
          </div>
          <Button asChild size="lg" variant="primary">
            <Link href="/contact">
              파트너십 문의
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
