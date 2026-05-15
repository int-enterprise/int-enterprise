import { CheckCircle2 } from "lucide-react";
import { Section } from "@/shared/ui";
import { ClientLogo, clients, flagshipReferences } from "@/entities/client";

export function ClientsPage() {
  return (
    <>
      <Section surface="white" className="py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              실제로 진행 중이거나 완료한 프로젝트의 고객사입니다
            </h2>
            <span className="text-sm text-muted">{clients.length}곳</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((c) => (
              <ClientLogo key={c.name} client={c} variant="card" />
            ))}
          </div>
        </div>
      </Section>

      <Section surface="soft" className="py-20">
        <div className="flex flex-col gap-8">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
              Project highlights
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              대표 프로젝트
            </h3>
            <p className="text-base leading-relaxed text-muted-strong">
              아래는 실제 계약·PoC가 진행되었거나 진행 중인 프로젝트입니다.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {flagshipReferences.map((ref) => (
              <li
                key={ref}
                className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint-deep" />
                <span className="leading-relaxed text-ink-soft">{ref}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
