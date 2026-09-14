"use client";

import Link from "next/link";
import { Eye, Pencil, QrCode, Share2 } from "lucide-react";
import type { Profile } from "@/lib/types";
import { formatNumber, typeLabel } from "@/lib/utils";
import { Avatar } from "./avatar";
import { Button } from "../ui/button";

export function ProfileCard({
  profile,
  onShare,
  onQr,
}: {
  profile: Profile;
  onShare?: () => void;
  onQr?: () => void;
}) {
  return (
    <article className="flex flex-col rounded-3xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <Avatar photo={profile.photo} name={profile.fullName} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium text-ink">{profile.name}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                profile.status === "live"
                  ? "bg-[#e7f3ea] text-[#2F7A4F]"
                  : "bg-paper text-mute"
              }`}
            >
              {profile.status === "live" ? "Live" : "Draft"}
            </span>
          </div>
          <p className="text-sm text-slate">{typeLabel(profile.type)} · {profile.fullName}</p>
          <p className="mt-1 text-xs text-mute">{formatNumber(profile.views)} views</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Link href={`/app/profiles/${profile.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        </Link>
        <Link href={`/app/profiles/${profile.id}/preview`}>
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="h-3.5 w-3.5" /> Preview
          </Button>
        </Link>
        <Link href={`/app/profiles/${profile.id}/qr`} onClick={onQr}>
          <Button variant="soft" size="sm" className="w-full">
            <QrCode className="h-3.5 w-3.5" /> QR Code
          </Button>
        </Link>
        <Button variant="soft" size="sm" className="w-full" onClick={onShare}>
          <Share2 className="h-3.5 w-3.5" /> Share
        </Button>
      </div>
    </article>
  );
}
