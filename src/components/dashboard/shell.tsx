"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Palette,
  Plus,
  QrCode,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { Logo } from "../marketing/site-chrome";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Avatar } from "../profile/avatar";

const nav = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/profiles", label: "My Profiles", icon: UserRound },
  { href: "/app/profiles/new", label: "Create profile", icon: Plus },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/appearance", label: "Appearance", icon: Palette },
  { href: "/app/settings", label: "Settings", icon: Settings },
  { href: "/app/help", label: "Help", icon: HelpCircle },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const Side = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = path === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm",
                active ? "bg-ink text-paper" : "text-slate hover:bg-paper"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-mute">Qora Pro · demo workspace</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-white lg:block">
        {Side}
      </aside>
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-72 bg-white shadow-xl">{Side}</aside>
        </div>
      ) : null}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            {open ? <X /> : <Menu />}
          </button>
          <p className="hidden text-sm text-slate sm:block">One QR · multiple profiles</p>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/app/profiles/new" className="hidden sm:block">
              <Button size="sm">
                <Plus className="h-4 w-4" /> New profile
              </Button>
            </Link>
            <Link href="/app/profiles/work/qr">
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4" /> QR
              </Button>
            </Link>
            <div className="relative">
              <button onClick={() => setMenu((v) => !v)} className="rounded-full">
                <Avatar photo="alex-work" name={user?.name ?? "You"} size="sm" />
              </button>
              {menu ? (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-line bg-white p-2 shadow-lg">
                  <p className="px-2 py-1 text-xs text-mute">{user?.email}</p>
                  <Link href="/app/settings" className="block rounded-xl px-2 py-2 text-sm hover:bg-paper" onClick={() => setMenu(false)}>
                    Account settings
                  </Link>
                  <button
                    className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm hover:bg-paper"
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>
        <main className="px-4 py-6 pb-24 lg:px-8">{children}</main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-line bg-white px-2 py-2 text-[11px] lg:hidden">
        {[
          { href: "/app", label: "Home", icon: LayoutDashboard },
          { href: "/app/profiles", label: "Profiles", icon: UserRound },
          { href: "/app/analytics", label: "Stats", icon: BarChart3 },
          { href: "/app/settings", label: "Settings", icon: Settings },
        ].map((item) => {
          const Icon = item.icon;
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl py-1",
                active ? "text-ink" : "text-mute"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
