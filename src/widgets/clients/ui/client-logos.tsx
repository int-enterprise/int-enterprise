import { Container, Section } from "@/shared/ui";
import { ClientLogo, clients, coverage, references } from "@/entities/client";

/**
 * 고객사 로고 격자. 로고가 이 섹션의 시각 요소다.
 * 카드에 담아 소프트 섀도우로 살짝 띄운다.
 */
export function ClientLogos() {
  return (
    <Section rhythm="default" id="clients">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold text-subtle">
            대기업부터 공공기관까지, 직접 만들고 운영해 왔습니다
          </p>
          <p className="font-mono text-xs text-faint">
            {coverage.fields.length}개 분야 · {coverage.segments.length}개 고객층
            · 누적 {references.length}건
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {clients.map((client) => (
            <li
              key={client.name}
              className="flex min-h-[92px] items-center justify-center rounded-md border border-line bg-canvas px-4 py-5 shadow-soft"
            >
              <ClientLogo client={client} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
