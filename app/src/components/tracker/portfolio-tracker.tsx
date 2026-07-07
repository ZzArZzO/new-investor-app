"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { HOLDING_TYPES, holdingTypeMeta } from "@/content/holdings";
import { fmtEur, todayStr } from "@/lib/date";
import { useAppStateContext } from "@/hooks/app-state-context";
import { trackEvent } from "@/lib/analytics";
import { AddHoldingForm } from "./add-holding-form";
import { StatTile } from "@/components/ui/stat-tile";
import { Button } from "@/components/ui/button";

export function PortfolioTracker() {
  const { state, hydrated, removeHolding, logContribution } = useAppStateContext();

  const summary = useMemo(() => {
    const { holdings } = state;
    const contributed = holdings.reduce((sum, h) => sum + h.contributed, 0);
    const hasValues = holdings.some((h) => typeof h.value === "number");
    const value = holdings.reduce((sum, h) => sum + (h.value ?? h.contributed), 0);
    const byType = HOLDING_TYPES.map((t) => ({
      ...t,
      total: holdings.filter((h) => h.type === t.id).reduce((sum, h) => sum + h.contributed, 0),
    })).filter((x) => x.total > 0);
    return { contributed, hasValues, value, byType };
  }, [state]);

  if (!hydrated) return null;

  const loggedToday = state.contributions.last === todayStr();
  const empty = state.holdings.length === 0;

  function handleLogContribution() {
    logContribution();
    trackEvent("contribution_logged");
  }

  return (
    <div className="flex flex-col gap-3.5">
      {!empty && (
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex flex-wrap gap-2.5">
            <StatTile label="You've put in" value={fmtEur(summary.contributed)} />
            {summary.hasValues && <StatTile label="Value now" value={fmtEur(summary.value)} />}
            {summary.hasValues && (
              <StatTile
                label="Difference"
                value={fmtEur(summary.value - summary.contributed)}
                warn={summary.value < summary.contributed}
              />
            )}
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="size-28 flex-none">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={summary.byType} dataKey="total" nameKey="label" innerRadius="65%" outerRadius="100%" strokeWidth={0}>
                    {summary.byType.map((d) => (
                      <Cell key={d.id} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="grid flex-1 gap-2 text-[13px]">
              {summary.byType.map((d) => (
                <li key={d.id} className="flex items-center gap-2">
                  <span className="size-3 flex-none rounded-sm" style={{ background: d.color }} />
                  {d.label}
                  <span className="ml-auto font-extrabold text-muted-foreground">
                    {Math.round((d.total / summary.contributed) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-muted-foreground italic">
            You enter your own numbers; the app connects to nothing and fetches no prices. Illustrative, not advice.
          </p>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-br from-accent-soft to-card p-5">
        <div className="text-xs font-bold uppercase tracking-wide text-primary">Monthly habit · dollar-cost averaging</div>
        <p className="mt-2 text-[15px] font-semibold">
          {loggedToday ? "✓ Logged today — the boring habit is what does the work." : "Invested this month? Log it to build the habit."}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Contributions logged: {state.contributions.count} · streak 🔥 {state.streak.count || 0}
        </p>
        <Button disabled={loggedToday} onClick={handleLogContribution} className="mt-3 h-11 w-full rounded-xl">
          Log a contribution (+10 XP)
        </Button>
      </div>

      {empty ? (
        <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No holdings yet. Add what you already hold — or plan to — below. By asset type, no prices needed.
        </div>
      ) : (
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="text-[15px] font-extrabold">Your holdings</div>
          <ul className="mt-2 divide-y divide-border">
            {state.holdings.map((h) => (
              <li key={h.id} className="flex items-center gap-3 py-3">
                <span
                  className="size-3 flex-none rounded-sm"
                  style={{ background: holdingTypeMeta(h.type)?.color ?? "var(--muted-foreground)" }}
                />
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-semibold">{h.label}</div>
                  <div className="text-[12px] text-muted-foreground">
                    {holdingTypeMeta(h.type)?.label} · in {fmtEur(h.contributed)}
                    {typeof h.value === "number" ? ` · now ${fmtEur(h.value)}` : ""}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeHolding(h.id)} className="ml-auto h-8 text-muted-foreground">
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AddHoldingForm />
    </div>
  );
}
