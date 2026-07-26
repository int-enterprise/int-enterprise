import { Crown, Flame, MessagesSquare, Telescope, Zap } from "lucide-react";
import { Container, Section } from "@/shared/ui";
import { talentClosing, talentValues, type TalentValue } from "@/entities/careers";

/**
 * int. 인재상.
 *
 * 한 줄에 다섯 항목: 가는 선 아이콘 + 영문 키워드 + 한글 한 줄.
 * 다섯 줄이 이어서 한 문장으로 읽히므로 **순서를 바꾸지 않는다.**
 *
 * ⚠️ 카드·테두리·그림자를 두르지 않는다. 아이콘과 활자만 세워 담백하게 둔다
 * (국내 기업 인재상 섹션의 통상 형식이다).
 * ⚠️ 아이콘은 선을 가늘게(1.25) — 활자보다 앞서 보이면 안 된다.
 */
const ICONS: Record<TalentValue["icon"], typeof Crown> = {
  crown: Crown,
  flame: Flame,
  zap: Zap,
  speech: MessagesSquare,
  telescope: Telescope,
};

export function TalentValues() {
  return (
    <Section rhythm="large" id="talent">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Talent
          </p>
          <h2 className="text-[2rem] leading-[1.16] tracking-[-0.03em] text-display sm:text-[2.6rem]">
            인재상
          </h2>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
          {talentValues.map((v) => {
            const Icon = ICONS[v.icon];
            return (
              <li
                key={v.key}
                // 모바일 2열에서 홀수 개면 마지막 하나가 왼쪽에 혼자 남는다 —
                // 그 칸만 두 열을 차지하게 해 가운데로 보낸다.
                className="flex flex-col items-center gap-5 px-2 text-center last:odd:col-span-2 sm:last:odd:col-span-1"
              >
                <Icon
                  className="h-11 w-11 text-faint"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <p className="text-xl font-bold uppercase tracking-[-0.01em] text-heading sm:text-2xl">
                  {v.key}
                </p>
                <p className="text-base font-light leading-[1.6] text-body">
                  {v.line}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="mt-14 text-center text-lg font-semibold text-display">
          {talentClosing}
        </p>
      </Container>
    </Section>
  );
}
