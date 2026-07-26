"use client";

import * as React from "react";

/**
 * 히어로 핀 구간의 스크롤 진행도(0 = 첫 화면, 1 = 핀이 풀리는 순간).
 *
 * ⚠️ state가 아니라 **ref로 흘린다.** 스크롤마다 setState를 하면 3D 캔버스가
 * 프레임마다 리렌더된다. 값을 읽는 쪽(useFrame, CSS 변수)이 알아서 당겨 쓴다.
 */
export const HeroProgressContext =
  React.createContext<React.RefObject<number> | null>(null);
