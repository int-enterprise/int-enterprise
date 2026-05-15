"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { company } from "@/entities/company";
import { loadKakaoMaps } from "../model/kakao-loader";

// 서울특별시 마포구 서강대길 22 본사 위치 좌표
const FALLBACK_LAT = 37.5505;
const FALLBACK_LNG = 126.9408;

interface OfficeMapProps {
  height?: number;
}

export function OfficeMap({ height = 460 }: OfficeMapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<"idle" | "ready" | "error" | "no-key">(
    "idle"
  );

  React.useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_MAPS_KEY;
    if (!key) {
      setStatus("no-key");
      return;
    }
    let cancelled = false;
    loadKakaoMaps(key)
      .then((kakao) => {
        if (cancelled || !containerRef.current) return;
        const center = new kakao.maps.LatLng(FALLBACK_LAT, FALLBACK_LNG);
        const map = new kakao.maps.Map(containerRef.current, {
          center,
          level: 3,
        });
        const marker = new kakao.maps.Marker({ position: center, map });
        const info = new kakao.maps.InfoWindow({
          content: `
            <div style="padding:10px 14px;font-family:Pretendard,system-ui;font-size:13px;line-height:1.5;color:#0a0a0a">
              <strong style="font-weight:700">${company.legalNameKoShort}</strong><br/>
              ${company.address.line1}<br/>
              ${company.address.line2}
            </div>`,
        });
        kakao.maps.event.addListener(marker, "click", () => {
          // re-open on click (InfoWindow needs target args)
          // @ts-expect-error kakao types are loose
          info.open(map, marker);
        });
        // @ts-expect-error kakao types are loose
        info.open(map, marker);
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
        className="relative flex flex-col items-center justify-center gap-4 rounded-[24px] border border-border bg-gradient-to-br from-mint-mist via-white to-mint-pale p-10 text-center"
        style={{ minHeight: height }}
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-mint">
          <MapPin className="h-6 w-6" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-ink">
            {company.address.line1}
          </p>
          <p className="text-sm text-muted">{company.address.line2}</p>
        </div>
        <p className="text-xs text-muted">
          {status === "no-key"
            ? "지도 API 키 설정 후 지도가 활성화됩니다."
            : "지도를 불러오지 못했습니다."}
        </p>
        <a
          href={`https://map.kakao.com/link/search/${encodeURIComponent(
            company.address.full
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-mint-deep hover:underline underline-offset-4"
        >
          카카오맵에서 보기 →
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="(주)인트 본사 위치 지도"
      className="relative w-full overflow-hidden rounded-[24px] border border-border bg-surface"
      style={{ height }}
    />
  );
}
