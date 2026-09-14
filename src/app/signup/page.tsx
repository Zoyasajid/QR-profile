"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketingLayout } from "@/components/marketing/layout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { useApp } from "@/lib/store";

export default function SignupPage() {
  const { signup } = useApp();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = signup(name, email, password);
    setError(err);
    if (!err) router.push("/app/profiles/new");
  };

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-4xl">Create your profile</h1>
        <p className="mt-2 text-sm text-slate">No backend — this stores a demo session in your browser.</p>
        <form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border border-line bg-white p-6">
          <Field label="Full name">
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Password" hint="At least 6 characters">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          {error ? <p className="text-sm text-[#8B2E2E]">{error}</p> : null}
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate">
          Already have an account? <Link href="/login" className="font-medium text-ink">Log in</Link>
        </p>
      </div>
    </MarketingLayout>
  );
}
