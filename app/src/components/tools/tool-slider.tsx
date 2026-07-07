"use client";

import { Slider } from "@/components/ui/slider";

interface ToolSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}

export function ToolSlider({ label, min, max, step, value, format, onChange }: ToolSliderProps) {
  return (
    <div className="my-3">
      <div className="mb-1.5 flex justify-between text-[13px] font-bold">
        <span>{label}</span>
        <span className="text-primary tabular-figures">{format(value)}</span>
      </div>
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}
