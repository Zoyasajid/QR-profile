"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MarketingLayout } from "@/components/marketing/layout";
import { ProfilePreview } from "@/components/profile/profile-preview";
import { PROFILE_TYPES, seedProfiles } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function ExampleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const meta = PROFILE_TYPES.find((t) => t.type === slug);
  const profile = seedProfiles.find((p) => p.type === slug) ?? {
    ...seedProfiles[0],
    type: (meta?.type ?? "custom") as typeof seedProfiles[0]["type"],
    name: `${meta?.title ?? "Custom"} Profile`,
    bio: meta?.description ?? seedProfiles[0].bio,
  };

  return (
    <MarketingLayout>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-xs uppercase tracking-wide text-accent">Example</p>
          <h1 className="mt-2 font-display text-5xl">{meta?.title ?? "Custom"} profile</h1>
          <p className="mt-4 text-lg text-slate">{meta?.description}</p>
          <ul className="mt-8 space-y-3 text-sm text-slate">
            <li>Enabled buttons: {profile.buttons.filter((b) => b.enabled).map((b) => b.label).join(", ")}</li>
            <li>Theme: {profile.appearance.theme}</li>
            <li>Layout: {profile.appearance.layout}</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/p/${profile.id}`}>
              <Button>Open visitor view</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">Create this type</Button>
            </Link>
          </div>
        </div>
        <ProfilePreview profile={profile} />
      </div>
    </MarketingLayout>
  );
}
