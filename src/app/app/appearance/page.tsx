"use client";

import { useState } from "react";
import { ProfilePreview } from "@/components/profile/profile-preview";
import { ThemeSelector } from "@/components/profile/theme-selector";
import { Button } from "@/components/ui/button";
import { defaultAppearance } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function AppearancePage() {
  const { profiles, saveProfile, notify, appearanceDefaults, updateAppearanceDefaults } = useApp();
  const [target, setTarget] = useState(profiles[0]?.id ?? "");
  const profile = profiles.find((p) => p.id === target) ?? profiles[0];
  const [appearance, setAppearance] = useState(appearanceDefaults ?? profile?.appearance ?? defaultAppearance());

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-4xl">Appearance</h1>
      <p className="mt-2 text-sm text-slate">
        Customize one profile at a time. Saving never overwrites a different profile’s theme.
      </p>
      <label className="mt-6 block max-w-sm text-sm font-medium">
        Profile
        <select
          className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3"
          value={profile.id}
          onChange={(e) => {
            const p = profiles.find((x) => x.id === e.target.value);
            setTarget(e.target.value);
            if (p) setAppearance(p.appearance);
          }}
        >
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-line bg-white p-6">
          <ThemeSelector value={appearance} onChange={setAppearance} />
          <Button
            className="mt-6"
            onClick={() => {
              saveProfile({ ...profile, appearance });
              updateAppearanceDefaults(appearance, profile.id);
              notify(`Appearance saved for ${profile.name}.`);
            }}
          >
            Save changes
          </Button>
        </div>
        <ProfilePreview profile={{ ...profile, appearance }} />
      </div>
    </div>
  );
}
