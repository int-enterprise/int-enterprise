import { Section, SectionHeader } from "@/shared/ui";
import { partners } from "@/entities/client";

export function PartnersSection() {
  if (partners.length === 0) return null;

  return (
    <Section rhythm="large" id="partners">
      <SectionHeader eyebrow="Partners" title="연구와 사업을 같이 하는 곳" />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p) => (
          <li
            key={p.name}
            className="flex flex-col gap-2 rounded-lg border border-line bg-canvas p-7 shadow-soft"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">
              {p.role}
            </span>
            <span className="text-lg font-semibold text-heading">{p.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
