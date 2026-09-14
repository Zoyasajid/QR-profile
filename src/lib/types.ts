export type ProfileType =
  | "work"
  | "personal"
  | "dating"
  | "business"
  | "social"
  | "resume"
  | "events"
  | "selling"
  | "pet"
  | "custom";

export type ButtonKind =
  | "call"
  | "email"
  | "website"
  | "linkedin"
  | "instagram"
  | "whatsapp"
  | "calendar"
  | "message"
  | "about"
  | "photos"
  | "resume"
  | "custom"
  | "meet"
  | "text"
  | "social";

export type ButtonStyle = "solid" | "outline" | "soft" | "pill";
export type TextStyle = "classic" | "modern" | "serif";
export type LayoutStyle = "centered" | "card" | "minimal";
export type ProfileStatus = "live" | "draft";

export interface ProfileButton {
  id: string;
  kind: ButtonKind;
  label: string;
  value: string;
  enabled: boolean;
}

export interface Appearance {
  theme: string;
  backgroundColor: string;
  backgroundImage: string;
  buttonStyle: ButtonStyle;
  textStyle: TextStyle;
  layout: LayoutStyle;
  accentColor: string;
}

export interface Profile {
  id: string;
  type: ProfileType;
  name: string;
  fullName: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  title: string;
  location: string;
  extra: Record<string, string>;
  photo: string;
  socials: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
  buttons: ProfileButton[];
  appearance: Appearance;
  status: ProfileStatus;
  views: number;
  scans: number;
  clicks: number;
  createdAt: string;
}

export interface UserAccount {
  name: string;
  email: string;
  plan: "free" | "pro" | "business";
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
}

export interface AnalyticsPoint {
  label: string;
  views: number;
  scans: number;
}
