"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { LoadingState } from "@/components/ui/feedback";

export default function CreateEntryPage() {
  const { user, ready } = useApp();
  const router = useRouter();
  useEffect(() => {
    if (!ready) return;
    router.replace(user ? "/app/profiles/new" : "/signup");
  }, [ready, user, router]);
  return <LoadingState label="Opening the profile builder" />;
}
