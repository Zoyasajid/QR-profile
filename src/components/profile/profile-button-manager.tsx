"use client";

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { BUTTON_CATALOG } from "@/lib/data";
import type { ProfileButton } from "@/lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ProfileButtonManager({
  buttons,
  onChange,
}: {
  buttons: ProfileButton[];
  onChange: (next: ProfileButton[]) => void;
}) {
  const move = (index: number, dir: -1 | 1) => {
    const next = [...buttons];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    onChange(next);
  };

  const add = (kind: ProfileButton["kind"]) => {
    const meta = BUTTON_CATALOG.find((b) => b.kind === kind);
    onChange([
      ...buttons,
      {
        id: `${kind}-${Date.now()}`,
        kind,
        label: meta?.label ?? "Custom Link",
        value: "",
        enabled: true,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {buttons.map((b, i) => (
          <div key={b.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="flex-1 text-sm font-medium text-ink">{b.label}</p>
              <label className="flex items-center gap-2 text-xs text-slate">
                <input
                  type="checkbox"
                  checked={b.enabled}
                  onChange={(e) =>
                    onChange(
                      buttons.map((x) =>
                        x.id === b.id ? { ...x, enabled: e.target.checked } : x
                      )
                    )
                  }
                />
                {b.enabled ? "On" : "Off"}
              </label>
              <button type="button" className="rounded-lg p-1 hover:bg-paper" onClick={() => move(i, -1)}>
                <ChevronUp className="h-4 w-4" />
              </button>
              <button type="button" className="rounded-lg p-1 hover:bg-paper" onClick={() => move(i, 1)}>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-lg p-1 text-[#8B2E2E] hover:bg-paper"
                onClick={() => onChange(buttons.filter((x) => x.id !== b.id))}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <Input
              className="mt-3"
              value={b.value}
              placeholder="Link, number, or note"
              onChange={(e) =>
                onChange(buttons.map((x) => (x.id === b.id ? { ...x, value: e.target.value } : x)))
              }
            />
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-mute">Add button</p>
        <div className="flex flex-wrap gap-2">
          {BUTTON_CATALOG.map((b) => (
            <Button key={b.kind} type="button" variant="outline" size="sm" onClick={() => add(b.kind)}>
              <Plus className="h-3.5 w-3.5" /> {b.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
