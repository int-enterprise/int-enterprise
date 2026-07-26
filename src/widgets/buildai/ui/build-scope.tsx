import {
  Building2,
  CarFront,
  Clapperboard,
  Landmark,
  Megaphone,
  Rocket,
  Server,
  Stethoscope,
  Store,
  UserSearch,
} from "lucide-react";
import { Section } from "@/shared/ui";
import {
  buildFields,
  playbooks,
  scopeNote,
  type BuildField,
  type Playbook,
} from "@/entities/service";

/**
 * buildAI.가 다루는 범위 — 분야와 고객 유형.
 *
 * ⚠️ **여섯 분야를 한계처럼 쓰지 않는다.** 지금까지의 예시일 뿐이고,
 * 업종을 가리지 않는다는 것이 이 회사의 강점이다(docs/company-profile.md §5).
 * ⚠️ 고객사 이름을 쓰지 않는다. 분야와 "무엇을 만들었는지"만 적는다.
 *
 * 형식은 인재상·복리후생과 같다: **가는 선 아이콘 + 이름 + 한 줄.**
 * 고객 유형도 같은 아이콘 규칙을 따른다 — 여기만 아이콘이 없으면 아래쪽이 비어 보인다.
 */
const FIELD_ICONS: Record<BuildField["icon"], typeof Server> = {
  server: Server,
  stethoscope: Stethoscope,
  people: UserSearch,
  car: CarFront,
  megaphone: Megaphone,
  content: Clapperboard,
};

const SEGMENT_ICONS: Record<Playbook["icon"], typeof Server> = {
  enterprise: Building2,
  public: Landmark,
  midmarket: Store,
  startup: Rocket,
};

export function BuildScope() {
  return (
    <Section rhythm="large" soft id="scope">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Scope
        </p>
        <h2 className="text-[2rem] leading-[1.16] tracking-[-0.03em] text-display sm:text-[2.6rem]">
          다루는 범위
        </h2>
        <p className="mt-2 max-w-[46ch] text-lg font-light leading-[1.75] text-body">
          업종도 규모도 가리지 않습니다. 대기업부터
          공공기관·중견기업·스타트업까지 직접 만들고 운영해 왔습니다.
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
        {buildFields.map((f) => {
          const Icon = FIELD_ICONS[f.icon];
          return (
            <li
              key={f.name}
              className="flex flex-col items-center gap-4 px-1 text-center"
            >
              <Icon
                className="h-9 w-9 text-faint"
                strokeWidth={1.25}
                aria-hidden
              />
              <div className="flex flex-col gap-1.5">
                <p className="text-lg font-bold text-heading">{f.name}</p>
                <p className="text-sm font-light leading-[1.5] text-subtle">
                  {f.what}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mx-auto mt-12 max-w-[44ch] text-center text-base font-light leading-[1.75] text-subtle">
        {scopeNote}
      </p>

      <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-14 lg:grid-cols-4">
        {playbooks.map((p) => {
          const Icon = SEGMENT_ICONS[p.icon];
          return (
            <li
              key={p.segment}
              className="flex flex-col items-center gap-4 px-1 text-center"
            >
              <Icon
                className="h-9 w-9 text-faint"
                strokeWidth={1.25}
                aria-hidden
              />
              <div className="flex flex-col gap-1.5">
                <p className="text-lg font-bold text-heading">{p.segment}</p>
                <p className="text-sm font-light leading-[1.5] text-subtle">
                  {p.approach}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
