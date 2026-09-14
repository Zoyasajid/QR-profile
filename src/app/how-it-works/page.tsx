import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/layout";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      t: "Create your workspace",
      d: "Sign up in the demo and land in a dashboard that already has sample Work, Dating, Personal, and Business profiles.",
    },
    {
      t: "Add a profile for each audience",
      d: "Choose a type, fill in the fields that matter, pick a photo, and turn buttons on or off.",
    },
    {
      t: "Style it independently",
      d: "Themes, type, and layout never leak between profiles. Your dating card can feel warm while work stays restrained.",
    },
    {
      t: "Attach a QR",
      d: "Open any profile’s QR screen, copy the public link, or simulate a visitor scan.",
    },
    {
      t: "Watch what happens",
      d: "Analytics show views, scans, and which buttons people actually tap — all mock data in this prototype.",
    },
  ];
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">How it works</p>
        <h1 className="mt-3 font-display text-5xl">From empty card to scannable presence</h1>
        <p className="mt-4 text-lg text-slate">
          Qora is a profile layer in front of a single code. You maintain many versions of yourself; visitors only ever see the one you pointed them to.
        </p>
        <ol className="mt-12 space-y-8">
          {steps.map((s, i) => (
            <li key={s.t} className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper">
                {i + 1}
              </span>
              <div>
                <h2 className="text-xl font-medium">{s.t}</h2>
                <p className="mt-2 text-slate">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/signup">
            <Button>Create your profile</Button>
          </Link>
          <Link href="/examples">
            <Button variant="outline">See examples</Button>
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
