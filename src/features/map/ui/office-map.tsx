"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/shared/lib";
import { company } from "@/entities/company";
import { loadKakaoMaps } from "../model/kakao-loader";

type Status = "idle" | "ready" | "error" | "no-key";

/**
 * 본사 위치 지도. NEXT_PUBLIC_KAKAO_MAPS_KEY가 없거나 SDK 로드가 실패하면
 * 주소 카드로 자동 대체된다 — 키 없이도 페이지는 항상 완성된 상태로 보인다.
 */
// 빌드 시점에 값이 정해지는 상수. 렌더 중에 읽어도 안전하다.
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_KEY;

export function OfficeMap({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<Status>(
    KAKAO_KEY ? "idle" : "no-key"
  );

  React.useEffect(() => {
    if (!KAKAO_KEY) return;

    let cancelled = false;
    loadKakaoMaps(KAKAO_KEY)
      .then((kakao) => {
        if (cancelled || !containerRef.current) return;
        const center = new kakao.maps.LatLng(
          company.address.lat,
          company.address.lng
        );
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
      <div
        className={cn(
          "flex min-h-[320px] flex-col items-start justify-center gap-4 rounded-lg bg-canvas-2 p-8",
          className
        )}
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-40 text-teal-40">
          <MapPin className="h-5 w-5" aria-hidden />
        </span>
        <div className="flex flex-col gap-1">
          <p className="font-medium text-heading">{company.address.line1}</p>
          <p className="text-sm text-body">{company.address.line2}</p>
        </div>
        <a
          href={company.address.kakaoMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-link underline-offset-4 hover:underline"
        >
          카카오맵에서 열기 →
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`${company.legalNameKoShort} 본사 위치 지도`}
      className={cn(
        "min-h-[320px] w-full overflow-hidden rounded-lg bg-canvas-2",
        className
      )}
    />
  );
}
