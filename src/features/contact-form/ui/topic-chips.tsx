"use client";

import { cn } from "@/shared/lib";
import { topicLabels, type ContactInput } from "../model/schema";

interface TopicChipsProps {
  value: ContactInput["topic"];
  onChange: (v: ContactInput["topic"]) => void;
}

export function TopicChips({ value, onChange }: TopicChipsProps) {
  const entries = Object.entries(topicLabels) as [
    ContactInput["topic"],
    string,
  ][];
  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([key, label]) => {
        const active = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "border-ink bg-ink text-white"
                : "border-border bg-white text-ink-soft hover:border-ink"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
