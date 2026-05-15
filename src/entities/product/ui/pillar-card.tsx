import { Card } from "@/shared/ui";
import type { ProductPillar } from "../model/product";

interface PillarCardProps {
  pillar: ProductPillar;
  index: number;
}

export function PillarCard({ pillar, index }: PillarCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 p-7">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-bold text-mint">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-deep">
          {pillar.tagline}
        </span>
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-ink">
        {pillar.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-strong">
        {pillar.description}
      </p>
    </Card>
  );
}
