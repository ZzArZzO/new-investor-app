import Svg, { Circle } from "react-native-svg";

const SIZE = 120;
const STROKE = 20;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

export interface DonutSlice {
  value: number;
  color: string;
}

/** Donut via stroke-dash segments on circles — no chart library needed. Values are percentages summing ~100. */
export function Donut({ slices, size = SIZE }: { slices: DonutSlice[]; size?: number }) {
  let offset = 0;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {slices.map((s, idx) => {
        const len = (s.value / 100) * CIRC;
        const circle = (
          <Circle
            key={idx}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke={s.color}
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={`${len} ${CIRC - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        );
        offset += len;
        return circle;
      })}
    </Svg>
  );
}
