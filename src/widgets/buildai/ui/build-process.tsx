import { Section } from "@/shared/ui";
import { Photo } from "@/shared/ui/photo";
import { buildSteps } from "@/entities/service";

/**
 * buildAI. 구축 절차.
 *
 * ⚠️ **turing. 이야기를 넣지 않는다.** 이 페이지는 만드는 일만 설명한다.
 *
 * 프레임을 아래 두 섹션과 다르게 잡는다 — 다루는 범위는 아이콘 행, 차별점은 대조표,
 * 여기는 **가로 레일**이다. 절차는 순서가 핵심이라 왼쪽에서 오른쪽으로 읽히는 축이 맞고,
 * 단계마다 문단을 붙이지 않는다(한 줄이면 충분하다).
 * 사진은 넓은 띠로 위에 한 번만 깔아 시각 무게를 만든다.
 */
export function BuildProcess() {
  return (
    <Section rhythm="large" id="process">
      <div className="flex max-w-[46ch] flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          How we build
        </p>
        <h2 className="text-[2rem] leading-[1.16] tracking-[-0.03em] text-display sm:text-[2.6rem]">
          구축 절차
        </h2>
        <p className="mt-2 text-lg font-light leading-[1.75] text-body">
          업무를 먼저 보고 기술을 고릅니다. 현업에서 돌아가는 상태까지가 한
          건입니다.
        </p>
      </div>

      <Photo
        src="/products/build-process.jpg"
        alt=""
        sizes="(max-width: 1280px) 100vw, 1200px"
        className="mt-12 h-[260px] w-full rounded-lg shadow-soft sm:h-[380px]"
        placeholder="사진 자리 (public/products/build-process.jpg)"
      />

      <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {buildSteps.map((s) => (
          <li
            key={s.no}
            className="relative flex flex-col gap-2.5 border-t-2 border-line pt-7"
          >
            <span
              aria-hidden
              className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-accent"
            />
            <span className="font-mono text-sm font-semibold text-faint">
              {s.no}
            </span>
            <h3 className="text-xl font-bold tracking-[-0.02em] text-heading">
              {s.title}
            </h3>
            <p className="text-base font-light leading-[1.7] text-body">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
