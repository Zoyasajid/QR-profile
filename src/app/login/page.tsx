"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketingLayout } from "@/components/marketing/layout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { DEMO_ACCOUNT } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    setError(err);
    if (!err) router.push("/app");
  };

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-4xl">Welcome back</h1>
        <p className="mt-2 text-sm text-slate">
          Demo login only. Try {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password} or any valid email.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border border-line bg-white p-6">
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Password">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          {error ? <p className="text-sm text-[#8B2E2E]">{error}</p> : null}
          <Button type="submit" className="w-full">
            Log in
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              const err = login(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password);
              if (!err) router.push("/app");
            }}
          >
            Use demo account
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate">
          New here? <Link href="/signup" className="font-medium text-ink">Create an account</Link>
        </p>
      </div>
    </MarketingLayout>
  );
}
