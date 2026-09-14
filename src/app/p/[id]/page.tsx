"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProfilePreview } from "@/components/profile/profile-preview";
import { Button } from "@/components/ui/button";
import { seedProfiles } from "@/lib/data";
import { useApp } from "@/lib/store";
import { Logo } from "@/components/marketing/site-chrome";

export default function VisitorPage() {
  const { id } = useParams<{ id: string }>();
  const { getProfile, notify } = useApp();
  const profile = getProfile(id) ?? seedProfiles.find((p) => p.id === id || p.type === id);

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <p>This profile is not available.</p>
        <Link href="/" className="mt-4 text-sm underline">
          Back to Qora
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink/95 px-4 py-8">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="mb-6 opacity-80">
          <Logo dark />
        </div>
        <ProfilePreview
          profile={profile}
          onAction={(label) => notify(`${label}: demo action only.`)}
        />
        {profile.extra.prompt ? (
          <p className="mt-4 max-w-sm text-center text-sm text-paper/70">{profile.extra.prompt}</p>
        ) : null}
        {profile.extra.offering ? (
          <p className="mt-4 max-w-sm text-center text-sm text-paper/70">{profile.extra.offering}</p>
        ) : null}
        <div className="mt-8 flex gap-2">
          <Link href={`/app/profiles/${profile.id}/qr`}>
            <Button variant="outline">View QR flow</Button>
          </Link>
          <Link href="/app">
            <Button variant="soft">Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
