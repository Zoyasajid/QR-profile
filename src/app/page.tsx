"use client";

import Link from "next/link";
import { ArrowRight, QrCode, ScanLine, Layers, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingLayout } from "@/components/marketing/layout";
import { ProfilePreview } from "@/components/profile/profile-preview";
import { seedProfiles, PROFILE_TYPES, BRAND } from "@/lib/data";

export default function HomePage() {
  return (
    <MarketingLayout>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">QR profile platform</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
            One QR code. Multiple profiles.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate">
            {BRAND.name} lets you keep work, dating, personal, and business lives separate — then share the right one from a single scannable code.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Create your profile <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                See how it works
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {seedProfiles.slice(0, 3).map((p) => (
            <div key={p.id} className="shrink-0">
              <ProfilePreview profile={p} compact />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div>
            <QrCode className="h-8 w-8" />
            <h2 className="mt-4 font-display text-4xl">Print one code. Decide later who sees what.</h2>
            <p className="mt-4 text-slate">
              Stick a Qora code on a business card, badge, or poster. After the scan, you choose which live profile opens — work for a conference, personal for friends, dating when you want it.
            </p>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-paper">
            <p className="text-sm uppercase tracking-wide text-paper/60">The idea</p>
            <ol className="mt-4 space-y-4 text-sm">
              <li>1. Create as many profiles as you need.</li>
              <li>2. Style each one independently.</li>
              <li>3. Point your QR at any live profile, instantly.</li>
              <li>4. See scans, views, and button taps in analytics.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl">Built for real sharing, not another link dump</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Layers, t: "Independent profiles", d: "Work never inherits your dating buttons. Each card has its own photo, copy, and theme." },
            { icon: ScanLine, t: "QR as the front door", d: "Visitors land on a mobile-first page with only the actions you enabled." },
            { icon: Shield, t: "Share with intention", d: "Draft profiles stay private. Live profiles can be swapped without reprinting the code." },
          ].map((f) => (
            <div key={f.t} className="rounded-3xl border border-line bg-white p-6">
              <f.icon className="h-5 w-5" />
              <h3 className="mt-4 text-lg font-medium">{f.t}</h3>
              <p className="mt-2 text-sm text-slate">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl">Profile types teams actually use</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROFILE_TYPES.map((t) => (
              <Link
                key={t.type}
                href={`/examples/${t.type}`}
                className="rounded-3xl border border-line p-4 hover:border-ink"
              >
                <p className="font-medium">{t.title}</p>
                <p className="mt-2 text-sm text-slate">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl">How it works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["Create", "Pick a type and fill in only what that audience should see."],
            ["Style", "Theme, buttons, and photos stay unique to that profile."],
            ["Share", "Hand over one QR. Change the destination whenever you like."],
          ].map(([t, d], i) => (
            <div key={t} className="rounded-3xl bg-ink p-6 text-paper">
              <p className="text-xs uppercase tracking-wide text-paper/50">0{i + 1}</p>
              <h3 className="mt-3 font-display text-3xl">{t}</h3>
              <p className="mt-2 text-sm text-paper/75">{d}</p>
            </div>
          ))}
        </div>
        <Link href="/how-it-works" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
          Full walkthrough <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="border-y border-line bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl">Pricing preview</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Free", "$0", "2 profiles, demo QR, Qora watermark"],
              ["Pro", "$12/mo", "Unlimited profiles, analytics, custom themes"],
              ["Business", "$29/mo", "Team seats, shared codes, event pages"],
            ].map(([n, p, d]) => (
              <div key={n} className="rounded-3xl border border-line p-6">
                <p className="text-sm text-mute">{n}</p>
                <p className="mt-2 font-display text-4xl">{p}</p>
                <p className="mt-3 text-sm text-slate">{d}</p>
                <Link href="/pricing">
                  <Button className="mt-6 w-full" variant={n === "Pro" ? "primary" : "outline"}>
                    View details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl">Questions, quickly</h2>
        <div className="mt-8 space-y-4">
          {[
            ["Do I need a new QR for every profile?", "No. One code can point to whichever live profile you select."],
            ["Can visitors see my other profiles?", "Only the profile attached to that QR. Everything else stays in your dashboard."],
            ["Is this a real account system?", "This build is a clickable prototype. Sign-in is simulated for product review."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-3xl border border-line bg-white p-5">
              <p className="font-medium">{q}</p>
              <p className="mt-2 text-sm text-slate">{a}</p>
            </div>
          ))}
        </div>
        <Link href="/faq" className="mt-6 inline-block text-sm font-medium">
          Browse all FAQs →
        </Link>
      </section>
    </MarketingLayout>
  );
}
