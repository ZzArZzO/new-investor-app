"use client";

import { useState, type FormEvent } from "react";
import { HOLDING_TYPES } from "@/content/holdings";
import type { HoldingType } from "@/content/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStateContext } from "@/hooks/app-state-context";

const inputCls =
  "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40";

export function AddHoldingForm() {
  const { addHolding } = useAppStateContext();
  const [label, setLabel] = useState("");
  const [type, setType] = useState<HoldingType>("index");
  const [contributed, setContributed] = useState("");
  const [value, setValue] = useState("");

  const contributedNum = Number(contributed);
  const valid = label.trim().length > 0 && contributedNum > 0;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid) return;
    const v = Number(value);
    addHolding({
      label: label.trim(),
      type,
      contributed: contributedNum,
      value: value.trim() !== "" && v >= 0 ? v : undefined,
    });
    setLabel("");
    setContributed("");
    setValue("");
    setType("index");
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-card p-4 shadow-sm">
      <div className="text-[15px] font-extrabold">Add a holding</div>
      <p className="mt-0.5 mb-3 text-[12.5px] text-muted-foreground">
        Asset type only — never a specific product or coin. You enter your own figures; nothing is connected.
      </p>

      <label className="grid gap-1 text-[13px] font-semibold">
        What is it?
        <input
          className={inputCls}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. World index ETF"
          maxLength={40}
        />
      </label>

      <div className="mt-3 grid gap-1 text-[13px] font-semibold">
        Type
        <div className="flex flex-wrap gap-1.5">
          {HOLDING_TYPES.map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => setType(t.id)}
              className={cn(
                "rounded-lg border px-3 py-2 text-[12.5px] font-semibold transition-colors",
                type === t.id ? "border-primary bg-accent-soft text-primary" : "border-border text-muted-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex gap-2.5">
        <label className="grid flex-1 gap-1 text-[13px] font-semibold">
          Contributed (€)
          <input
            className={inputCls}
            inputMode="decimal"
            value={contributed}
            onChange={(e) => setContributed(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="1000"
          />
        </label>
        <label className="grid flex-1 gap-1 text-[13px] font-semibold">
          Value now (€, optional)
          <input
            className={inputCls}
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="—"
          />
        </label>
      </div>

      <Button type="submit" disabled={!valid} className="mt-4 h-11 w-full rounded-xl">
        Add holding
      </Button>
    </form>
  );
}
