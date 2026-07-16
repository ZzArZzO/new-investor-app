import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BROKERS, COMPARE_LAST_CHECKED, CRYPTO_EXCHANGES } from "@/content/brokers";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText, Card } from "@/components/ui";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
      <AppText variant="muted" style={{ width: 92, fontSize: 13 }}>
        {label}
      </AppText>
      <AppText style={{ flex: 1, fontSize: 13.5, lineHeight: 19 }}>{value}</AppText>
    </View>
  );
}

export default function CompareScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 32, gap: 14 }}
    >
      <AppText variant="heading">Compare</AppText>
      <AppText variant="muted" style={{ marginTop: -6 }}>
        Regulated brokers and MiCA-licensed crypto exchanges, last checked {COMPARE_LAST_CHECKED}. We earn nothing from
        any of them.
      </AppText>

      <AppText variant="kicker" style={{ marginTop: 6 }}>
        Brokers
      </AppText>
      {BROKERS.map((b) => (
        <Card key={b.name} style={{ padding: 16 }}>
          <AppText variant="bold" style={{ fontSize: 16 }}>
            {b.name}
          </AppText>
          <AppText variant="muted" style={{ fontSize: 13, marginBottom: 6 }}>
            {b.type}
          </AppText>
          <Row label="Regulation" value={b.regulation} />
          <Row label="Cost" value={b.cost} />
          <Row label="Minimum" value={b.minimum} />
          <Row label="Notable" value={b.notable} />
        </Card>
      ))}

      <AppText variant="kicker" style={{ marginTop: 6 }}>
        Crypto exchanges
      </AppText>
      <View
        style={{
          borderRadius: RADIUS.lg,
          backgroundColor: colors.amberSoft,
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      >
        <AppText variant="bold" style={{ color: colors.amber, fontSize: 13, lineHeight: 19 }}>
          ⚠️ Crypto is high-risk. Regulation reduces platform risk, not price risk.
        </AppText>
      </View>
      {CRYPTO_EXCHANGES.map((x) => (
        <Card key={x.name} style={{ padding: 16 }}>
          <AppText variant="bold" style={{ fontSize: 16, marginBottom: 6 }}>
            {x.name}
          </AppText>
          <Row label="Licence" value={x.licence} />
          <Row label="Cost" value={x.cost} />
          <Row label="Notable" value={x.notable} />
        </Card>
      ))}
    </ScrollView>
  );
}
