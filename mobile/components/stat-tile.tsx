import { View } from "react-native";

import { RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";

interface StatTileProps {
  label: string;
  value: string;
  warn?: boolean;
}

/** Small muted stat block used in tracker summaries and tool results. */
export function StatTile({ label, value, warn = false }: StatTileProps) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexGrow: 1,
        flexBasis: 0,
        minWidth: 96,
        borderRadius: RADIUS.md,
        backgroundColor: warn ? colors.amberSoft : colors.muted,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <AppText variant="muted" style={{ fontSize: 11.5, lineHeight: 15 }}>
        {label}
      </AppText>
      <AppText variant="bold" style={{ marginTop: 2, fontSize: 15, color: warn ? colors.amber : undefined }}>
        {value}
      </AppText>
    </View>
  );
}
