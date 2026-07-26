"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

/**
 * 히어로 배경 3D 씬. Spline을 쓰지 않고 직접 구현한다.
 * 색·형태·문구·소유권 전부 우리 통제이고, 씬 파일도 런타임도 외부 의존이 없다.
 *
 * 브랜드 색만 쓴다: Navy #04044A(메인) + Teal #40E0D0(포인트) + 밝은 그레이(빛 받는 면).
 * 반사광은 외부 HDR 대신 Lightformer로 만든다 — 오프라인, 자체 완결.
 * 모서리는 전부 둥글게(RoundedBox). 각진 박스는 싸구려로 읽힌다.
 */

const NAVY = "#0b0b52"; // 순검정으로 뭉개지지 않게 살짝 밝은 네이비
const TEAL = "#40e0d0";
const LIGHT = "#e7ebf7"; // 빛을 잘 받는 밝은 면

type Kind = "box" | "sphere" | "capsule" | "torus";

interface ShapeDef {
  kind: Kind;
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  rot: number;
  floatI: number;
}

// 씬은 히어로 **가운데 칸**을 채운다. 좌(워드마크)·우(슬로건) 사이에 놓이므로
// 도형은 원점을 기준으로 좌우 균형이 맞아야 한다. x는 대략 -2.1 ~ 2.1.
//
// ⚠️ 예전엔 우측 패널 배경이라 도형이 전부 오른쪽(x 0.6~4.9)에 몰려 있었다.
// 그 좌표를 그대로 쓰면 가운데 칸에서 오른쪽으로 치우쳐 잘린다.
const SHAPES: ShapeDef[] = [
  { kind: "box", position: [-1.6, 0.5, 0], scale: 1.15, color: NAVY, speed: 1.3, rot: 0.8, floatI: 1.0 },
  { kind: "sphere", position: [0.2, 1.7, -0.8], scale: 0.6, color: TEAL, speed: 1.7, rot: 0.3, floatI: 1.3 },
  { kind: "box", position: [0.4, -0.7, -0.6], scale: 0.78, color: LIGHT, speed: 1.1, rot: 1.0, floatI: 0.9 },
  { kind: "capsule", position: [-1.9, -1.6, 0.5], scale: 0.5, color: TEAL, speed: 1.9, rot: 0.6, floatI: 1.2 },
  { kind: "box", position: [1.6, 0.9, -1.2], scale: 0.66, color: NAVY, speed: 1.4, rot: 1.1, floatI: 1.0 },
  { kind: "sphere", position: [-2.1, -0.8, -0.4], scale: 0.44, color: LIGHT, speed: 2.0, rot: 0.3, floatI: 1.4 },
  { kind: "torus", position: [1.4, -0.9, -1.6], scale: 0.62, color: NAVY, speed: 1.5, rot: 1.2, floatI: 0.9 },
  { kind: "sphere", position: [-0.6, -1.9, -0.2], scale: 0.4, color: TEAL, speed: 1.8, rot: 0.3, floatI: 1.3 },
  { kind: "capsule", position: [2.1, -1.7, -0.6], scale: 0.4, color: LIGHT, speed: 1.85, rot: 0.7, floatI: 1.15 },
];

function BrandMaterial({ color }: { color: string }) {
  const isTeal = color === TEAL;
  const isLight = color === LIGHT;
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={isLight ? 0.15 : 0.1}
      roughness={isTeal ? 0.22 : isLight ? 0.18 : 0.34}
      clearcoat={1}
      clearcoatRoughness={0.12}
      envMapIntensity={1.4}
      // 네이비가 검게 뭉개지지 않도록 아주 옅은 자기발광을 준다
      emissive={color}
      emissiveIntensity={isTeal ? 0.05 : 0.12}
    />
  );
}

function Shape({ def }: { def: ShapeDef }) {
  const geom = () => {
    switch (def.kind) {
      case "sphere":
        return <sphereGeometry args={[1, 64, 64]} />;
      case "capsule":
        return <capsuleGeometry args={[0.55, 0.9, 16, 32]} />;
      case "torus":
        return <torusGeometry args={[0.68, 0.26, 32, 96]} />;
      default:
        return null;
    }
  };

  return (
    <Float
      speed={def.speed}
      rotationIntensity={def.rot}
      floatIntensity={def.floatI}
      floatingRange={[-0.12, 0.12]}
    >
      {def.kind === "box" ? (
        <RoundedBox
          args={[1.2, 1.2, 1.2]}
          radius={0.22}
          smoothness={6}
          position={def.position}
          scale={def.scale}
        >
          <BrandMaterial color={def.color} />
        </RoundedBox>
      ) : (
        <mesh position={def.position} scale={def.scale}>
          {geom()}
          <BrandMaterial color={def.color} />
        </mesh>
      )}
    </Float>
  );
}

/** 포인터를 따라 그룹을 아주 살짝 기울여 깊이를 만든다. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      pointer.x * 0.16,
      0.04
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -pointer.y * 0.1,
      0.04
    );
  });
  return <group ref={ref}>{children}</group>;
}

export function HeroCanvas({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden className={className}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        {/* 틸 림라이트 — 도형 가장자리에 브랜드 색 하이라이트를 얹는다 */}
        <directionalLight position={[-6, -1, 2]} intensity={0.8} color={TEAL} />

        {/* 반사용 스튜디오 환경 — 외부 HDR 없이 Lightformer로 구성 */}
        <Environment resolution={256}>
          <Lightformer intensity={3} position={[5, 4, 5]} scale={7} color="#ffffff" />
          <Lightformer intensity={1.6} position={[-5, 2, 3]} scale={5} color={TEAL} />
          <Lightformer intensity={1.4} position={[0, -5, 4]} scale={7} color="#aab4ff" />
          <Lightformer intensity={2} position={[3, -2, -5]} scale={6} color="#ffffff" />
        </Environment>

        <ParallaxRig>
          {SHAPES.map((def, i) => (
            <Shape key={i} def={def} />
          ))}
        </ParallaxRig>
      </Canvas>
    </div>
  );
}
