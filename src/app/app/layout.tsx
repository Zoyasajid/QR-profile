"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/shell";
import { LoadingState } from "@/components/ui/feedback";
import { useApp } from "@/lib/store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) return <LoadingState label="Opening dashboard" />;

  return <DashboardShell>{children}</DashboardShell>;
}
