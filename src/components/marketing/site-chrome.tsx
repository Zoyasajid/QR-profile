"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Button } from "../ui/button";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/examples", label: "Examples" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span
        className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-semibold ${
          dark ? "bg-paper text-ink" : "bg-ink text-paper"
        }`}
      >
        Q
      </span>
      <span className={`font-display text-xl ${dark ? "text-paper" : "text-ink"}`}>
        {BRAND.name}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-slate md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Create your profile</Button>
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-canvas px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)}>
              <Button className="w-full">Create your profile</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-3 max-w-xs text-sm text-paper/70">{BRAND.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Product</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-paper/70">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/examples">Examples</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Get started</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-paper/70">
            <Link href="/signup">Sign up</Link>
            <Link href="/login">Log in</Link>
            <Link href="/create">Create your profile</Link>
            <Link href="/app">Dashboard</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Demo</p>
          <p className="mt-3 text-sm text-paper/70">
            Front-end prototype only. No payments, no real authentication.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-paper/50">
        © 2026 Qora. Prototype for product review.
      </div>
    </footer>
  );
}
