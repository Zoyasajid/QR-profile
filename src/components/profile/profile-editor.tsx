"use client";

import { useState } from "react";
import { DEMO_PHOTOS, PROFILE_TYPES } from "@/lib/data";
import type { Profile, ProfileType } from "@/lib/types";
import { Field, Input, Textarea } from "../ui/input";
import { ProfileButtonManager } from "./profile-button-manager";
import { ThemeSelector } from "./theme-selector";
import { Avatar } from "./avatar";
import { ProfilePreview } from "./profile-preview";
import { cn } from "@/lib/utils";

export function ProfileEditor({
  value,
  onChange,
}: {
  value: Profile;
  onChange: (next: Profile) => void;
}) {
  const set = (patch: Partial<Profile>) => onChange({ ...value, ...patch });
  const typeMeta = PROFILE_TYPES.find((t) => t.type === value.type);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-8">
        <section className="rounded-3xl border border-line bg-white p-5 sm:p-6">
          <h3 className="font-display text-2xl">Information</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Profile name">
              <Input value={value.name} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="Profile type">
              <select
                className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm"
                value={value.type}
                onChange={(e) => set({ type: e.target.value as ProfileType })}
              >
                {PROFILE_TYPES.map((t) => (
                  <option key={t.type} value={t.type}>
                    {t.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Full name">
              <Input value={value.fullName} onChange={(e) => set({ fullName: e.target.value })} />
            </Field>
            <Field label="Headline / title">
              <Input value={value.title} onChange={(e) => set({ title: e.target.value })} />
            </Field>
            <Field label="Email">
              <Input type="email" value={value.email} onChange={(e) => set({ email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input value={value.phone} onChange={(e) => set({ phone: e.target.value })} />
            </Field>
            <Field label="Website">
              <Input value={value.website} onChange={(e) => set({ website: e.target.value })} />
            </Field>
            <Field label="Location">
              <Input value={value.location} onChange={(e) => set({ location: e.target.value })} />
            </Field>
            {(value.type === "work" || value.type === "business") && (
              <Field label="Company">
                <Input value={value.company} onChange={(e) => set({ company: e.target.value })} />
              </Field>
            )}
            {value.type === "dating" && (
              <Field label="Dating prompt">
                <Input
                  value={value.extra.prompt ?? ""}
                  onChange={(e) => set({ extra: { ...value.extra, prompt: e.target.value } })}
                />
              </Field>
            )}
            {value.type === "resume" && (
              <Field label="Role seeking">
                <Input
                  value={value.extra.role ?? ""}
                  onChange={(e) => set({ extra: { ...value.extra, role: e.target.value } })}
                />
              </Field>
            )}
            {value.type === "selling" && (
              <Field label="Price">
                <Input
                  value={value.extra.price ?? ""}
                  onChange={(e) => set({ extra: { ...value.extra, price: e.target.value } })}
                />
              </Field>
            )}
            {value.type === "pet" && (
              <Field label="Pet name">
                <Input
                  value={value.extra.petName ?? ""}
                  onChange={(e) => set({ extra: { ...value.extra, petName: e.target.value } })}
                />
              </Field>
            )}
            <div className="sm:col-span-2">
              <Field label="Bio">
                <Textarea value={value.bio} onChange={(e) => set({ bio: e.target.value })} />
              </Field>
            </div>
            <Field label="LinkedIn">
              <Input
                value={value.socials.linkedin}
                onChange={(e) => set({ socials: { ...value.socials, linkedin: e.target.value } })}
              />
            </Field>
            <Field label="Instagram">
              <Input
                value={value.socials.instagram}
                onChange={(e) => set({ socials: { ...value.socials, instagram: e.target.value } })}
              />
            </Field>
          </div>
          <p className="mt-4 text-xs text-mute">{typeMeta?.description}</p>
        </section>

        <section className="rounded-3xl border border-line bg-white p-5 sm:p-6">
          <h3 className="font-display text-2xl">Photo</h3>
          <p className="mt-1 text-sm text-slate">Choose a demo portrait. No file is uploaded in this prototype.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {DEMO_PHOTOS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => set({ photo: p.id })}
                className={cn(
                  "rounded-2xl border p-2",
                  value.photo === p.id ? "border-ink" : "border-line"
                )}
              >
                <Avatar photo={p.id} name={p.label} />
                <p className="mt-2 w-16 text-center text-[11px] text-mute">{p.label}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-white p-5 sm:p-6">
          <h3 className="font-display text-2xl">Buttons</h3>
          <p className="mt-1 text-sm text-slate">
            Toggle visibility, reorder, or add links. Only enabled buttons appear on the public page.
          </p>
          <div className="mt-5">
            <ProfileButtonManager
              buttons={value.buttons}
              onChange={(buttons) => set({ buttons })}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-white p-5 sm:p-6">
          <h3 className="font-display text-2xl">Appearance</h3>
          <div className="mt-5">
            <ThemeSelector
              value={value.appearance}
              onChange={(appearance) => set({ appearance })}
            />
          </div>
        </section>
      </div>
      <div className="xl:sticky xl:top-24 xl:self-start">
        <p className="mb-3 text-xs uppercase tracking-wide text-mute">Live preview</p>
        <ProfilePreview profile={value} />
      </div>
    </div>
  );
}

export function WizardChrome({
  step,
  total,
  title,
  children,
}: {
  step: number;
  total: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-mute">
        Step {step} of {total}
      </p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
        <div className="h-full bg-ink" style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <h1 className="mt-5 font-display text-3xl text-ink">{title}</h1>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function useDraft(initial: Profile) {
  const [draft, setDraft] = useState(initial);
  return { draft, setDraft };
}
