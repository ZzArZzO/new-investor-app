import type { BrokerRow, CryptoExchangeRow } from "./types";

/** Data-maintenance forcing function — bump this whenever fees/licences below are re-checked (see comparison-table-draft.md). */
export const COMPARE_LAST_CHECKED = "2026-07-08";

export const BROKERS: BrokerRow[] = [
  {
    name: "DEGIRO",
    type: "Self-directed broker",
    regulation: "EU-regulated; German bank deposit protection on cash",
    cost: "Low per-trade fees; some ETFs on a core selection ⚠️",
    minimum: "Low ⚠️",
    notable: "Large market/product range; market leader in NL",
    link: "https://www.degiro.nl",
  },
  {
    name: "Trade Republic",
    type: "Broker / app",
    regulation: "EU-regulated (German BaFin); deposit protection on cash ⚠️",
    cost: "Commission-free ETF savings plans; small per-order fee ⚠️",
    minimum: "€1 savings plans ⚠️",
    notable: "App-first; automated recurring ETF buys",
    link: "https://traderepublic.com",
  },
  {
    name: "Scalable Capital",
    type: "Broker + robo",
    regulation: "EU-regulated; deposit protection on cash ⚠️",
    cost: "Flat-fee subscription tiers; ETF savings plans ⚠️",
    minimum: "Low ⚠️",
    notable: "Offers both self-directed and managed portfolios",
    link: "https://de.scalable.capital",
  },
  {
    name: "BUX",
    type: "Broker / app",
    regulation: "AFM-regulated (NL); assets segregated, cash deposit-guaranteed up to €100k ⚠️",
    cost: "Commission-free core; currency/other fees ⚠️",
    minimum: "Low ⚠️",
    notable: "Dutch neo-broker, beginner-oriented UX",
    link: "https://getbux.com",
  },
  {
    name: "Peaks",
    type: "Robo-advisor",
    regulation: "Verify current regulator/status ⚠️",
    cost: "Managed-portfolio % fee ⚠️",
    minimum: "Low ⚠️",
    notable: "Hands-off, round-up style investing (verify current offering) ⚠️",
    link: "https://www.peaks.com",
  },
];

export const CRYPTO_EXCHANGES: CryptoExchangeRow[] = [
  {
    name: "Bitvavo",
    licence: "Netherlands (AFM) ⚠️",
    cost: "Trading fees ⚠️",
    notable: "NL-based; widely used in the Netherlands",
  },
  {
    name: "Finst",
    licence: "Netherlands (AFM) ⚠️",
    cost: "Trading fees ⚠️",
    notable: "NL-based, low-fee positioning ⚠️",
  },
  {
    name: "Kraken",
    licence: "Luxembourg (CSSF) / Ireland ⚠️",
    cost: "Trading fees ⚠️",
    notable: "Large global exchange",
  },
  {
    name: "Coinbase",
    licence: "Luxembourg ⚠️",
    cost: "Trading fees ⚠️",
    notable: "Large global exchange, beginner-oriented UX",
  },
  {
    name: "Bitpanda",
    licence: "EU (Austria) ⚠️",
    cost: "Trading/spread fees ⚠️",
    notable: "EU-based, offers crypto + other assets",
  },
  {
    name: "Bitstamp",
    licence: "Luxembourg ⚠️",
    cost: "Trading fees ⚠️",
    notable: "Long-established EU exchange",
  },
];
