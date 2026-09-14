"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileEditor } from "@/components/profile/profile-editor";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/feedback";
import { useApp } from "@/lib/store";
import { cloneProfile } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export default function EditProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { getProfile, saveProfile, notify, deleteProfile } = useApp();
  const router = useRouter();
  const existing = getProfile(id);
  const [draft, setDraft] = useState<Profile | null>(null);

  useEffect(() => {
    if (existing) setDraft(cloneProfile(existing));
  }, [existing]);

  if (!existing || !draft) return <LoadingState label="Loading profile" />;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-mute">Editor</p>
          <h1 className="font-display text-4xl">{draft.name}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/app/profiles/${id}/preview`}>
            <Button variant="outline">Preview</Button>
          </Link>
          <Link href={`/app/profiles/${id}/qr`}>
            <Button variant="outline">QR Code</Button>
          </Link>
          <Button
            onClick={() => {
              saveProfile({ ...draft, status: "live" });
              notify("Saved. Other profiles were not changed.");
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <ProfileEditor value={draft} onChange={setDraft} />
      <div className="mt-8 flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => {
            saveProfile({ ...draft, status: "draft" });
            notify("Moved to draft.");
          }}
        >
          Save as draft
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteProfile(id);
            router.push("/app/profiles");
          }}
        >
          Delete profile
        </Button>
      </div>
    </div>
  );
}
