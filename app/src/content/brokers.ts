import type { BrokerRow, CryptoExchangeRow } from "./types";

/** Data-maintenance forcing function — bump this whenever fees/licences below are re-checked (see comparison-table-draft.md). */
export const COMPARE_LAST_CHECKED = "2026-07-09";

export const BROKERS: BrokerRow[] = [
  {
    name: "DEGIRO",
    type: "Self-directed broker",
    regulation: "flatexDEGIRO Bank, BaFin-regulated (DE); cash guaranteed to €100k, securities held separately",
    cost: "€1 handling fee on Core Selection ETFs (one free trade/month per ETF); ~€3 on other ETFs",
    minimum: "No minimum deposit",
    notable: "Large market/product range; market leader in NL",
    link: "https://www.degiro.nl",
  },
  {
    name: "Trade Republic",
    type: "Broker / app (licensed bank)",
    regulation: "BaFin-regulated (DE), operates as a bank; cash covered to €100k",
    cost: "Flat €1 per order; recurring ETF/stock savings plans free",
    minimum: "€1 savings plans",
    notable: "App-first; automated recurring ETF buys; interest paid on cash",
    link: "https://traderepublic.com",
  },
  {
    name: "Scalable Capital",
    type: "Broker + robo",
    regulation: "BaFin-regulated (DE); cash segregated, €100k deposit guarantee",
    cost: "Free Broker €0.99/trade, or PRIME+ €4.99/month flat for unlimited trades",
    minimum: "€1",
    notable: "Offers both self-directed and managed (robo) portfolios",
    link: "https://de.scalable.capital",
  },
  {
    name: "BUX",
    type: "Broker / app",
    regulation: "AFM + DNB-regulated (NL); assets segregated, Dutch investor compensation to €20k",
    cost: "Commission-free 'Zero' orders and plans; €1.99 EU / €0.99 US market orders",
    minimum: "Low (fractional, ~€1)",
    notable: "Dutch neo-broker, beginner-oriented UX; owned by ABN AMRO",
    link: "https://getbux.com",
  },
  {
    name: "Peaks",
    type: "Robo-advisor",
    regulation: "AFM-registered investment firm (NL); invests for you into ETF portfolios",
    cost: "€1.59/month + 0.50%/yr service fee, plus fund costs",
    minimum: "€1",
    notable: "Hands-off, round-up style investing; discretionary (it invests for you)",
    link: "https://www.peaks.com",
  },
];

export const CRYPTO_EXCHANGES: CryptoExchangeRow[] = [
  {
    name: "Bitvavo",
    licence: "MiCA CASP — AFM, Netherlands (Jun 2025); Bitvavo B.V.",
    cost: "Maker/taker from 0.15% / 0.25% (entry tier)",
    notable: "NL-based; widely used in the Netherlands",
  },
  {
    name: "Finst",
    licence: "MiCA CASP — AFM, Netherlands (Jul 2025); Finst B.V.",
    cost: "Flat 0.15% per trade, no spread markup",
    notable: "NL-based, low-fee positioning; founded by ex-DEGIRO team",
  },
  {
    name: "Kraken",
    licence: "MiCA CASP — Central Bank of Ireland (Jun 2025); Payward Europe Solutions Limited",
    cost: "Kraken Pro maker/taker from 0.40% / 0.80% (entry tier)",
    notable: "Large global exchange",
  },
  {
    name: "Coinbase",
    licence: "MiCA CASP — CSSF, Luxembourg (Jun 2025); Coinbase Luxembourg S.A.",
    cost: "Advanced Trade from 0.40% / 0.60%; simple buys ~1.49% + fee ⚠️",
    notable: "Large global exchange, beginner-oriented UX",
  },
  {
    name: "Bitpanda",
    licence: "MiCA CASP — FMA, Austria (Apr 2025); Bitpanda GmbH",
    cost: "Standard buys ~1.49% spread; Fusion pro tier from ~0.25% ⚠️",
    notable: "EU-based, offers crypto + other assets",
  },
  {
    name: "Bitstamp",
    licence: "MiCA CASP — CSSF, Luxembourg (May 2025); Bitstamp Europe S.A.",
    cost: "Maker/taker from 0.30% / 0.40% (entry tier) ⚠️",
    notable: "Long-established EU exchange",
  },
];
