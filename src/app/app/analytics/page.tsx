"use client";

import { useState } from "react";
import { AnalyticsCard, BarChart } from "@/components/analytics/charts";
import { analyticsSeries } from "@/lib/data";
import { useApp } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

const ranges = ["7 days", "30 days", "90 days"];

export default function AnalyticsPage() {
  const { profiles } = useApp();
  const [range, setRange] = useState("7 days");
  const views = profiles.reduce((s, p) => s + p.views, 0);
  const scans = profiles.reduce((s, p) => s + p.scans, 0);
  const clicks = profiles.reduce((s, p) => s + p.clicks, 0);
  const top = [...profiles].sort((a, b) => b.views - a.views);
  const buttons = profiles
    .flatMap((p) => p.buttons.filter((b) => b.enabled).map((b) => ({ label: b.label, n: Math.round(p.clicks / Math.max(p.buttons.length, 1)) })))
    .sort((a, b) => b.n - a.n)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-display text-4xl">Analytics</h1>
        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-full px-3 py-1.5 text-sm ${range === r ? "bg-ink text-paper" : "bg-white border border-line"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-slate">Sample data for {range}. Nothing is tracked in this prototype.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <AnalyticsCard label="Profile views" value={formatNumber(views)} />
        <AnalyticsCard label="QR scans" value={formatNumber(scans)} />
        <AnalyticsCard label="Link clicks" value={formatNumber(clicks)} />
      </div>
      <BarChart data={analyticsSeries} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-medium">Top-performing profiles</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {top.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.name}</span>
                <span className="text-mute">{formatNumber(p.views)} views</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-medium">Most clicked buttons</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {buttons.map((b, i) => (
              <li key={`${b.label}-${i}`} className="flex justify-between">
                <span>{b.label}</span>
                <span className="text-mute">{b.n} taps</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
