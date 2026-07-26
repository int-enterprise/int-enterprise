import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/shared/lib";
import { formatPressDate, type PressItem } from "../model/press";

/**
 * 기사 카드. 사진이 있으면 사진이 주인, 없으면 브랜드 그라디언트 패널로 채운다.
 * 소프트 섀도우로 띄우고 hover 시 살짝 떠오른다.
 *
 * lg(featured): 카드가 세로로 늘어나면 남는 높이를 이미지가 채운다.
 *   (제목과 "기사 보기" 사이에 빈 공간이 생기지 않도록)
 * md(격자): 이미지는 고정 비율, 제목이 flex-1로 늘어 "기사 보기"를 바닥에 정렬.
 */
export function PressCard({
  item,
  size = "md",
  className,
}: {
  item: PressItem;
  size?: "lg" | "md";
  className?: string;
}) {
  const lg = size === "lg";

  // 이미지 영역: lg는 남는 높이를 채우고(flex-1), md는 고정 비율.
  const mediaClass = lg
    ? "relative w-full flex-1 min-h-[320px] overflow-hidden"
    : "relative w-full aspect-[16/10] overflow-hidden";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-canvas shadow-soft",
        "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      {item.image ? (
        <div className={mediaClass}>
          <Image
            src={item.image}
            alt=""
            fill
            sizes={
              lg
                ? "(max-width: 1024px) 100vw, 720px"
                : "(max-width: 1024px) 100vw, 400px"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className={cn("bg-brand-gradient relative flex items-end p-6", mediaClass)}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(60% 60% at 25% 0%, rgba(255,255,255,0.25), transparent 70%)",
            }}
          />
          <span className="relative text-2xl font-bold text-gray-0/90 sm:text-3xl">
            {item.outlet}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-heading">{item.outlet}</span>
          <span className="text-faint">·</span>
          <time dateTime={item.date} className="font-mono text-faint">
            {formatPressDate(item.date)}
          </time>
          <span className="ml-auto shrink-0 rounded-pill border border-line px-2.5 py-1 text-xs text-subtle">
            {item.kind}
          </span>
        </div>
        <h3
          className={cn(
            "font-semibold leading-[1.4] text-heading",
            lg ? "text-xl sm:text-2xl" : "flex-1 text-base"
          )}
        >
          {item.title}
        </h3>
        <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
          기사 보기
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </a>
  );
}
