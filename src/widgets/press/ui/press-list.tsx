import { Container, Section } from "@/shared/ui";
import { PressCard, pressItems } from "@/entities/press";

/** /press 전체 목록. 기사가 늘어도 그대로 견디는 격자. */
export function PressList() {
  return (
    <Section rhythm="default" width="wide">
      <Container width="wide" className="px-0">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pressItems.map((item) => (
            <li key={item.url} className="flex">
              <PressCard item={item} className="w-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
