"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { AnalyticsCard } from "@/components/analytics/charts";
import { ProfileCard } from "@/components/profile/profile-card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { activityFeed } from "@/lib/data";
import { useApp } from "@/lib/store";
import { formatNumber, profileShareUrl } from "@/lib/utils";
import { useState } from "react";

export default function DashboardPage() {
  const { user, profiles, notify } = useApp();
  const [shareId, setShareId] = useState<string | null>(null);
  const views = profiles.reduce((s, p) => s + p.views, 0);
  const scans = profiles.reduce((s, p) => s + p.scans, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate">Welcome back</p>
          <h1 className="font-display text-4xl text-ink">{user?.name}</h1>
        </div>
        <Link href="/app/profiles/new">
          <Button>
            <Plus className="h-4 w-4" /> Create new profile
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <AnalyticsCard label="Total profiles" value={String(profiles.length)} hint="Independent cards on this QR" />
        <AnalyticsCard label="Profile views" value={formatNumber(views)} hint="Last 30 days · demo" />
        <AnalyticsCard label="QR scans" value={formatNumber(scans)} hint="Across all live profiles" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Profiles</h2>
            <Link href="/app/profiles" className="text-sm text-slate">
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {profiles.map((p) => (
              <ProfileCard
                key={p.id}
                profile={p}
                onShare={() => {
                  setShareId(p.id);
                  notify("Share sheet ready.");
                }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h2 className="text-lg font-medium">Quick actions</h2>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/app/profiles/new">
                <Button variant="outline" className="w-full">
                  New profile
                </Button>
              </Link>
              <Link href="/app/profiles/work/qr">
                <Button variant="outline" className="w-full">
                  Open Work QR
                </Button>
              </Link>
              <Link href="/app/analytics">
                <Button variant="outline" className="w-full">
                  Review analytics
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h2 className="text-lg font-medium">Recent activity</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {activityFeed.map((a) => (
                <li key={a.id} className="flex justify-between gap-3">
                  <span>{a.text}</span>
                  <span className="shrink-0 text-mute">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Modal
        open={!!shareId}
        title="Share profile"
        onClose={() => setShareId(null)}
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(profileShareUrl(shareId!));
                notify("Link copied.");
              }}
            >
              Copy link
            </Button>
            <Link href={`/p/${shareId}`}>
              <Button>Open public page</Button>
            </Link>
          </>
        }
      >
        Send this visitor URL. In production it would ride on the same QR.
        <p className="mt-3 break-all rounded-xl bg-paper px-3 py-2 font-mono text-xs">
          {shareId ? profileShareUrl(shareId) : ""}
        </p>
      </Modal>
    </div>
  );
}
