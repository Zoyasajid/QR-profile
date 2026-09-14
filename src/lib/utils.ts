import type { ButtonKind, Profile, ProfileType } from "./types";

export function cn(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export function profileShareUrl(id: string) {
  if (typeof window === "undefined") return `/p/${id}`;
  return `${window.location.origin}/p/${id}`;
}

export function typeLabel(type: ProfileType) {
  return type
    .replace("social", "Social Media")
    .replace("selling", "Selling Items")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function contrastText(bg: string) {
  const hex = bg.replace("#", "");
  if (hex.length !== 6) return "#0F1F2E";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? "#0F1F2E" : "#F6F3EE";
}

export function cloneProfile(profile: Profile): Profile {
  return JSON.parse(JSON.stringify(profile)) as Profile;
}

export const buttonIcons: Record<ButtonKind, string> = {
  call: "Phone",
  email: "Mail",
  website: "Globe",
  linkedin: "Linkedin",
  instagram: "Instagram",
  whatsapp: "MessageCircle",
  calendar: "Calendar",
  message: "MessageSquare",
  about: "User",
  photos: "Images",
  resume: "FileText",
  custom: "Link",
  meet: "Coffee",
  text: "Smartphone",
  social: "Share2",
};
