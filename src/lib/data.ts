import type {
  Appearance,
  Profile,
  ProfileButton,
  ProfileType,
  ButtonKind,
} from "./types";

export const BRAND = {
  name: "Qora",
  tagline: "One QR. Every version of you.",
};

export const DEMO_ACCOUNT = {
  email: "alex@qora.demo",
  password: "demo1234",
  name: "Alex Rivera",
};

export const PROFILE_TYPES: {
  type: ProfileType;
  title: string;
  description: string;
}[] = [
  { type: "work", title: "Work", description: "Share your role, calendar, and professional contact details." },
  { type: "personal", title: "Personal", description: "A private card for friends and family with the links you actually use." },
  { type: "dating", title: "Dating", description: "A warmer profile with photos, prompts, and a meet-up button." },
  { type: "business", title: "Business", description: "A brand-first card for founders, studios, and client work." },
  { type: "social", title: "Social Media", description: "Collect every channel into one scannable destination." },
  { type: "resume", title: "Resume", description: "Let recruiters open your CV, portfolio, and availability instantly." },
  { type: "events", title: "Events", description: "Hand out a QR at mixers, conferences, and pop-ups." },
  { type: "selling", title: "Selling Items", description: "List a product, price, and checkout-style contact buttons." },
  { type: "pet", title: "Pet", description: "A lost-and-found or pet-sitter card with vet and owner details." },
  { type: "custom", title: "Custom", description: "Start blank and assemble the exact buttons you need." },
];

export const BUTTON_CATALOG: {
  kind: ButtonKind;
  label: string;
  placeholder: string;
}[] = [
  { kind: "call", label: "Call", placeholder: "+1 415 555 0148" },
  { kind: "email", label: "Email", placeholder: "hello@example.com" },
  { kind: "website", label: "Website", placeholder: "https://" },
  { kind: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/you" },
  { kind: "instagram", label: "Instagram", placeholder: "@username" },
  { kind: "whatsapp", label: "WhatsApp", placeholder: "+1 415 555 0148" },
  { kind: "calendar", label: "Calendar", placeholder: "https://cal.com/you" },
  { kind: "message", label: "Message", placeholder: "sms:+14155550148" },
  { kind: "about", label: "About Me", placeholder: "A short story or prompt" },
  { kind: "photos", label: "Photos", placeholder: "Photo album link" },
  { kind: "resume", label: "Resume", placeholder: "https://..." },
  { kind: "meet", label: "Let's Meet", placeholder: "Coffee, walk, or drinks" },
  { kind: "text", label: "Text", placeholder: "+1 415 555 0148" },
  { kind: "social", label: "Social Media", placeholder: "https://linktr.ee/you" },
  { kind: "custom", label: "Custom Link", placeholder: "https://" },
];

export const THEMES = [
  { id: "ink", name: "Ink", backgroundColor: "#0F1F2E", accentColor: "#C45C26", backgroundImage: "" },
  { id: "paper", name: "Paper", backgroundColor: "#F4EFE6", accentColor: "#1F6B5C", backgroundImage: "" },
  { id: "slate", name: "Slate", backgroundColor: "#1C2430", accentColor: "#7BA3C9", backgroundImage: "" },
  { id: "rose", name: "Rose", backgroundColor: "#F7E8E4", accentColor: "#B44A4A", backgroundImage: "" },
  { id: "forest", name: "Forest", backgroundColor: "#16352C", accentColor: "#D4B483", backgroundImage: "" },
  { id: "sand", name: "Sand", backgroundColor: "#EFE6D6", accentColor: "#0F1F2E", backgroundImage: "" },
];

export const BACKGROUNDS = [
  { id: "none", name: "Solid", value: "" },
  { id: "grain", name: "Grain", value: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(196,92,38,0.25), transparent 42%)" },
  { id: "wash", name: "Wash", value: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent 50%)" },
  { id: "mesh", name: "Mesh", value: "radial-gradient(at 0% 100%, rgba(31,107,92,0.35), transparent 50%), radial-gradient(at 100% 0%, rgba(196,92,38,0.28), transparent 46%)" },
];

export const DEMO_PHOTOS = [
  { id: "alex-work", label: "Studio portrait", initials: "AR", color: "#1F6B5C" },
  { id: "alex-date", label: "Weekend light", initials: "AR", color: "#B44A4A" },
  { id: "alex-personal", label: "City walk", initials: "AR", color: "#3D5A80" },
  { id: "alex-biz", label: "Founder shot", initials: "AR", color: "#C45C26" },
  { id: "neutral", label: "Monogram", initials: "QR", color: "#0F1F2E" },
];

function btn(
  kind: ButtonKind,
  label: string,
  value: string,
  enabled = true
): ProfileButton {
  return { id: `${kind}-${label.toLowerCase().replace(/\s+/g, "-")}`, kind, label, value, enabled };
}

const sharedSocials = {
  linkedin: "linkedin.com/in/alexrivera",
  instagram: "@alex.rivera",
  twitter: "@alexbuilds",
};

export const defaultAppearance = (overrides: Partial<Appearance> = {}): Appearance => ({
  theme: "ink",
  backgroundColor: "#0F1F2E",
  backgroundImage: BACKGROUNDS[1].value,
  buttonStyle: "solid",
  textStyle: "modern",
  layout: "centered",
  accentColor: "#C45C26",
  ...overrides,
});

export const seedProfiles: Profile[] = [
  {
    id: "work",
    type: "work",
    name: "Work Profile",
    fullName: "Alex Rivera",
    bio: "Product lead at Northshore. I help teams ship quieter, more useful software.",
    email: "alex@northshore.co",
    phone: "+1 415 555 0148",
    website: "https://alexrivera.co",
    company: "Northshore",
    title: "Director of Product",
    location: "San Francisco, CA",
    extra: { availability: "Tue–Thu afternoons" },
    photo: "alex-work",
    socials: sharedSocials,
    buttons: [
      btn("call", "Call", "+1 415 555 0148"),
      btn("email", "Email", "alex@northshore.co"),
      btn("website", "Website", "https://alexrivera.co"),
      btn("linkedin", "LinkedIn", "linkedin.com/in/alexrivera"),
      btn("calendar", "Calendar", "https://cal.com/alexrivera"),
    ],
    appearance: defaultAppearance({
      theme: "ink",
      backgroundColor: "#0F1F2E",
      accentColor: "#C45C26",
      buttonStyle: "solid",
      textStyle: "modern",
      layout: "centered",
    }),
    status: "live",
    views: 1842,
    scans: 631,
    clicks: 412,
    createdAt: "2026-03-12",
  },
  {
    id: "dating",
    type: "dating",
    name: "Dating Profile",
    fullName: "Alex",
    bio: "Weekends for farmers markets, bad karaoke, and long walks that accidentally become dinner.",
    email: "hello.alex.r@gmail.com",
    phone: "+1 415 555 0190",
    website: "",
    company: "",
    title: "",
    location: "Mission District",
    extra: { prompt: "Best first date: tacos and a bookstore." },
    photo: "alex-date",
    socials: { ...sharedSocials, instagram: "@alex.weekends" },
    buttons: [
      btn("about", "About Me", "Curious, a little sarcastic, always down for live music."),
      btn("photos", "Photos", "album://weekend"),
      btn("instagram", "Instagram", "@alex.weekends"),
      btn("message", "Message", "sms:+14155550190"),
      btn("meet", "Let's Meet", "Coffee this weekend?"),
    ],
    appearance: defaultAppearance({
      theme: "rose",
      backgroundColor: "#F7E8E4",
      accentColor: "#B44A4A",
      buttonStyle: "pill",
      textStyle: "serif",
      layout: "card",
      backgroundImage: BACKGROUNDS[3].value,
    }),
    status: "live",
    views: 968,
    scans: 274,
    clicks: 501,
    createdAt: "2026-05-02",
  },
  {
    id: "personal",
    type: "personal",
    name: "Personal Profile",
    fullName: "Alex Rivera",
    bio: "For friends and family — the fastest way to reach me without the work inbox.",
    email: "alex.family@gmail.com",
    phone: "+1 415 555 0112",
    website: "",
    company: "",
    title: "",
    location: "San Francisco",
    extra: {},
    photo: "alex-personal",
    socials: sharedSocials,
    buttons: [
      btn("call", "Phone", "+1 415 555 0112"),
      btn("text", "Text", "+1 415 555 0112"),
      btn("email", "Email", "alex.family@gmail.com"),
      btn("social", "Social Media", "https://alexrivera.co/social"),
    ],
    appearance: defaultAppearance({
      theme: "paper",
      backgroundColor: "#F4EFE6",
      accentColor: "#1F6B5C",
      buttonStyle: "soft",
      textStyle: "classic",
      layout: "minimal",
      backgroundImage: BACKGROUNDS[2].value,
    }),
    status: "live",
    views: 412,
    scans: 88,
    clicks: 140,
    createdAt: "2026-01-20",
  },
  {
    id: "business",
    type: "business",
    name: "Business Profile",
    fullName: "Rivera Studio",
    bio: "Independent product studio. We design digital products that feel considered, not loud.",
    email: "studio@rivera.co",
    phone: "+1 415 555 0177",
    website: "https://riverastudio.co",
    company: "Rivera Studio",
    title: "Founder",
    location: "California & remote",
    extra: { offering: "Product design retainers from $8k/mo" },
    photo: "alex-biz",
    socials: sharedSocials,
    buttons: [
      btn("website", "Website", "https://riverastudio.co"),
      btn("email", "Email", "studio@rivera.co"),
      btn("calendar", "Book a call", "https://cal.com/rivera-studio"),
      btn("linkedin", "LinkedIn", "linkedin.com/company/rivera-studio"),
      btn("custom", "Case studies", "https://riverastudio.co/work", false),
    ],
    appearance: defaultAppearance({
      theme: "sand",
      backgroundColor: "#EFE6D6",
      accentColor: "#0F1F2E",
      buttonStyle: "outline",
      textStyle: "modern",
      layout: "card",
    }),
    status: "draft",
    views: 221,
    scans: 40,
    clicks: 67,
    createdAt: "2026-07-18",
  },
];

export const analyticsSeries = [
  { label: "Mar 9", views: 42, scans: 11 },
  { label: "Mar 10", views: 58, scans: 16 },
  { label: "Mar 11", views: 49, scans: 12 },
  { label: "Mar 12", views: 71, scans: 21 },
  { label: "Mar 13", views: 88, scans: 29 },
  { label: "Mar 14", views: 64, scans: 18 },
  { label: "Mar 15", views: 97, scans: 34 },
];

export const activityFeed = [
  { id: "1", text: "Work Profile scanned at Northshore lobby", time: "12 min ago" },
  { id: "2", text: "Dating Profile received 18 photo taps", time: "1 hr ago" },
  { id: "3", text: "Personal Profile email button clicked", time: "Yesterday" },
  { id: "4", text: "Business Profile saved as draft", time: "2 days ago" },
];

export function emptyProfile(type: ProfileType = "custom"): Profile {
  const meta = PROFILE_TYPES.find((t) => t.type === type);
  return {
    id: `p-${Date.now()}`,
    type,
    name: `${meta?.title ?? "Custom"} Profile`,
    fullName: DEMO_ACCOUNT.name,
    bio: "",
    email: DEMO_ACCOUNT.email,
    phone: "",
    website: "",
    company: "",
    title: "",
    location: "",
    extra: {},
    photo: "neutral",
    socials: { linkedin: "", instagram: "", twitter: "" },
    buttons: defaultButtonsForType(type),
    appearance: defaultAppearance(),
    status: "draft",
    views: 0,
    scans: 0,
    clicks: 0,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export function defaultButtonsForType(type: ProfileType): ProfileButton[] {
  switch (type) {
    case "work":
      return [
        btn("call", "Call", ""),
        btn("email", "Email", ""),
        btn("website", "Website", ""),
        btn("linkedin", "LinkedIn", ""),
        btn("calendar", "Calendar", ""),
      ];
    case "dating":
      return [
        btn("about", "About Me", ""),
        btn("photos", "Photos", ""),
        btn("instagram", "Instagram", ""),
        btn("message", "Message", ""),
        btn("meet", "Let's Meet", ""),
      ];
    case "personal":
      return [
        btn("call", "Phone", ""),
        btn("text", "Text", ""),
        btn("email", "Email", ""),
        btn("social", "Social Media", ""),
      ];
    case "business":
      return [
        btn("website", "Website", ""),
        btn("email", "Email", ""),
        btn("calendar", "Book a call", ""),
        btn("linkedin", "LinkedIn", ""),
      ];
    case "resume":
      return [
        btn("resume", "Resume", ""),
        btn("email", "Email", ""),
        btn("linkedin", "LinkedIn", ""),
        btn("calendar", "Availability", ""),
      ];
    default:
      return [
        btn("email", "Email", ""),
        btn("website", "Website", ""),
        btn("custom", "Custom Link", ""),
      ];
  }
}
