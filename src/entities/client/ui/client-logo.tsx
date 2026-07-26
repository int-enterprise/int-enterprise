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

/**
 * 광학적 크기 보정.
 *
 * 높이만 맞추면 정사각 로고(씨엔티테크·STRA)가 가로로 긴 워드마크(STEPI·영림원) 옆에서
 * 혼자 작아 보인다. 폭만 맞추면 그 반대가 된다. 그래서 비율 구간마다
 * 높이·폭 상한을 다르게 걸어 **눈에 보이는 면적**을 맞춘다.
 *
 * 값은 눈으로 보고 정한 것이다. 로고를 추가한 뒤 어느 하나가 튀면 이 표를 고친다.
 *
 * 폭 상한은 모바일에서 더 좁게 잡는다. 좁은 화면의 2열 타일보다 로고가 넓으면
 * 그 타일만 줄을 통째로 차지해 격자가 깨진다(영림원·Cambridge에서 실제로 그랬다).
 *
 * `lg`는 랜딩 로고 월처럼 로고 자체가 주인공인 자리용이다(md의 약 1.4배).
 */
const OPTICAL = {
  md: [
    // 아주 납작함 (STEPI)
    "max-h-6 max-w-[132px] sm:max-h-7 sm:max-w-[176px]",
    // 일반 워드마크 (LG CNS, 현대NGV, 영림원, 청해ENV, Cambridge)
    "max-h-7 max-w-[124px] sm:max-h-8 sm:max-w-[150px]",
    // 세로가 있는 편 (icore, Mobisight, VOWING)
    "max-h-9 max-w-[104px] sm:max-h-10 sm:max-w-[124px]",
    // 정사각에 가까움 (씨엔티테크, STRA)
    "max-h-12 max-w-[84px] sm:max-h-14 sm:max-w-[96px]",
  ],
  lg: [
    "max-h-10 max-w-[190px] sm:max-h-12 sm:max-w-[280px]",
    "max-h-11 max-w-[180px] sm:max-h-14 sm:max-w-[250px]",
    "max-h-14 max-w-[150px] sm:max-h-[4.5rem] sm:max-w-[205px]",
    "max-h-20 max-w-[124px] sm:max-h-24 sm:max-w-[158px]",
  ],
} as const;

function opticalSize(aspect: number, size: "md" | "lg") {
  const scale = OPTICAL[size];
  if (aspect >= 5) return scale[0];
  if (aspect >= 3) return scale[1];
  if (aspect >= 1.8) return scale[2];
  return scale[3];
}

export function ClientLogo({
  client,
  size = "md",
  className,
}: {
  client: {
    name: string;
    logoUrl?: string;
    logoWidth?: number;
    logoHeight?: number;
  };
  /** `lg`는 로고가 주인공인 자리(랜딩 로고 월) */
  size?: "md" | "lg";
  className?: string;
}) {
  if (!client.logoUrl) {
    return (
      <span
        className={cn(
          "leading-tight text-gray-75",
          size === "lg" ? "text-lg sm:text-xl" : "text-base sm:text-lg",
          className
        )}
      >
        {client.name}
      </span>
    );
  }

  const w = client.logoWidth ?? 200;
  const h = client.logoHeight ?? 56;

  return (
    <Image
      src={client.logoUrl}
      alt={`${client.name} 로고`}
      width={w}
      height={h}
      sizes="200px"
      className={cn(
        "h-auto w-auto object-contain",
        opticalSize(w / h, size),
        className
      )}
    />
  );
}
