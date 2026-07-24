import { ClientLogo, type Client } from "@/entities/client";

/**
 * 로고 무한 마퀴. 목록을 두 번 렌더하고 -50%까지 이동시켜 이음매를 없앤다.
 * 애니메이션은 CSS keyframe(globals.css)이라 서버 컴포넌트로 둘 수 있다.
 * prefers-reduced-motion에서는 전역 규칙이 애니메이션을 멈춘다.
 */
export function LogoMarquee({ items }: { items: readonly Client[] }) {
  const doubled = [...items, ...items];

  return (
    <div
      className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="img"
      aria-label={`고객사 로고: ${items.map((i) => i.name).join(", ")}`}
    >
      <ul className="flex w-max animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused] sm:gap-20 sm:pr-20">
        {doubled.map((client, idx) => (
          <li key={`${client.name}-${idx}`} aria-hidden={idx >= items.length}>
            <ClientLogo client={client} />
          </li>
        ))}
      </ul>
    </div>
  );
}
