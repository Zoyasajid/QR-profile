"use client";

import { DEMO_PHOTOS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Avatar({
  photo,
  name,
  size = "md",
}: {
  photo: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const demo = DEMO_PHOTOS.find((p) => p.id === photo) ?? DEMO_PHOTOS[4];
  const dim =
    size === "sm"
      ? "h-10 w-10 text-sm"
      : size === "lg"
        ? "h-20 w-20 text-2xl"
        : size === "xl"
          ? "h-28 w-28 text-3xl"
          : "h-14 w-14 text-lg";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-inner",
        dim
      )}
      style={{ background: demo.color }}
      aria-label={name}
    >
      {demo.initials}
    </div>
  );
}
