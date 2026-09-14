"use client";

export function QRCodeVisual({ seed = "qora" }: { seed?: string }) {
  const cells = 21;
  const bits = Array.from({ length: cells * cells }, (_, i) => {
    const n = seed.charCodeAt(i % seed.length) + i * 7;
    const finder =
      (i % cells < 7 && Math.floor(i / cells) < 7) ||
      (i % cells > cells - 8 && Math.floor(i / cells) < 7) ||
      (i % cells < 7 && Math.floor(i / cells) > cells - 8);
    if (finder) {
      const x = i % cells;
      const y = Math.floor(i / cells);
      const ox = x > 10 ? x - (cells - 7) : x;
      const oy = y > 10 ? y - (cells - 7) : y;
      const edge = ox === 0 || oy === 0 || ox === 6 || oy === 6;
      const core = ox >= 2 && ox <= 4 && oy >= 2 && oy <= 4;
      return edge || core;
    }
    return n % 3 !== 0;
  });

  return (
    <svg viewBox={`0 0 ${cells} ${cells}`} className="h-full w-full rounded-2xl bg-white p-2">
      {bits.map((on, i) =>
        on ? (
          <rect
            key={i}
            x={i % cells}
            y={Math.floor(i / cells)}
            width="1"
            height="1"
            fill="#0F1F2E"
          />
        ) : null
      )}
    </svg>
  );
}

export function QRCodeCard({
  title,
  subtitle,
  seed,
}: {
  title: string;
  subtitle: string;
  seed: string;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 text-center">
      <div className="mx-auto h-56 w-56">
        <QRCodeVisual seed={seed} />
      </div>
      <h3 className="mt-4 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-1 text-sm text-slate">{subtitle}</p>
    </div>
  );
}
