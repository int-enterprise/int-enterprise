import { ClientLogo, type Client } from "@/entities/client";
import { cn } from "@/shared/lib";

interface LogoMarqueeProps {
  clients: readonly Client[];
  direction?: "left" | "right";
  className?: string;
}

export function LogoMarquee({
  clients,
  direction = "left",
  className,
}: LogoMarqueeProps) {
  const doubled = [...clients, ...clients];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className="animate-marquee flex w-max gap-4"
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {doubled.map((c, idx) => (
          <ClientLogo
            key={`${c.name}-${idx}`}
            client={c}
            variant="pill"
          />
        ))}
      </div>
    </div>
  );
}
