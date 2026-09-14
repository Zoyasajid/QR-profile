"use client";

import { Check } from "lucide-react";
import { PROFILE_TYPES } from "@/lib/data";
import type { ProfileType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProfileTypeCard({
  type,
  selected,
  onSelect,
}: {
  type: ProfileType;
  selected?: boolean;
  onSelect?: (type: ProfileType) => void;
}) {
  const meta = PROFILE_TYPES.find((t) => t.type === type);
  if (!meta) return null;
  return (
    <button
      type="button"
      onClick={() => onSelect?.(type)}
      className={cn(
        "relative rounded-3xl border p-5 text-left transition",
        selected
          ? "border-ink bg-ink text-paper shadow-md"
          : "border-line bg-white text-ink hover:border-ink/40"
      )}
    >
      {selected ? (
        <span className="absolute right-4 top-4">
          <Check className="h-4 w-4" />
        </span>
      ) : null}
      <p className="text-sm font-medium">{meta.title}</p>
      <p className={cn("mt-2 text-sm leading-relaxed", selected ? "text-paper/75" : "text-slate")}>
        {meta.description}
      </p>
    </button>
  );
}
