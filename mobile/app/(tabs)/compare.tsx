import * as Linking from "expo-linking";
import { Pressable, ScrollView, View } from "react-native";
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
      <AppText variant="heading">Tools &amp; platforms</AppText>
      <AppText variant="muted" style={{ marginTop: -6 }}>
        The landscape, shown to everyone. Facts only. We don’t tell you what to buy.
      </AppText>

      <View
        style={{
          borderRadius: RADIUS.lg,
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: colors.border,
          backgroundColor: colors.card,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <AppText variant="muted" style={{ fontSize: 12, lineHeight: 17 }}>
          Some links may be affiliate links: we could earn a fee if you open an account through them, at no cost to
          you. This never changes what’s listed or the order.
        </AppText>
      </View>

      <View>
        <AppText variant="bold" style={{ color: colors.mutedForeground, fontSize: 12 }}>
          Data last verified: {COMPARE_LAST_CHECKED}
        </AppText>
        <AppText variant="muted" style={{ marginTop: 4, fontSize: 12, lineHeight: 17 }}>
          Availability, fees and investor protection differ per EU country, always check the provider’s terms for
          where you live.
        </AppText>
      </View>

      <AppText variant="kicker" style={{ marginTop: 6 }}>
        Investing · brokers &amp; robo-advisors
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
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`Visit ${b.name} website`}
            onPress={() => Linking.openURL(b.link)}
            hitSlop={8}
            style={{ alignSelf: "flex-start", marginTop: 10, paddingVertical: 6 }}
          >
            <AppText variant="bold" style={{ color: colors.primary, fontSize: 13.5 }}>
              Visit website ↗
            </AppText>
          </Pressable>
        </Card>
      ))}

      <AppText variant="kicker" style={{ marginTop: 6 }}>
        Crypto · MiCA-licensed platforms only
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
          ⚠️ Crypto is high-risk: prices are very volatile and you can lose everything. There’s generally no
          investor-compensation scheme. Only ever use MiCA-licensed platforms.
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

      <AppText variant="muted" style={{ fontSize: 12, lineHeight: 17 }}>
        Every figure here is illustrative and must be verified against each provider’s current pricing before real
        use. Exchanges shown are examples reported as MiCA-licensed and should be re-checked on the ESMA CASP
        register.
      </AppText>

      <AppText
        variant="muted"
        style={{ marginTop: 8, paddingHorizontal: 6, textAlign: "center", fontSize: 11.5, lineHeight: 17 }}
      >
        Educational information, not personal financial advice. Investing involves risk, including loss of the money
        you invest. Crypto is high-risk and can go to zero.
      </AppText>
    </ScrollView>
  );
}
