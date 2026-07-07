"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useAppStateContext } from "@/hooks/app-state-context";
import { ToolShell } from "@/components/tools/tool-shell";
import { ToolSlider } from "@/components/tools/tool-slider";
import { cn } from "@/lib/utils";

const COLORS = { core: "var(--primary)", satellite: "var(--amber)", crypto: "var(--destructive)" };

export function AllocationDonut() {
  const { recordToolUse } = useAppStateContext();
  const [core, setCore] = useState(70);
  const [satellite, setSatellite] = useState(20);
  const [crypto, setCrypto] = useState(10);

  const { corePct, satellitePct, cryptoPct } = useMemo(() => {
    const total = core + satellite + crypto || 1;
    return { corePct: (core / total) * 100, satellitePct: (satellite / total) * 100, cryptoPct: (crypto / total) * 100 };
  }, [core, satellite, crypto]);

  const data = [
    { key: "core", label: "Diversified core", value: corePct, color: COLORS.core },
    { key: "satellite", label: "Satellite", value: satellitePct, color: COLORS.satellite },
    { key: "crypto", label: "Crypto slice", value: cryptoPct, color: COLORS.crypto },
  ];

  const message =
    cryptoPct <= 5
      ? "A small, bounded crypto slice — the shape most long-term plans use. If it went to zero, the plan barely notices."
      : cryptoPct <= 20
        ? "A noticeable but still-bounded crypto slice. Worth asking Lesson 8's question honestly before you size it."
        : "That's a large high-risk slice. Lesson 8's test: if it went to zero tomorrow, would it change your life? If yes, it's too big.";

  function handleChange<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      recordToolUse();
    };
  }

  return (
    <ToolShell
      icon="🍩"
      title="Core + satellite"
      subtitle="Shape a core-and-satellite split and read the honest gut-check on your crypto slice."
      note="Illustrative shapes in percentages only — it never uses your real money, income or savings, and is not a recommendation to hold any particular mix."
    >
      <ToolSlider label="Diversified core %" min={0} max={100} step={5} value={core} format={(v) => `${v}%`} onChange={handleChange(setCore)} />
      <ToolSlider label="Satellite (stocks/sector) %" min={0} max={100} step={5} value={satellite} format={(v) => `${v}%`} onChange={handleChange(setSatellite)} />
      <ToolSlider label="Crypto slice %" min={0} max={100} step={5} value={crypto} format={(v) => `${v}%`} onChange={handleChange(setCrypto)} />

      <div className="mt-3 flex items-center gap-4">
        <div className="size-30 flex-none">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="label" innerRadius="65%" outerRadius="100%" strokeWidth={0}>
                {data.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 grid gap-2 text-[13px]">
          {data.map((d) => (
            <li key={d.key} className="flex items-center gap-2">
              <span className="size-3 flex-none rounded-sm" style={{ background: d.color }} />
              {d.label}
              <span className="ml-auto font-extrabold text-muted-foreground">{Math.round(d.value)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn("mt-3 rounded-lg px-3.5 py-3 text-[14px]", cryptoPct > 20 ? "bg-destructive/10 text-destructive font-semibold" : "bg-accent-soft text-accent-foreground")}>
        {message}
      </div>
    </ToolShell>
  );
}
