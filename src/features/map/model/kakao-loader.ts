type KakaoNamespace = {
  maps: {
    load: (cb: () => void) => void;
    LatLng: new (lat: number, lng: number) => unknown;
    Map: new (container: HTMLElement, options: unknown) => unknown;
    Marker: new (options: unknown) => unknown;
    InfoWindow: new (options: unknown) => unknown;
    services?: unknown;
    event: {
      addListener: (target: unknown, type: string, handler: () => void) => void;
    };
  };
};

declare global {
  interface Window {
    kakao?: KakaoNamespace;
  }
}

const SCRIPT_ID = "kakao-maps-sdk";

let loadingPromise: Promise<KakaoNamespace> | null = null;

export function loadKakaoMaps(appKey: string): Promise<KakaoNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Kakao Maps requires browser"));
  }
  if (window.kakao && window.kakao.maps) {
    return Promise.resolve(window.kakao);
  }
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(
      SCRIPT_ID
    ) as HTMLScriptElement | null;
    const onReady = () => {
      if (!window.kakao) {
        reject(new Error("Kakao Maps load failed"));
        return;
      }
      window.kakao.maps.load(() => resolve(window.kakao!));
    };
    if (existing) {
      existing.addEventListener("load", onReady, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${encodeURIComponent(
      appKey
    )}&libraries=services`;
    script.onload = onReady;
    script.onerror = () => reject(new Error("Kakao Maps script error"));
    document.head.appendChild(script);
  });

  return loadingPromise;
}
