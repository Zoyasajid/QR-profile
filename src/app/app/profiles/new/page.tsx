"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ProfileTypeCard } from "@/components/profile/profile-type-card";
import { WizardChrome } from "@/components/profile/profile-editor";
import { ProfilePreview } from "@/components/profile/profile-preview";
import { QRCodeCard } from "@/components/profile/qr-code-card";
import { Button } from "@/components/ui/button";
import { DEMO_PHOTOS, PROFILE_TYPES, emptyProfile } from "@/lib/data";
import type { Profile, ProfileType } from "@/lib/types";
import { useApp } from "@/lib/store";
import { Avatar } from "@/components/profile/avatar";
import { ProfileButtonManager } from "@/components/profile/profile-button-manager";
import { ThemeSelector } from "@/components/profile/theme-selector";
import { Field, Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function NewProfilePage() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Profile>(emptyProfile("work"));
  const { saveProfile, notify } = useApp();
  const router = useRouter();
  const total = 7;

  const next = () => setStep((s) => Math.min(total, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const titles = useMemo(
    () => [
      "Choose a profile type",
      "Enter information",
      "Add a photo",
      "Select profile buttons",
      "Customize appearance",
      "Preview",
      "Save",
    ],
    []
  );

  const finish = () => {
    const saved = { ...draft, status: "live" as const };
    saveProfile(saved);
    notify("Profile saved to this demo session.");
    router.push(`/app/profiles/${saved.id}`);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <WizardChrome step={step} total={total} title={titles[step - 1]}>
        {step === 1 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {PROFILE_TYPES.filter((t) => t.type !== "selling" && t.type !== "pet").map((t) => (
              <ProfileTypeCard
                key={t.type}
                type={t.type}
                selected={draft.type === t.type}
                onSelect={(type) => setDraft(emptyProfile(type as ProfileType))}
              />
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4 rounded-3xl border border-line bg-white p-6 sm:grid-cols-2">
            <Field label="Profile name">
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </Field>
            <Field label="Full name">
              <Input value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Bio">
                <Textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
              </Field>
            </div>
            <Field label="Email">
              <Input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
            </Field>
            <Field label="Website">
              <Input value={draft.website} onChange={(e) => setDraft({ ...draft, website: e.target.value })} />
            </Field>
            <Field label="LinkedIn">
              <Input
                value={draft.socials.linkedin}
                onChange={(e) => setDraft({ ...draft, socials: { ...draft.socials, linkedin: e.target.value } })}
              />
            </Field>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-wrap gap-4">
            {DEMO_PHOTOS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setDraft({ ...draft, photo: p.id })}
                className={cn("rounded-3xl border p-3", draft.photo === p.id ? "border-ink" : "border-line")}
              >
                <Avatar photo={p.id} name={p.label} size="lg" />
                <p className="mt-2 text-xs text-mute">{p.label}</p>
              </button>
            ))}
          </div>
        )}
        {step === 4 && (
          <ProfileButtonManager
            buttons={draft.buttons}
            onChange={(buttons) => setDraft({ ...draft, buttons })}
          />
        )}
        {step === 5 && (
          <div className="grid gap-8 lg:grid-cols-2">
            <ThemeSelector
              value={draft.appearance}
              onChange={(appearance) => setDraft({ ...draft, appearance })}
            />
            <ProfilePreview profile={draft} compact />
          </div>
        )}
        {step === 6 && (
          <div className="flex justify-center">
            <ProfilePreview profile={draft} />
          </div>
        )}
        {step === 7 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-6">
              <h2 className="font-display text-2xl">Ready to publish?</h2>
              <p className="mt-2 text-sm text-slate">
                Saving marks this profile live and adds it to My Profiles. You can still edit it independently of the others.
              </p>
              <Button className="mt-6" onClick={finish}>
                Save profile
              </Button>
            </div>
            <QRCodeCard title={draft.name} subtitle="QR will point here after save" seed={draft.id} />
          </div>
        )}
      </WizardChrome>
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={back} disabled={step === 1}>
          Back
        </Button>
        {step < 7 ? (
          <Button onClick={next}>Continue</Button>
        ) : (
          <Button variant="soft" onClick={() => router.push("/app/profiles")}>
            Skip to list
          </Button>
        )}
      </div>
    </div>
  );
}
