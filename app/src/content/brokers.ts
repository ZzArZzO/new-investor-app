import type { BrokerRow, CryptoExchangeRow } from "./types";

export const BROKERS: BrokerRow[] = [
  { name: "DEGIRO", type: "Self-directed broker", regulation: "EU-regulated", cost: "Low per-trade fees*" },
  { name: "Trade Republic", type: "Broker / app", regulation: "EU-regulated (BaFin)", cost: "Free ETF savings plans*" },
  { name: "Scalable Capital", type: "Broker + robo", regulation: "EU-regulated", cost: "Flat-fee tiers*" },
  { name: "BUX", type: "Broker / app", regulation: "EU-regulated", cost: "Commission-free core*" },
];

export const CRYPTO_EXCHANGES: CryptoExchangeRow[] = [
  { name: "Bitvavo", licence: "Netherlands (AFM)*", cost: "Trading fees*" },
  { name: "Finst", licence: "Netherlands (AFM)*", cost: "Trading fees*" },
  { name: "Kraken", licence: "Luxembourg / Ireland*", cost: "Trading fees*" },
  { name: "Coinbase", licence: "Luxembourg*", cost: "Trading fees*" },
  { name: "Bitpanda", licence: "EU (Austria)*", cost: "Trading/spread*" },
];
