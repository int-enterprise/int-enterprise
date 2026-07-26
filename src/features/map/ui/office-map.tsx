"use client";

import * as React from "react";
import { cn } from "@/shared/lib";
import { company } from "@/entities/company";
import { loadKakaoMaps } from "../model/kakao-loader";

type Status = "idle" | "ready" | "error" | "no-key";

/**
 * 본사 위치 지도.
 *
 * 키가 있으면 Kakao 지도를, 없으면 **OpenStreetMap 임베드**를 띄운다.
 * ⚠️ 예전엔 키가 없을 때 "카카오맵에서 열기" 주소 카드로 대체했는데,
 * 지도 자리에 지도가 없으면 사용자가 한 번 더 눌러야 위치를 본다.
 * OSM 임베드는 **키가 필요 없어서** 어떤 환경에서도 지도가 바로 보인다.
 *
 * OSM을 고른 이유: 구글 지도 임베드는 원칙적으로 API 키가 필요하고,
 * 카카오는 키 없는 임베드 자체를 제공하지 않는다.
 */
// 빌드 시점에 값이 정해지는 상수. 렌더 중에 읽어도 안전하다.
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_KEY;

/** 지도에 담을 범위(약 ±350m). 좁으면 건물만 보여 길찾기가 어렵다. */
const SPAN = 0.0045;
const { lat, lng } = company.address;
const OSM_SRC =
  `https://www.openstreetmap.org/export/embed.html` +
  `?bbox=${lng - SPAN}%2C${lat - SPAN / 2}%2C${lng + SPAN}%2C${lat + SPAN / 2}` +
  `&layer=mapnik&marker=${lat}%2C${lng}`;

export function OfficeMap({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<Status>(
    KAKAO_KEY ? "idle" : "no-key"
  );
  // ⚠️ OSM 임베드는 **로드 시점에 한 번만** 크기를 잰다. iframe의 기본 고유 크기는
  // 300×150이라, 마운트 전에 src를 걸면 그 작은 크기로 지도를 그리고 끝난다
  // (타일이 왼쪽 구석에만 깔린다). 레이아웃이 끝난 뒤에 src를 준다.
  const [osmSrc, setOsmSrc] = React.useState<string>();

  React.useEffect(() => {
    if (KAKAO_KEY) return;
    const id = requestAnimationFrame(() => setOsmSrc(OSM_SRC));
    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    if (!KAKAO_KEY) return;

    let cancelled = false;
    loadKakaoMaps(KAKAO_KEY)
      .then((kakao) => {
        if (cancelled || !containerRef.current) return;
        const center = new kakao.maps.LatLng(lat, lng);
        const map = new kakao.maps.Map(containerRef.current, {
          center,
          level: 3,
        });
        new kakao.maps.Marker({ position: center, map });
        setStatus("ready");
      })
      .catch(() => setStatus("error"));

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "no-key" || status === "error") {
    return (
      // 지도는 이 구간의 주인공이라 lazy로 미루지 않는다(빈 회색 박스로 먼저 보인다)
      <iframe
        src={osmSrc}
        title={`${company.legalNameKoShort} 본사 위치 지도`}
        className={cn("min-h-[320px] w-full border-0 bg-canvas-2", className)}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`${company.legalNameKoShort} 본사 위치 지도`}
      className={cn(
        "min-h-[320px] w-full overflow-hidden bg-canvas-2",
        className
      )}
    />
  );
}
