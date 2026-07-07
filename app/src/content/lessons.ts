import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    pillar: "🌱 Foundations",
    crypto: false,
    title: "Why put your money to work",
    core: "Cash slowly loses value to inflation, so investing is how people try to keep and grow what they have.",
    reading:
      "<p>Money left as cash keeps its number but buys less over time, because prices rise. At 2–3% inflation a year, cash can lose roughly half its purchasing power over about 25 years. Doing nothing isn't really “safe”, it's a slow, invisible loss.</p><p>Investing tries to beat that by putting money into assets that can grow. Nothing is guaranteed and values move up and down, but the point isn't to get rich quick. It's to stop your savings shrinking and let time do the work.</p><p>That's <b>compounding</b>: your returns earn their own returns, so growth stacks on growth. The biggest lever isn't picking the perfect investment, it's starting early and giving compounding years to work.</p>",
    example:
      "Two friends invest €150/month at a 7% average return. Anna invests from 25 to 35 then stops (€18k in total). Ben invests from 35 to 65 (€54k in total). Anna often ends up with more (~€197k vs ~€183k), just because her money had an extra decade to compound.",
    check: [
      {
        q: "Why isn't holding all your long-term savings as cash actually “safe”?",
        o: ["Inflation slowly erodes its purchasing power", "Banks are about to fail", "The number in your account drops"],
        a: 0,
        why: "The number stays the same, but it buys less over time.",
      },
      {
        q: "What makes compounding powerful?",
        o: ["Returns earn their own returns over time", "It guarantees you can't lose money", "It only works for the rich"],
        a: 0,
        why: "Growth stacks on growth the longer you stay invested.",
      },
    ],
  },
  {
    id: "l2",
    pillar: "🌱 Foundations",
    crypto: false,
    title: "Risk & time",
    core: "Short-term ups and downs (volatility) are very different from permanent loss, and your time horizon decides which one matters.",
    reading:
      "<p><b>Volatility</b> is the normal bouncing of prices. A broad market might drop 20% in a bad year and recover later. It feels scary, but for a long-term investor who doesn't sell, it's mostly noise.</p><p><b>Permanent loss</b> is money that doesn't come back: a single company going bankrupt, or panic-selling at the bottom and locking in the loss. Volatility only becomes permanent if you're forced or scared into selling low.</p><p>That's why <b>time horizon</b> changes everything. Need the money in a year? A 20% drop is a real problem. Don't need it for 20 years? You can ride it out. “Safe” depends on when you'll spend it.</p>",
    example:
      "In early 2020 markets fell fast. Someone near retirement who panic-sold turned a dip into a real loss. A 30-year-old who kept buying picked up shares cheaply and was ahead within a couple of years. Same event, opposite outcomes.",
    check: [
      {
        q: "Volatility is…",
        o: ["Temporary price movement that can recover", "Money that's gone forever"],
        a: 0,
        why: "It only becomes permanent if you sell into it.",
      },
      {
        q: "Why does a 20% drop matter differently at 25 vs 60?",
        o: ["Time horizon: a young investor can wait for recovery", "Young people simply have more money", "Markets treat ages differently"],
        a: 0,
        why: "With time, a dip can even be a chance to buy cheaply.",
      },
    ],
  },
  {
    id: "l3",
    pillar: "📈 Investing",
    crypto: false,
    title: "The building blocks",
    core: "A few basics, shares, bonds, funds, ETFs and index funds, cover most of what beginners ever need.",
    reading:
      "<p>A <b>share</b> is a tiny slice of a company. A <b>bond</b> is basically a loan to a government or company that pays interest. A <b>fund</b> is a basket that spreads your money across many investments at once. An <b>ETF</b> is a fund you buy and sell like a share.</p><p>An <b>index fund</b> simply mirrors a whole market instead of paying someone to pick winners. “Just buy the index” is common advice because most professional pickers don't beat a broad index over the long run, and index funds cost far less. Instead of hunting for the needle, you buy the haystack.</p>",
    example:
      "A single “world index” ETF can hold shares in over 1,500 companies across dozens of countries in one product. Buy it once and you own a sliver of hundreds of businesses, automatically diversified, no stock-picking needed.",
    check: [
      {
        q: "A single share vs an index fund?",
        o: ["A share is one company; an index fund spreads across a whole market", "They're basically the same thing"],
        a: 0,
        why: "The fund spreads your risk across many companies.",
      },
      {
        q: "Why is “just buy the index” common advice?",
        o: ["Most active pickers don't beat a broad index, and it's cheaper", "Because index funds guarantee a profit"],
        a: 0,
        why: "Lower cost plus broad ownership tends to win over time.",
      },
    ],
  },
  {
    id: "l4",
    pillar: "📈 Investing",
    crypto: false,
    title: "Diversification, fees & mistakes",
    core: "Spreading money lowers risk, small fees compound into big money, and most beginner damage is self-inflicted.",
    reading:
      "<p><b>Diversification</b> is the closest thing to a free lunch: own 500 companies and one going bust barely registers; own one and it can wipe you out. Spreading money means no single failure sinks you, and historically it hasn't cost much growth.</p><p><b>Fees</b> are the quiet killer. 0.1% vs 1.5% a year feels tiny, but over decades it compounds against you into a large chunk of your final pot. <b>Common mistakes</b> are mostly behavioural: timing the market, chasing whatever went up, and panic-selling. The biggest threat to your returns is usually you.</p>",
    example:
      "€10,000 invested for 30 years at the same 7% market return: with a 0.2% fee it grows to about €76k; with a 1.5% fee, about €52k. Same market, and fees quietly took roughly a third.",
    check: [
      {
        q: "Why is diversification a “free lunch”?",
        o: ["It lowers risk without giving up much long-term return", "Because it's literally free to buy"],
        a: 0,
        why: "No single failure can sink a spread-out portfolio.",
      },
      {
        q: "Why do small fees matter so much?",
        o: ["They compound against you year after year", "They're charged every single day"],
        a: 0,
        why: "A tiny percentage becomes huge over decades.",
      },
    ],
  },
  {
    id: "l5",
    pillar: "📈 Investing",
    crypto: false,
    title: "Choosing a tool & your first investment",
    core: "Different tools suit different people, and a first investment is simpler than it looks once you see the steps.",
    reading:
      "<p>A <b>broker</b> lets you buy funds and shares yourself: lowest cost, most control. A <b>robo-advisor</b> builds and manages a portfolio for you automatically for a slightly higher fee. A <b>bank</b> product is familiar but often pricier. In the EU, what matters is that the provider is regulated and your assets sit under investor-protection schemes.</p><p>The steps: open an account, verify your ID (KYC), make a first deposit, place an order. A <b>market order</b> buys now at the current price; a <b>limit order</b> only buys at a price you set. Expect the value to wobble in the first weeks. That's normal.</p>",
    example:
      "Someone opens a regulated broker account, passes the ID check in a day, deposits €100, and buys €100 of a low-cost world index ETF. A week later it's €98, then €103. Nothing's wrong, they've simply started.",
    check: [
      {
        q: "Broker vs robo-advisor, the main trade-off?",
        o: ["Broker is cheaper but you decide; robo manages it for a higher fee", "Robo-advisors are unregulated"],
        a: 0,
        why: "You're trading control for convenience.",
      },
      {
        q: "Market order vs limit order?",
        o: ["Market buys now at current price; limit only buys at a price you set", "They're the same thing"],
        a: 0,
        why: "A limit order waits for your price; a market order doesn't.",
      },
    ],
  },
  {
    id: "l6",
    pillar: "₿ Crypto & blockchain",
    crypto: true,
    title: "What blockchain & crypto actually are",
    core: "A blockchain is a shared record no single party controls; a crypto-asset is built on one, and what it is matters more than any price.",
    reading:
      "<p>Strip the hype and a <b>blockchain</b> is a shared digital ledger copied across many computers, with no single owner, where past entries are very hard to change. A <b>cryptocurrency</b> is an asset that lives on one. Bitcoin was the first, designed to be scarce; Ethereum added programs called smart contracts.</p><p>The honest part: unlike a share, a crypto-asset usually represents no business, no profits and no cash flows. Its value comes from supply, demand and belief. That's why it behaves so differently from stocks and can swing enormously. <b>Stablecoins</b> try to hold a steady value; <b>tokens</b> are everything else, some serious, many worthless.</p>",
    example:
      "Think of a blockchain like a shared spreadsheet thousands of people hold identical copies of, where rows can be added by agreement but old ones can't be edited, and nobody owns the document. Bitcoin is one such sheet tracking who holds how much.",
    check: [
      {
        q: "The defining feature of a blockchain?",
        o: ["A shared record with no single owner, very hard to alter", "A company that controls all crypto"],
        a: 0,
        why: "No single party runs it, that's the whole idea.",
      },
      {
        q: "How is a typical crypto-asset different from a share?",
        o: ["It usually has no business, profits or cash flows behind it", "It always pays a dividend"],
        a: 0,
        why: "Its value comes from supply, demand and belief.",
      },
    ],
  },
  {
    id: "l7",
    pillar: "₿ Crypto & blockchain",
    crypto: true,
    title: "Wallets, exchanges & staying safe",
    core: "How you hold crypto is a real choice, and the biggest beginner danger is theft and scams, not price.",
    reading:
      "<p><b>Custodial</b> means an exchange holds your crypto for you: convenient, but you're trusting that platform, which is why we only mention MiCA-licensed ones. <b>Self-custody</b> means you hold your own keys: full control, full responsibility. Lose your recovery phrase and it's gone forever, no reset, no helpline.</p><p>Crypto attracts fraud because transactions are usually irreversible. The classics: <b>seed-phrase theft</b> (never type your recovery phrase into a website or share it), <b>fake support</b> in DMs, <b>“guaranteed returns”</b> (always a scam), and <b>rug pulls</b>. Slow down, assume unsolicited messages are hostile, and never let urgency rush you.</p>",
    example:
      "A beginner gets a DM from “official support” saying their wallet needs verifying, just enter your recovery phrase here. Doing that hands over the keys and empties the wallet in minutes. The rule is absolute: a recovery phrase is never entered anywhere except to restore your own wallet.",
    check: [
      {
        q: "“Not your keys, not your coins” means…",
        o: ["If someone else holds your keys, you're trusting them", "You should never own crypto"],
        a: 0,
        why: "Only self-custody gives full control, and full responsibility.",
      },
      {
        q: "If “support” asks for your recovery phrase, you should…",
        o: ["Never share it, it's always a scam", "Share it if they seem official"],
        a: 0,
        why: "No legitimate service ever asks for your recovery phrase.",
      },
    ],
  },
  {
    id: "l8",
    pillar: "₿ Crypto & blockchain",
    crypto: true,
    title: "Risk, reward & a sensible slice",
    core: "Crypto is genuinely high-risk with no safety net, so people who hold it keep it to a small, bounded slice they can afford to lose.",
    reading:
      "<p>Being straight: crypto is highly volatile, it's normal to fall 50%+, and individual tokens can go to zero. There's generally no investor-compensation scheme, so if a platform fails or you're defrauded there may be no recourse.</p><p>That doesn't make it “bad”, it means it belongs in a different mental box from your core. Many people use a <b>core and satellite</b> idea: the bulk in a boring diversified core, and only a small bounded slice, an amount they could lose entirely without derailing their life, in higher-risk assets. The test people use: if this went to zero tomorrow, would it change my life? If yes, the slice is too big. Decide the size once, in the cold light of day, don't top it up in a hype frenzy.</p>",
    example:
      "Someone with €10,000 invested sets their crypto slice at 5% (€500) on a MiCA-licensed exchange, with €9,500 in a diversified index fund. Triples? Nice bonus. Goes to zero? It stings but changes nothing important. They chose the size once and don't chase it.",
    check: [
      {
        q: "Why does crypto belong in a different “mental box”?",
        o: ["Far more volatile, can go to zero, usually no compensation scheme", "Because it's guaranteed to grow"],
        a: 0,
        why: "It's exposure without betting your foundation on it.",
      },
      {
        q: "The test for whether a crypto slice is too big?",
        o: ["If losing it entirely would change your life, it's too big", "If it's more than one euro"],
        a: 0,
        why: "Only hold what you can genuinely afford to lose.",
      },
    ],
  },
  {
    id: "l9",
    pillar: "🧭 Capstone",
    crypto: false,
    title: "One portfolio, both worlds",
    core: "Traditional investing and a bounded crypto slice fit in one simple plan, and success is mostly a few good habits repeated.",
    reading:
      "<p>The <b>core and satellite</b> shape ties it together: a diversified low-cost core does the long-term work, and an optional small bounded satellite (individual picks or crypto) adds engagement without risking the plan. Your type leans this one way or another, but the shape is the same.</p><p>Then it's habits: <b>dollar-cost averaging</b> (invest a fixed amount on a schedule, automatically), <b>rebalancing</b> occasionally so a surging satellite doesn't become an oversized risk, and <b>checking rarely</b>, because frequent checking tends to trigger emotional mistakes. Revisit your type every 6–12 months as your life changes.</p>",
    example:
      "A Steady Builder sets up €200/month into a world index fund and €20/month into a MiCA-licensed exchange for a small crypto slice (~9% of contributions). They rebalance once a year, check quarterly, and otherwise live their life. The boring monthly habit does the work.",
    check: [
      {
        q: "The “core + satellite” idea?",
        o: ["A diversified core does the work; a small bounded satellite adds engagement", "Put everything into crypto"],
        a: 0,
        why: "The satellite is deliberately small and bounded.",
      },
      {
        q: "Why check your portfolio less often?",
        o: ["Frequent checking tends to trigger emotional, ill-timed decisions", "The app charges you per view"],
        a: 0,
        why: "Set-and-mostly-forget beats constant fiddling.",
      },
    ],
  },
];
