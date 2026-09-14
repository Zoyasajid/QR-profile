"use client";

import {
  AtSign,
  Briefcase,
  Calendar,
  Coffee,
  FileText,
  Globe,
  Images,
  Link as LinkIcon,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Share2,
  Smartphone,
  User,
} from "lucide-react";
import type { ButtonKind, Profile } from "@/lib/types";
import { contrastText, cn } from "@/lib/utils";
import { Avatar } from "./avatar";

const ICONS: Record<ButtonKind, typeof Phone> = {
  call: Phone,
  email: Mail,
  website: Globe,
  linkedin: Briefcase,
  instagram: AtSign,
  whatsapp: MessageCircle,
  calendar: Calendar,
  message: MessageSquare,
  about: User,
  photos: Images,
  resume: FileText,
  custom: LinkIcon,
  meet: Coffee,
  text: Smartphone,
  social: Share2,
};

export function ProfilePreview({
  profile,
  compact = false,
  onAction,
}: {
  profile: Profile;
  compact?: boolean;
  onAction?: (label: string) => void;
}) {
  const ink = contrastText(profile.appearance.backgroundColor);
  const muted = ink === "#F6F3EE" ? "rgba(246,243,238,0.72)" : "rgba(15,31,46,0.62)";
  const enabled = profile.buttons.filter((b) => b.enabled);
  const radius =
    profile.appearance.buttonStyle === "pill" ? "999px" : "16px";
  const serif = profile.appearance.textStyle === "serif";
  const classic = profile.appearance.textStyle === "classic";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] shadow-xl",
        compact ? "w-[280px]" : "w-full max-w-[380px]"
      )}
      style={{
        background: profile.appearance.backgroundColor,
        color: ink,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: profile.appearance.backgroundImage }}
      />
      <div
        className={cn(
          "relative flex flex-col items-center px-6 py-8",
          profile.appearance.layout === "minimal" && "py-6",
          compact && "px-5 py-6"
        )}
      >
        <div
          className={cn(
            "w-full",
            profile.appearance.layout === "card" &&
              "rounded-3xl bg-white/15 p-5 backdrop-blur-sm"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <Avatar photo={profile.photo} name={profile.fullName} size={compact ? "lg" : "xl"} />
            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] opacity-70">
              {profile.type}
            </p>
            <h3
              className={cn(
                "mt-1 text-[28px] leading-tight",
                serif ? "font-display" : "font-semibold tracking-tight",
                classic && "tracking-normal font-medium"
              )}
            >
              {profile.fullName}
            </h3>
            {profile.title ? (
              <p className="mt-1 text-sm" style={{ color: muted }}>
                {profile.title}
                {profile.company ? ` · ${profile.company}` : ""}
              </p>
            ) : null}
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed" style={{ color: muted }}>
              {profile.bio || "Add a short bio so visitors know who they’re meeting."}
            </p>
          </div>
          <div className="mt-6 space-y-2">
            {enabled.map((b) => {
              const Icon = ICONS[b.kind];
              const solid = profile.appearance.buttonStyle === "solid";
              const outline = profile.appearance.buttonStyle === "outline";
              const soft = profile.appearance.buttonStyle === "soft";
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onAction?.(b.label)}
                  className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition hover:opacity-90"
                  style={{
                    borderRadius: radius,
                    background: solid
                      ? profile.appearance.accentColor
                      : soft
                        ? "rgba(255,255,255,0.22)"
                        : "transparent",
                    color: solid ? contrastText(profile.appearance.accentColor) : ink,
                    border: outline
                      ? `1px solid ${ink}`
                      : `1px solid ${solid ? "transparent" : "rgba(255,255,255,0.18)"}`,
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {b.label}
                </button>
              );
            })}
          </div>
          {profile.location ? (
            <p className="mt-5 text-center text-xs" style={{ color: muted }}>
              {profile.location}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
