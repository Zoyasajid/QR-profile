"use client";

import { cn } from "@/lib/utils";

export function AnalyticsCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-mute">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
      {hint ? <p className="mt-1 text-sm text-slate">{hint}</p> : null}
    </div>
  );
}

export function BarChart({
  data,
}: {
  data: { label: string; views: number; scans: number }[];
}) {
  const max = Math.max(...data.map((d) => Math.max(d.views, d.scans)), 1);
  return (
    <div className="rounded-3xl border border-line bg-white p-5">
      <p className="text-sm font-medium text-ink">Views over time</p>
      <div className="mt-6 flex h-44 items-end gap-3">
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-36 w-full items-end justify-center gap-1">
              <div
                className="w-2.5 rounded-t bg-ink"
                style={{ height: `${(d.views / max) * 100}%` }}
              />
              <div
                className="w-2.5 rounded-t bg-accent"
                style={{ height: `${(d.scans / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-mute">{d.label.replace("Mar ", "")}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-xs text-slate">
        <span className={cn("flex items-center gap-1")}>
          <i className="inline-block h-2 w-2 rounded-sm bg-ink" /> Views
        </span>
        <span className="flex items-center gap-1">
          <i className="inline-block h-2 w-2 rounded-sm bg-accent" /> Scans
        </span>
      </div>
    </div>
  );
}
