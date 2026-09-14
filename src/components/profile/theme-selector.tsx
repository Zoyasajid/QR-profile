"use client";

import { BACKGROUNDS, THEMES } from "@/lib/data";
import type { Appearance, ButtonStyle, LayoutStyle, TextStyle } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ThemeSelector({
  value,
  onChange,
}: {
  value: Appearance;
  onChange: (next: Appearance) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-ink">Profile theme</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  theme: t.id,
                  backgroundColor: t.backgroundColor,
                  accentColor: t.accentColor,
                })
              }
              className={cn(
                "h-16 rounded-2xl border-2",
                value.theme === t.id ? "border-ink" : "border-transparent"
              )}
              style={{ background: t.backgroundColor }}
              aria-label={t.name}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-ink">Background treatment</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {BACKGROUNDS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => onChange({ ...value, backgroundImage: b.value })}
              className={cn(
                "rounded-2xl border px-3 py-3 text-sm",
                value.backgroundImage === b.value
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-white"
              )}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>
      <OptionRow
        label="Button style"
        options={["solid", "outline", "soft", "pill"] as ButtonStyle[]}
        current={value.buttonStyle}
        onPick={(buttonStyle) => onChange({ ...value, buttonStyle })}
      />
      <OptionRow
        label="Text style"
        options={["modern", "classic", "serif"] as TextStyle[]}
        current={value.textStyle}
        onPick={(textStyle) => onChange({ ...value, textStyle })}
      />
      <OptionRow
        label="Layout"
        options={["centered", "card", "minimal"] as LayoutStyle[]}
        current={value.layout}
        onPick={(layout) => onChange({ ...value, layout })}
      />
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-ink">Accent color</span>
        <input
          type="color"
          value={value.accentColor}
          onChange={(e) => onChange({ ...value, accentColor: e.target.value })}
          className="h-11 w-full cursor-pointer rounded-xl border border-line bg-white p-1"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-ink">Background color</span>
        <input
          type="color"
          value={value.backgroundColor}
          onChange={(e) =>
            onChange({ ...value, backgroundColor: e.target.value, theme: "custom" })
          }
          className="h-11 w-full cursor-pointer rounded-xl border border-line bg-white p-1"
        />
      </label>
    </div>
  );
}

function OptionRow<T extends string>({
  label,
  options,
  current,
  onPick,
}: {
  label: string;
  options: T[];
  current: T;
  onPick: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onPick(o)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm capitalize",
              current === o ? "border-ink bg-ink text-paper" : "border-line bg-white"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
