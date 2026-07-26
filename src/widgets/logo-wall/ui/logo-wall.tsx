import { Container, Section, SectionHeader } from "@/shared/ui";
import { ClientLogo, partners, wallLogos } from "@/entities/client";
import { cn } from "@/shared/lib";

/**
 * 주요 고객사 및 파트너 — 로고가 이 섹션의 시각 요소다.
 *
 * ⚠️ 마퀴로 흘려 봤다가 되돌렸다. 흐르는 동안 화면에 걸리는 로고 수가 격자보다 적어서
 * **오히려 파트너가 더 적어 보인다.** 전부 한 화면에 크게 세우는 쪽이 강하다.
 * 애니메이션을 다시 넣지 않는다.
 *
 * 격자가 아니라 flex-wrap이다 — 개수가 열 수로 나누어떨어지지 않을 때
 * 마지막 줄이 왼쪽에 혼자 남지 않고 가운데로 모인다.
 *
 * ⚠️ 타일 여백을 넉넉히 주면 로고가 작아 보인다. 패딩은 최소로 두고
 * 로고 자체의 상한(ClientLogo의 `size="lg"`)으로 크기를 맞춘다.
 *
 * 고객사와 파트너를 한 구간에 섞는다. 전달받은 자산 일부는 관계(고객/파트너)가
 * 아직 확인되지 않았고, 확인 전에 "고객사"로 단정해 나누면 사실과 다른 주장이 된다.
 * 구분이 확정되면 이 섹션을 둘로 나눌 수 있다(entities/client/model/logo-wall.ts 주석 참고).
 *
 * 로고 자산이 없는 파트너는 격자에서 빠지므로 아래 한 줄로 남긴다.
 * 로고가 없다는 이유로 실제 협력 관계가 화면에서 사라지게 두지 않는다.
 */
export function LogoWall() {
  const withoutLogo = partners.filter((p) => !p.logoUrl);

  return (
    <Section rhythm="large" id="logos">
      <Container>
        <SectionHeader
          eyebrow="Clients & Partners"
          title="주요 고객사 및 파트너"
          description="대기업·공공기관·대학·스타트업과 함께 일해 왔습니다."
        />

        <ul className="mt-14 flex flex-wrap justify-center gap-4">
          {wallLogos.map((logo) => (
            <li
              key={logo.name}
              className={cn(
                "flex min-h-[128px] min-w-0 items-center justify-center rounded-md border border-line bg-canvas px-3 py-4 shadow-soft sm:min-h-[156px] sm:px-4 sm:py-5",
                "basis-[calc(50%-0.5rem)] sm:basis-[calc(33.333%-0.667rem)] lg:basis-[calc(25%-0.75rem)]"
              )}
            >
              <ClientLogo client={logo} size="lg" />
            </li>
          ))}
        </ul>

        {withoutLogo.length > 0 ? (
          <p className="mt-10 text-center text-base font-light text-subtle">
            이 외에 {withoutLogo.map((p) => p.name).join(" · ")}와 협력하고 있습니다.
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
