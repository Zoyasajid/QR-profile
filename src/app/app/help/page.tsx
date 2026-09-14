"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { useApp } from "@/lib/store";

const items = [
  { cat: "Getting started", q: "How do I add a second profile?", a: "Open Create profile, pick a type, and save. It appears beside your existing cards and can be selected on the QR screen." },
  { cat: "Getting started", q: "How do I switch what the QR opens?", a: "Go to any profile’s QR page and change Destination profile." },
  { cat: "Profiles", q: "Why don’t dating buttons show on my work card?", a: "Buttons are stored per profile. Editing Work never writes to Dating." },
  { cat: "QR", q: "Is the QR a real scan target?", a: "It is a representative visual. Use Simulate visitor scan to open the public page." },
  { cat: "Billing", q: "Will I be charged?", a: "No. Pricing screens are narrative only." },
];

export default function HelpPage() {
  const { notify } = useApp();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [message, setMessage] = useState("");
  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (cat === "All" || i.cat === cat) &&
          (i.q + i.a).toLowerCase().includes(query.toLowerCase())
      ),
    [query, cat]
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-4xl">Help / Support</h1>
      <Input placeholder="Search help" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        {["All", "Getting started", "Profiles", "QR", "Billing"].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1.5 text-sm ${cat === c ? "bg-ink text-paper" : "border border-line bg-white"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((i) => (
          <div key={i.q} className="rounded-3xl border border-line bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-mute">{i.cat}</p>
            <h2 className="mt-1 font-medium">{i.q}</h2>
            <p className="mt-2 text-sm text-slate">{i.a}</p>
          </div>
        ))}
      </div>
      <form
        className="rounded-3xl border border-line bg-white p-6"
        onSubmit={(e) => {
          e.preventDefault();
          notify("Support request sent (demo).");
          setMessage("");
        }}
      >
        <h2 className="font-medium">Contact support</h2>
        <div className="mt-4">
          <Field label="How can we help?">
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
          </Field>
        </div>
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
