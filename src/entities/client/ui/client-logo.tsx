import Image from "next/image";
import { cn } from "@/shared/lib";

/**
 * 고객사·파트너 로고.
 *
 * ⚠️ 그레이스케일을 걸지 않는다. 호버로 스타일을 바꾸지도 않는다.
 * 남의 회사 로고는 그 회사가 정한 색이 맞는 표기다. 우리 톤에 맞추겠다고
 * 채도를 죽이면 로고를 잘못 쓰는 것이고, 화면에서 색이 전부 사라진다.
 * 링크가 아니므로 호버 반응도 필요 없다.
 *
 * 로고 자산이 없으면 회사명을 조판해 대신한다.
 */
export function ClientLogo({
  client,
  className,
}: {
  client: { name: string; logoUrl?: string };
  className?: string;
}) {
  if (!client.logoUrl) {
    return (
      <span
        className={cn(
          "text-base leading-tight text-gray-75 sm:text-lg",
          className
        )}
      >
        {client.name}
      </span>
    );
  }

  return (
    <Image
      src={client.logoUrl}
      alt={`${client.name} 로고`}
      width={200}
      height={56}
      sizes="200px"
      className={cn("h-8 w-auto object-contain sm:h-9", className)}
    />
  );
}
