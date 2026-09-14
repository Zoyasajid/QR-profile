"use client";

import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/layout";
import { ProfilePreview } from "@/components/profile/profile-preview";
import { seedProfiles, PROFILE_TYPES } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function ExamplesPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-display text-5xl">Example profiles</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate">
          Same person, four destinations. Open any card to see the visitor experience and the buttons that stay on.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {seedProfiles.map((p) => (
            <div key={p.id} className="flex flex-col">
              <ProfilePreview profile={p} compact />
              <Link href={`/examples/${p.type}`} className="mt-4">
                <Button variant="outline" className="w-full">
                  View {p.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <h2 className="mt-16 font-display text-3xl">All types</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PROFILE_TYPES.map((t) => (
            <Link key={t.type} href={`/examples/${t.type}`} className="rounded-2xl border border-line bg-white p-4">
              {t.title}
            </Link>
          ))}
        </div>
      </div>
    </MarketingLayout>
  );
}
