export { BrandMark } from "./brand-mark";
export { ProductMark } from "./product-mark";
export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";
export {
  Card,
  GlassCard,
  GlassCardDark,
  CardTitle,
  CardText,
} from "./card";
export { Field, Input, Label, Textarea } from "./field";
export { DefinitionList } from "./definition-list";
export type { Definition } from "./definition-list";
export { Container, Eyebrow, Section, SectionHeader, Blob } from "./layout";
export { Marquee } from "./marquee";

// ⚠️ `Photo`는 여기서 내보내지 않는다. node:fs를 쓰는 Server Component라서
// 이 배럴을 통해 나가면 헤더 같은 클라이언트 컴포넌트 번들까지 fs를 끌고 들어가 빌드가 깨진다.
// 쓰는 쪽에서 `@/shared/ui/photo`로 직접 import 한다.
