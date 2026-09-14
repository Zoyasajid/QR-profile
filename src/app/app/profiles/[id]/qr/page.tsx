"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { QRCodeCard } from "@/components/profile/qr-code-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/feedback";
import { useApp } from "@/lib/store";
import { profileShareUrl } from "@/lib/utils";

export default function QRPage() {
  const { id } = useParams<{ id: string }>();
  const { profiles, getProfile, notify } = useApp();
  const router = useRouter();
  const profile = getProfile(id);
  const [selected, setSelected] = useState(id);

  if (!profile) return <EmptyState title="Profile not found" body="Pick another profile from the dashboard." />;

  const current = getProfile(selected) ?? profile;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-4xl">QR code</h1>
      <p className="mt-2 text-sm text-slate">
        One physical code. Choose which live profile it represents right now.
      </p>
      <label className="mt-6 block text-sm font-medium">
        Destination profile
        <select
          className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            router.replace(`/app/profiles/${e.target.value}/qr`);
          }}
        >
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.status})
            </option>
          ))}
        </select>
      </label>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <QRCodeCard title={current.name} subtitle={current.fullName} seed={current.id} />
        <div className="rounded-3xl border border-line bg-white p-6">
          <p className="text-sm text-slate">{current.bio}</p>
          <p className="mt-4 break-all rounded-xl bg-paper px-3 py-2 font-mono text-xs">
            {profileShareUrl(current.id)}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(profileShareUrl(current.id));
                notify("Link copied.");
              }}
            >
              Copy link
            </Button>
            <Button
              variant="outline"
              onClick={() => notify("Share sheet simulated — use Copy link or Open visitor view.")}
            >
              Share
            </Button>
            <Button variant="outline" onClick={() => notify("Download simulated. No file generated.")}>
              Download QR
            </Button>
            <Link href={`/p/${current.id}`}>
              <Button variant="secondary" className="w-full">
                Simulate visitor scan
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
