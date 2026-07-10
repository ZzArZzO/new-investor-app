import type { ReactNode } from "react";
import { useTheme } from "@/lib/theme";
import { AppText, Card } from "@/components/ui";

interface ToolShellProps {
  icon: string;
  title: string;
  subtitle: string;
  note: string;
  children: ReactNode;
}

/** Common frame for interactive tools: header, body, small-print disclaimer. */
export function ToolShell({ icon, title, subtitle, note, children }: ToolShellProps) {
  const { colors } = useTheme();
  return (
    <Card>
      <AppText variant="heading" style={{ fontSize: 19, lineHeight: 25 }}>
        {icon} {title}
      </AppText>
      <AppText variant="muted" style={{ marginTop: 6 }}>
        {subtitle}
      </AppText>
      {children}
      <AppText variant="muted" style={{ marginTop: 14, fontSize: 11.5, lineHeight: 16, color: colors.mutedForeground }}>
        {note}
      </AppText>
    </Card>
  );
}
