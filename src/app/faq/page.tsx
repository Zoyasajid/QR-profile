import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/layout";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "What is Qora?",
    a: "A QR profile platform. You maintain multiple profiles and share them through one code.",
  },
  {
    q: "Can I have different buttons on each profile?",
    a: "Yes. Work might expose Calendar and LinkedIn while Dating exposes Photos and Let’s Meet.",
  },
  {
    q: "Do I reprint the QR when I edit a profile?",
    a: "No. The public page updates as soon as you save. In production, the code would stay the same.",
  },
  {
    q: "Is login real?",
    a: "No. Use the demo account button or any email and a password of 6+ characters. Data stays in this browser.",
  },
  {
    q: "Can I delete a profile?",
    a: "Yes, from Settings or the editor. It only affects this demo session.",
  },
  {
    q: "Will this become WordPress?",
    a: "This Next.js prototype is the visual and interaction blueprint for a later production build.",
  },
];

export default function FaqPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-5xl">FAQ</h1>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-3xl border border-line bg-white p-5">
              <h2 className="font-medium">{f.q}</h2>
              <p className="mt-2 text-sm text-slate">{f.a}</p>
            </div>
          ))}
        </div>
        <Link href="/app/help" className="mt-8 inline-block">
          <Button variant="outline">Open in-app help</Button>
        </Link>
      </div>
    </MarketingLayout>
  );
}
