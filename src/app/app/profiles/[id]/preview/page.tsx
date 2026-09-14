"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProfilePreview } from "@/components/profile/profile-preview";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/feedback";
import { useApp } from "@/lib/store";

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const { getProfile, notify } = useApp();
  const profile = getProfile(id);
  if (!profile) return <EmptyState title="Profile not found" body="It may have been removed from this demo session." />;
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="font-display text-4xl">Preview</h1>
      <p className="mt-2 text-sm text-slate">This is what a visitor sees after a scan. Disabled buttons are hidden.</p>
      <div className="mt-8 flex justify-center">
        <ProfilePreview profile={profile} onAction={(l) => notify(`${l} would open on a real device.`)} />
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href={`/p/${profile.id}`}>
          <Button>Open public page</Button>
        </Link>
        <Link href={`/app/profiles/${profile.id}`}>
          <Button variant="outline">Back to editor</Button>
        </Link>
      </div>
    </div>
  );
}
