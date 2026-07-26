import * as React from "react";
import { cn } from "@/shared/lib";

export interface Definition {
  term: string;
  value: React.ReactNode;
}

/**
 * "라벨: 값" 쌍이 반복되는 곳(법인 정보·연락처)에 쓰는 dl.
 * 헤어라인 목록을 남발하지 않기 위해 구분선 없이 여백으로만 나눈다.
 */
export function DefinitionList({
  items,
  className,
}: {
  items: readonly Definition[];
  className?: string;
}) {
  return (
    <dl className={cn("grid gap-x-10 gap-y-5 text-left", className)}>
      {items.map((item) => (
        <div key={item.term} className="flex flex-col gap-1">
          <dt className="text-sm text-faint">{item.term}</dt>
          <dd className="text-sm leading-6 text-body">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
