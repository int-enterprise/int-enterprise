import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/shared/lib";

/**
 * 사진 슬롯.
 *
 * `public/` 아래 해당 파일이 **있으면 사진을, 없으면 브랜드 패널을** 그린다.
 * 사진을 아직 못 받은 자리에 회색 네모나 가짜 이미지를 넣지 않기 위한 장치다.
 * 파일을 그 경로에 떨어뜨리고 다시 빌드하면 그대로 사진이 된다.
 *
 * ⚠️ Server Component 전용이다(빌드 시점에 파일 존재를 확인한다).
 * "use client" 파일에서 import 하면 node:fs 때문에 빌드가 깨진다.
 */
export function Photo({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 1024px) 100vw, 1200px",
  priority,
  /** 사진이 없을 때 패널 위에 옅게 남길 문구. 비우면 아무것도 안 적는다. */
  placeholder,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
}) {
  const exists = fs.existsSync(
    path.join(process.cwd(), "public", src.replace(/^\//, ""))
  );

  if (!exists) {
    // ⚠️ 자리표시는 조용해야 한다. 브랜드 그라디언트로 채우면 사진 자리가 많은 페이지에서
    // 같은 도형이 반복되는 것처럼 보여, 비어 있다는 사실이 디자인으로 오해된다.
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 border border-dashed border-line-strong bg-canvas-2 text-center",
          className
        )}
      >
        <ImageIcon className="h-7 w-7 text-faint" strokeWidth={1.25} aria-hidden />
        {placeholder ? (
          <span className="px-6 text-sm font-light text-faint">{placeholder}</span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
