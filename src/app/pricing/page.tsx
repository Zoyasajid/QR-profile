import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/layout";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    items: ["2 profiles", "Demo QR visual", "Qora watermark", "Community help"],
  },
  {
    name: "Pro",
    price: "$12",
    items: ["Unlimited profiles", "Analytics", "Custom themes", "Link copy & share", "Priority inbox"],
  },
  {
    name: "Business",
    price: "$29",
    items: ["Team seats", "Shared QR destinations", "Event profiles", "Brand kit", "SSO placeholder"],
  },
];

export default function PricingPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-display text-5xl">Simple pricing for a profile layer</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate">
          This prototype does not process payments. The plans exist so stakeholders can walk the upgrade story.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className="flex flex-col rounded-3xl border border-line bg-white p-6">
              <p className="text-sm text-mute">{p.name}</p>
              <p className="mt-2 font-display text-5xl">
                {p.price}
                <span className="text-base text-slate">/mo</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-slate">
                {p.items.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
              <Link href="/signup">
                <Button className="mt-8 w-full" variant={p.name === "Pro" ? "primary" : "outline"}>
                  Start with {p.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MarketingLayout>
  );
}
