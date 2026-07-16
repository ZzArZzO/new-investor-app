import * as Linking from "expo-linking";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BROKERS, COMPARE_LAST_CHECKED, CRYPTO_EXCHANGES } from "@/content/brokers";
import type { BrokerRow } from "@/content/types";
import { hapticSelect } from "@/lib/haptics";
import { RADIUS, useTheme } from "@/lib/theme";
import { AppText, Btn, Card } from "@/components/ui";

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

function BrokerCard({ broker }: { broker: BrokerRow }) {
  const { colors } = useTheme();
  return (
    <Card style={{ padding: 16 }}>
      <AppText variant="bold" style={{ fontSize: 16 }}>
        {broker.name}
      </AppText>
      <AppText variant="muted" style={{ fontSize: 13, marginBottom: 6 }}>
        {broker.type}
      </AppText>
      <Row label="Regulation" value={broker.regulation} />
      <Row label="Cost" value={broker.cost} />
      <Row label="Minimum" value={broker.minimum} />
      <Row label="Notable" value={broker.notable} />
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Visit ${broker.name} website`}
        onPress={() => Linking.openURL(broker.link)}
        hitSlop={8}
        style={{ alignSelf: "flex-start", marginTop: 10, paddingVertical: 6 }}
      >
        <AppText variant="bold" style={{ color: colors.primary, fontSize: 13.5 }}>
          Visit website ↗
        </AppText>
      </Pressable>
    </Card>
  );
}

export default function CompareScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [showAllBrokers, setShowAllBrokers] = useState(false);
  const [showAllExchanges, setShowAllExchanges] = useState(false);

  const moreBrokers = BROKERS.filter((b) => !b.mostUsed);
  const topExchanges = CRYPTO_EXCHANGES.filter((x) => x.mostUsed);
  const moreExchanges = CRYPTO_EXCHANGES.filter((x) => !x.mostUsed);

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
        Most used brokers
      </AppText>
      <AppText variant="muted" style={{ marginTop: -8, fontSize: 12, lineHeight: 17 }}>
        The two largest by user base among EU retail investors. Grouped by market share, not our preference — the
        facts below are the same for everyone.
      </AppText>
      {BROKERS.filter((b) => b.mostUsed).map((b) => (
        <BrokerCard key={b.name} broker={b} />
      ))}

      {showAllBrokers ? (
        <>
          <AppText variant="kicker" style={{ marginTop: 6 }}>
            More options · incl. robo-advisors
          </AppText>
          <AppText variant="muted" style={{ marginTop: -8, fontSize: 12, lineHeight: 17 }}>
            Smaller providers and managed (robo) options where the platform invests for you.
          </AppText>
          {moreBrokers.map((b) => (
            <BrokerCard key={b.name} broker={b} />
          ))}
          <Btn
            label="Show fewer brokers"
            variant="outline"
            onPress={() => {
              hapticSelect();
              setShowAllBrokers(false);
            }}
          />
        </>
      ) : (
        <Btn
          label={`Show ${moreBrokers.length} more · incl. robo-advisors`}
          variant="outline"
          onPress={() => {
            hapticSelect();
            setShowAllBrokers(true);
          }}
        />
      )}

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
      <AppText variant="muted" style={{ marginTop: -6, fontSize: 12, lineHeight: 17 }}>
        Most used shown first (largest user bases, Bitvavo is the Dutch market leader) — market share, not our
        preference.
      </AppText>
      {[...topExchanges, ...(showAllExchanges ? moreExchanges : [])].map((x) => (
        <Card key={x.name} style={{ padding: 16 }}>
          <AppText variant="bold" style={{ fontSize: 16, marginBottom: 6 }}>
            {x.name}
          </AppText>
          <Row label="Licence" value={x.licence} />
          <Row label="Cost" value={x.cost} />
          <Row label="Notable" value={x.notable} />
        </Card>
      ))}
      <Btn
        label={showAllExchanges ? "Show fewer exchanges" : `Show ${moreExchanges.length} more exchanges`}
        variant="outline"
        onPress={() => {
          hapticSelect();
          setShowAllExchanges((v) => !v);
        }}
      />

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
