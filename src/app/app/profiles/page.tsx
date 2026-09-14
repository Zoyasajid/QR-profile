"use client";

import Link from "next/link";
import { useState } from "react";
import { ProfileCard } from "@/components/profile/profile-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/feedback";
import { Modal } from "@/components/ui/modal";
import { useApp } from "@/lib/store";
import { profileShareUrl } from "@/lib/utils";

export default function ProfilesPage() {
  const { profiles, notify } = useApp();
  const [shareId, setShareId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl">My Profiles</h1>
        <Link href="/app/profiles/new">
          <Button>Create new profile</Button>
        </Link>
      </div>
      <p className="mt-2 max-w-xl text-sm text-slate">
        Four starter profiles show how one account keeps work, dating, personal, and business identities separate.
      </p>
      {profiles.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No profiles yet"
            body="Create your first card. It will appear here and on your QR picker."
            action={
              <Link href="/app/profiles/new">
                <Button>Create profile</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {profiles.map((p) => (
            <ProfileCard
              key={p.id}
              profile={p}
              onShare={() => {
                setShareId(p.id);
                notify("Share options opened.");
              }}
            />
          ))}
        </div>
      )}
      <Modal
        open={!!shareId}
        title="Share"
        onClose={() => setShareId(null)}
        footer={
          <Button
            onClick={() => {
              navigator.clipboard.writeText(profileShareUrl(shareId!));
              notify("Copied.");
            }}
          >
            Copy link
          </Button>
        }
      >
        {shareId ? profileShareUrl(shareId) : ""}
      </Modal>
    </div>
  );
}
