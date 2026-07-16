import { useState } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { useTheme } from "@/lib/theme";

interface PathChartProps {
  path: number[];
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Area chart of a value series, drawn as one SVG path (recharts equivalent on
 * web). Fills the measured container width so it scales across screen sizes.
 */
export function PathChart({ path, height = 140, style }: PathChartProps) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);

  const max = Math.max(...path);
  const min = Math.min(...path, 0);
  const range = max - min || 1;
  const pts = path.map((v, idx) => {
    const x = (idx / (path.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 10);
    return { x, y };
  });
  const line = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <View style={[{ width: "100%" }, style]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {width > 0 && path.length > 1 && (
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="pathChartFill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={colors.primary} stopOpacity={0.35} />
              <Stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Path d={area} fill="url(#pathChartFill)" />
          <Path d={line} stroke={colors.primary} strokeWidth={2.5} fill="none" />
        </Svg>
      )}
    </View>
  );
}
