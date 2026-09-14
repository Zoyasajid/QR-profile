"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "soft";
type Size = "sm" | "md" | "lg";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition disabled:opacity-50 disabled:pointer-events-none",
        variant === "primary" && "bg-accent text-white hover:bg-accent-dark shadow-sm",
        variant === "secondary" && "bg-ink text-paper hover:bg-[#183044]",
        variant === "outline" && "border border-line bg-white text-ink hover:bg-paper",
        variant === "ghost" && "text-ink hover:bg-paper",
        variant === "danger" && "bg-[#8B2E2E] text-white hover:bg-[#732525]",
        variant === "soft" && "bg-paper text-ink hover:bg-[#ece6db]",
        size === "sm" && "h-9 px-3.5 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        className
      )}
      {...props}
    />
  );
}
