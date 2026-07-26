import {
  Gauge,
  MessagesSquare,
  Plug,
  TrendingDown,
  UserRoundCog,
  Workflow,
} from "lucide-react";
import { Blob, Section } from "@/shared/ui";
import { decayAxes, product, type DecayAxis } from "@/entities/product";

/**
 * 성능 저하가 시작되는 6개 축.
 *
 * 카드 격자에 문단을 넣던 형식을 버렸다. 여섯 칸에 각각 세 줄이 들어가면
 * 아무도 끝까지 읽지 않는다. **아이콘 + 한 줄**로 훑어보게 만든다.
 */
const ICONS: Record<DecayAxis["icon"], typeof Gauge> = {
  market: TrendingDown,
  process: Workflow,
  owner: UserRoundCog,
  tool: Plug,
  reliance: Gauge,
  user: MessagesSquare,
};

export function DecayGrid({ heading }: { heading?: string }) {
  return (
    <Section rhythm="large" soft className="relative">
      <Blob color="teal" size={420} className="right-[-100px] top-[60px]" />

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          The problem
        </p>
        <h2 className="text-[2rem] leading-[1.16] tracking-[-0.03em] text-display sm:text-[2.6rem]">
          {heading ?? product.tagline}
        </h2>
        <p className="mt-2 max-w-[44ch] text-lg font-light leading-[1.75] text-body">
          {product.statusQuo.body}
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {decayAxes.map((axis) => {
          const Icon = ICONS[axis.icon];
          return (
            <li key={axis.no} className="flex items-start gap-4">
              <Icon
                className="mt-0.5 h-8 w-8 shrink-0 text-faint"
                strokeWidth={1.25}
                aria-hidden
              />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold leading-[1.4] text-heading">
                  {axis.title}
                </h3>
                <p className="text-base font-light leading-[1.6] text-subtle">
                  {axis.body}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
