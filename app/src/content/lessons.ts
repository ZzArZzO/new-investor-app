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
      "<p>Strip the hype and a <b>blockchain</b> is a shared digital ledger copied across many computers, with no single owner, where past entries are very hard to change. A <b>cryptocurrency</b> is an asset that lives on one. Bitcoin was the first, designed to be scarce; Ethereum added programs called smart contracts.</p><p>The honest part: unlike a share, a crypto-asset usually represents no business, no profits and no cash flows. Its value comes from supply, demand and belief. That's why it behaves so differently from stocks and can swing enormously. <b>Stablecoins</b> try to hold a steady value; <b>tokens</b> are everything else, some serious, many worthless. One worth naming: an <b>NFT</b> (non-fungible token) is a unique ledger entry, often linked to an image or item — buying one gets you that entry, not automatically the copyright, the image's continued hosting, or any legal right to the underlying work.</p>",
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
      "A Steady Autopilot sets up €200/month into a world index fund and €20/month into a MiCA-licensed exchange for a small crypto slice (~9% of contributions). They rebalance once a year, check quarterly, and otherwise live their life. The boring monthly habit does the work.",
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
  {
    id: "l10",
    pillar: "💶 Money before investing",
    crypto: false,
    title: "Before you invest: your safety net",
    core: "An emergency fund and clearing expensive debt come before any investing — they're the foundation everything else stands on.",
    reading:
      "<p>Investing works when you can leave the money alone. Life doesn't always let you: a broken laptop, a rent jump, a gap between jobs. An <b>emergency fund</b> — commonly around 3–6 months of essential expenses, in a plain savings account — is what lets your investments ride out a bad market instead of being sold at the worst moment.</p><p><b>Expensive debt</b> changes the order too. A credit card or overdraft charging 12–20% a year is a guaranteed loss running against you. No sensible investment reliably beats that, so paying it off first is the one \"guaranteed return\" that actually exists. Low-rate debt, like many mortgages or subsidised student loans, is a different, gentler category people usually don't rush.</p><p>None of this is wasted time. Building the fund is the same habit as investing — a fixed amount, every month, automatically. You're training the muscle before the stakes go up.</p>",
    example:
      "Lisa has €1,200 on a credit card at 16% and €50/month to spare. Putting that €50 into an ETF earning maybe 7% while the card charges 16% loses her money every month. She clears the card first (a guaranteed 16% \"return\"), then builds a €3,000 buffer, then starts investing — in that order.",
    check: [
      {
        q: "Why does an emergency fund come before investing?",
        o: [
          "So a surprise expense never forces you to sell investments at a bad moment",
          "Because you need at least €10,000 to open a broker account",
          "Savings accounts grow faster than investments",
        ],
        a: 0,
        why: "The fund absorbs life's surprises so your investments can stay untouched.",
      },
      {
        q: "You have credit-card debt at 16%. What's the closest thing to a guaranteed return?",
        o: ["Paying that debt off", "A world index ETF", "A high-yield crypto product"],
        a: 0,
        why: "Clearing 16% debt is a certain 16% saved — no investment reliably matches that.",
      },
    ],
  },
  {
    id: "l11",
    pillar: "💶 Money before investing",
    crypto: false,
    title: "Finding your first €100",
    core: "You don't find money to invest by earning more willpower — you find it by paying yourself first and automating it.",
    reading:
      "<p>The classic approach — spend the month, invest \"what's left\" — fails because there's rarely anything left. The fix is to flip the order: <b>pay yourself first</b>. The day your salary lands, a standing order moves a fixed amount to savings or investments before you can spend it. What remains is simply what you live on.</p><p>The amount matters less than you think. €25–€50 a month is a real start: it builds the habit, and habits scale with income while good intentions don't. A quick look at one month of transactions usually surfaces an unused subscription or two — that's your first €100 hiding in plain sight.</p><p><b>Automation</b> is the whole trick. A manual transfer requires a good day, every month, forever. A standing order requires one good decision, once. Every lesson in this app about behaviour points the same way: remove yourself from the loop wherever you can.</p><p>Once the habit exists, the next question is naturally \"how much of my income, generally?\" A common starting reference: roughly <b>15% of income</b> toward savings and investing combined, once the essentials and any high-interest debt are handled — a rough <b>50/30/20 split</b> (needs / wants / savings & investing) is a well-known way to picture that. Nothing here is a rule to hit immediately — start at whatever's automatable today and raise it when a raise or a cheaper year makes room. (This is separate from the aggressive savings rates used later for FIRE-style timelines — that's a specific, optional goal, not the everyday baseline.)</p>",
    example:
      "Tom earns €2,100/month and swears he can't invest. One month of statements shows €11.99 for a streaming service he forgot, €9.99 for an app trial that renewed, and ~€40 of food delivery fees. He sets a €50 standing order for the 26th — the day after payday. Six months later he hasn't missed it once, because he never had to decide.",
    check: [
      {
        q: "What does \"pay yourself first\" mean?",
        o: [
          "Move a fixed amount to savings/investing on payday, before spending",
          "Buy yourself something nice each payday",
          "Only invest whatever is left at month's end",
        ],
        a: 0,
        why: "Flipping the order is what makes the amount actually exist.",
      },
      {
        q: "Why automate the monthly transfer?",
        o: [
          "One good decision replaces the need for willpower every month",
          "Banks pay extra interest on standing orders",
          "Manual transfers are usually blocked",
        ],
        a: 0,
        why: "Removing yourself from the loop is the most reliable money habit there is.",
      },
    ],
  },
  {
    id: "l12",
    pillar: "🧠 Your brain & money",
    crypto: false,
    title: "Loss aversion & panic-selling",
    core: "Losses feel roughly twice as strong as equal gains, which is exactly why people sell at the bottom — knowing this is half the defence.",
    reading:
      "<p><b>Loss aversion</b> is one of the most replicated findings in behavioural science: losing €100 feels about twice as intense as winning €100 feels good. Your brain treats a falling portfolio as a threat, and threats scream <i>do something</i>. In investing, \"something\" usually means selling — locking in the loss precisely when history says patience pays.</p><p>This is why market drops trigger waves of panic-selling, and why the average investor in a fund famously earns less than the fund itself: money floods in after good years and flees after bad ones. The market's returns were fine; the <i>behaviour</i> ate the difference.</p><p>The defences are structural, not heroic. Decide your plan in calm weather. Automate contributions so buying continues through dips. Check rarely. And when a drop comes, re-read your own reasons before touching anything — a note to your future self, written today, beats your instincts in a crash.</p>",
    example:
      "In a rough year the market falls 25%. Ana feels sick watching her €5,000 become €3,750 and sells to \"stop the bleeding.\" Ben, equally uncomfortable, has a rule: he never sells in a drawdown, and his €150/month keeps buying automatically. Three years later the market has recovered — Ana locked in her loss, Ben bought cheap without needing courage in the moment.",
    check: [
      {
        q: "What does loss aversion do to investors in a crash?",
        o: [
          "Pushes them to sell and lock in losses, because losing feels twice as strong",
          "Makes them too calm about risk",
          "Only affects inexperienced investors",
        ],
        a: 0,
        why: "The urge to 'do something' in a drop is wired in — pros feel it too.",
      },
      {
        q: "What's the best defence against panic-selling?",
        o: [
          "Rules and automation decided in calm weather, checked rarely",
          "Watching the market closely so you can react fast",
          "Only investing in assets that never fall",
        ],
        a: 0,
        why: "Structure beats willpower — nothing 'never falls'.",
      },
    ],
  },
  {
    id: "l13",
    pillar: "🧠 Your brain & money",
    crypto: false,
    title: "FOMO, hype & social media",
    core: "Social feeds show you winners, hide losers, and profit from your urgency — the fear of missing out is a sales tool, not a signal.",
    reading:
      "<p><b>FOMO</b> — fear of missing out — is the feeling that everyone is getting rich without you. Social media manufactures it at scale: the friend who bought early posts screenshots, the thousands who bought late stay quiet. That's <b>survivorship bias</b> — you only see the survivors, so the odds look wildly better than they are.</p><p>Watch for the machinery: \"finfluencers\" paid to promote products, group chats hyping a coin the organisers already own (a <b>pump and dump</b>), countdowns and \"last chance\" framing. Urgency is the tell. Real long-term investing has no deadline — a world index fund bought next month is almost the same as one bought today. Only sellers need you to hurry.</p><p>A practical filter: if you heard about it because it already went up, you're late by definition. Chasing what just surged means buying at peak attention — usually peak price. The boring plan you already have doesn't stop being right because a stranger posted a screenshot.</p>",
    example:
      "A TikTok clip shows someone who turned €500 into €40,000 on a token. What it doesn't show: the 60,000 people who bought after the clip went viral and funded the early buyers' exit. Sam feels the pull, then notices the tells — screenshots, urgency, a Telegram group \"about to explode\" — and closes the app. His €150/month plan doesn't care what's trending.",
    check: [
      {
        q: "Why do social feeds make risky bets look safer than they are?",
        o: [
          "Winners post, losers stay quiet — you only see the survivors",
          "Platforms verify all financial claims",
          "Most viral picks really do keep going up",
        ],
        a: 0,
        why: "Survivorship bias hides the thousands of losses behind each viral win.",
      },
      {
        q: "What's the strongest tell that a 'tip' serves the seller, not you?",
        o: [
          "Manufactured urgency — deadlines, 'last chance', countdowns",
          "It mentions a diversified index fund",
          "It's longer than one paragraph",
        ],
        a: 0,
        why: "Long-term investing has no deadline; only sellers need you to hurry.",
      },
    ],
  },
  {
    id: "l14",
    pillar: "🧠 Your brain & money",
    crypto: false,
    title: "Overconfidence, anchoring & checking too much",
    core: "Feeling skilled after a lucky win, clinging to old prices, and checking daily are three quiet habits that drain returns.",
    reading:
      "<p><b>Overconfidence</b> grows fastest after a win. A lucky first pick feels like skill, so the next bet gets bigger — right as the luck runs out. The honest question is: could I explain <i>why</i> this went up, and would I have known it in advance? Markets humble the confident on a schedule.</p><p><b>Anchoring</b> is the pull of a meaningless number. \"It was at €80, now it's €50 — it's cheap!\" But the €80 price isn't evidence of anything; things that fall often fall further, and \"back to what I paid\" is not a strategy. The only question that matters is whether it's worth owning at today's price.</p><p>And <b>checking too much</b>: markets are roughly a coin-flip day to day, so a daily checker sees losses constantly — and each one stings double (Lesson 12). Zoom out to yearly and the picture flips overwhelmingly positive for diversified investors. Same investment, different checking habit, completely different emotional ride.</p>",
    example:
      "Kim's first stock doubled, so she tripled her next bet on a \"sure thing\" — and lost 40%. Meanwhile she keeps holding a fund she overpaid for \"until it gets back to my price,\" and checks the app every morning, feeling awful on red days. Three habits, one fix: she moves to a monthly automatic plan and deletes the app from her home screen.",
    check: [
      {
        q: "Why is a big early win dangerous for a beginner?",
        o: [
          "Luck gets mistaken for skill, so the next bets get bigger and riskier",
          "It means taxes will be higher",
          "Early wins are usually reversed by the platform",
        ],
        a: 0,
        why: "Overconfidence peaks right when luck tends to run out.",
      },
      {
        q: "\"It was €80, now €50, so it's a bargain\" is an example of…",
        o: [
          "Anchoring — treating an old price as if it means something",
          "Sensible value investing",
          "Diversification",
        ],
        a: 0,
        why: "The old price isn't evidence; what matters is whether it's worth owning today.",
      },
    ],
  },
  {
    id: "l15",
    pillar: "🔥 Financial independence",
    crypto: false,
    title: "Savings rate is the engine",
    core: "How much of your income you keep matters far more than investment returns — it's the one lever fully in your hands.",
    reading:
      "<p><b>Financial independence</b> (FI) is the point where your investments could cover your living costs, making work a choice. The surprising math: how fast you get there barely depends on your salary, and only partly on returns. It depends overwhelmingly on your <b>savings rate</b> — the share of income you keep.</p><p>The reason is a double effect: saving more grows the pot faster <i>and</i> proves you live on less, which shrinks the pot you need. Someone saving 10% of income needs roughly a working lifetime; at 25% the horizon drops to around three decades; at 50%, illustratively, under two. These are rough, assumption-heavy numbers — but the shape of the curve is what matters.</p><p>This reframes the whole game. You can't control markets, and chasing higher returns means higher risk. But nudging a savings rate from 10% to 15% is concrete, boring, and completely yours. FI thinking is useful even if you never retire early: every percentage point is options, breathing room, and a smaller dependence on any one employer.</p>",
    example:
      "Two friends earn the same €2,800/month. Eva saves 10% (€280), Nora saves 30% (€840) by keeping her old flat and cooking. At an assumed 7% return, Eva's pot could cover her spending in roughly 45 years, Nora's in roughly 25 — not because Nora picked better funds, but because she both saves more and needs less. Illustrative math, real principle.",
    check: [
      {
        q: "Why does savings rate beat investment returns as the main FI lever?",
        o: [
          "It grows the pot faster AND shrinks the pot you need — and you control it",
          "Higher savings rates earn higher interest by law",
          "Returns don't matter at all",
        ],
        a: 0,
        why: "The double effect is the engine; returns help but aren't in your hands.",
      },
      {
        q: "What does financial independence actually mean?",
        o: [
          "Investments could cover your living costs, so work becomes a choice",
          "Never working again is mandatory",
          "Owning at least one rental property",
        ],
        a: 0,
        why: "FI is about options, not a forced early retirement.",
      },
    ],
  },
  {
    id: "l16",
    pillar: "🔥 Financial independence",
    crypto: false,
    tier: "plus",
    title: "The 4% rule, honestly",
    core: "The 4% rule is a rough planning compass built on old US data — useful for a ballpark, dangerous as a promise.",
    reading:
      "<p>The <b>4% rule</b> comes from a 1990s study of US market history: a retiree withdrawing 4% of their starting pot yearly, adjusted for inflation, would have survived most historical 30-year periods. Flip it around and you get the famous shortcut: your \"FI number\" is roughly <b>25× your yearly spending</b>. Spend €24,000 a year, and the ballpark pot is €600,000.</p><p>Now the honest part. It's based on the past of one unusually lucky market (the US), assumes exactly 30 years, ignores most fees and taxes, and never adapts — a real person would simply spend less in a terrible year. Researchers argue for anything between 3% and 5% depending on assumptions, which swings that €600,000 target by hundreds of thousands. It is a compass, not a contract.</p><p>How to use it well: as a first sketch of scale (\"my spending × 25 — interesting\"), as motivation to see how spending drives the target, and as a reminder that <b>sequence of returns</b> (Lesson 2) matters — a crash early in withdrawal years hurts far more than one later. How to use it badly: quitting your job the day a spreadsheet says 25× is reached.</p>",
    example:
      "Jasper spends about €2,000/month, so €24,000/year × 25 ≈ €600,000 — his first ballpark FI number. Then he stress-tests it: at a more cautious 3.5% withdrawal it's ~€686,000, and cutting his spending €200/month drops the 4% target by €60,000. The exact number is fuzzy; what he learned is that his spending, not his salary, sets the goalposts.",
    check: [
      {
        q: "Your rough \"FI number\" under the 4% rule is…",
        o: [
          "About 25× your yearly spending",
          "10× your yearly salary",
          "Whatever your broker suggests",
        ],
        a: 0,
        why: "4% withdrawals ≈ 1/25 of the pot — spending, not salary, drives it.",
      },
      {
        q: "Why is the 4% rule a compass, not a promise?",
        o: [
          "It's built on past US data, fixed assumptions, and ignores fees, taxes and flexibility",
          "It was mathematically disproven",
          "It only works for amounts over €1 million",
        ],
        a: 0,
        why: "Useful for scale, not a guarantee — real plans adapt.",
      },
    ],
  },
  {
    id: "l17",
    pillar: "🔥 Financial independence",
    crypto: false,
    tier: "plus",
    title: "Coast, Barista & realistic timelines",
    core: "FI isn't all-or-nothing — intermediate versions like Coast FI make the idea useful decades before any finish line.",
    reading:
      "<p>The all-or-nothing version of FIRE — grind, save half your income, retire at 40 — fits very few lives. The useful versions are intermediate. <b>Coast FI</b>: you've invested enough, early enough, that compounding alone should grow it to a retirement-sized pot by a normal retirement age — you still work to pay the bills, but you could stop <i>saving</i>. <b>Barista FI</b>: your investments cover part of your costs, so a lighter or more meaningful job covers the rest.</p><p>Coast FI numbers are startlingly small at a young age, because time does the heavy lifting: illustratively, at 7% average returns money doubles roughly every decade, so €50,000 invested at 25 could be ~€400,000 at 55 with nothing added. The earlier you start, the lower the bar — this is Lesson 1's compounding wearing a different coat.</p><p>The realistic framing: treat these as <b>milestones, not identities</b>. Emergency fund → first €10k → Coast FI → Barista FI → full FI. Each step buys concrete freedom (a career change, a sabbatical, part-time parenting years) even if you never reach — or want — the last one. Assumptions stay assumptions: real returns vary, and none of this is a schedule you can promise yourself.</p>",
    example:
      "Mila, 27, has €40,000 invested. At an assumed 7%, doubling roughly each decade, that's ~€320,000 at 57 without another euro added. She hasn't retired — she's reached Coast FI for a modest retirement: everything she saves from here brings the date closer or the lifestyle up, and a lower-paying job she loves just became affordable. Illustrative numbers, real freedom.",
    check: [
      {
        q: "Coast FI means…",
        o: [
          "Compounding alone should reach a retirement pot by normal retirement age — saving became optional",
          "You live near the coast on dividends",
          "You've fully retired early",
        ],
        a: 0,
        why: "Work still pays the bills; the future is already funded.",
      },
      {
        q: "Why are Coast FI targets so much smaller at 25 than at 45?",
        o: [
          "More decades of compounding do the heavy lifting",
          "Young people get better interest rates",
          "They aren't — the target is the same at every age",
        ],
        a: 0,
        why: "At ~7%, money doubles roughly every decade — each extra decade halves the bar.",
      },
    ],
  },
  {
    id: "l18",
    pillar: "🏠 Real estate",
    crypto: false,
    title: "REITs vs buying property",
    core: "You can own real estate by buying a building — or by buying shares in hundreds of them; the trade-offs are opposite.",
    reading:
      "<p>Owning property directly means one asset, one location, a large mortgage, and real work: tenants, maintenance, taxes, vacancy risk. It can build serious wealth — leverage amplifies gains — but it's concentrated (the opposite of Lesson 4's diversification), illiquid (selling takes months), and the entry ticket in most European cities is steep.</p><p>A <b>REIT</b> (real estate investment trust) is a company that owns income-producing property — offices, warehouses, homes, data centres — whose shares trade like any stock. Many pay out most of their rental income as dividends. A single REIT <b>ETF</b> spreads you across hundreds of buildings in dozens of cities for the price of one share, sellable in seconds.</p><p>The honest trade-offs: REITs are liquid, diversified, and effortless, but they swing with the stock market (sometimes harder — they fell more than the broad market in 2008) and offer no leverage benefit or home to live in. Direct property is tangible and leveraged but concentrated, illiquid and labour-intensive. Many index investors already own some real estate without noticing — world index funds typically include REITs.</p>",
    example:
      "Sofie has €15,000. As a deposit it isn't close to buying a flat in most European capitals. In a global REIT ETF it buys her a slice of ~300 properties across Europe, the US and Asia, with rental income arriving as dividends — no tenants calling about a boiler at midnight, but also no leveraged windfall if one street gentrifies.",
    check: [
      {
        q: "The core difference between a REIT ETF and buying a flat?",
        o: [
          "Hundreds of buildings, liquid, hands-off vs one building, illiquid, hands-on with leverage",
          "REITs aren't really real estate",
          "Buying a flat is always more profitable",
        ],
        a: 0,
        why: "Diversification and liquidity vs concentration and leverage — opposite trade-offs.",
      },
      {
        q: "Do REITs escape stock-market swings?",
        o: [
          "No — they trade like stocks and can fall hard in a crash",
          "Yes — property values never drop",
          "Yes — regulators freeze their prices in crashes",
        ],
        a: 0,
        why: "In 2008 REITs fell harder than the broad market. Liquid, but volatile.",
      },
    ],
  },
  {
    id: "l19",
    pillar: "🏠 Real estate",
    crypto: false,
    tier: "plus",
    title: "Property in a portfolio, honestly",
    core: "Real estate is a sector, not a magic asset class — a modest, deliberate slice beats both property worship and total avoidance.",
    reading:
      "<p>Housing culture — across much of Europe, where prices climbed for a generation — breeds a belief that property only goes up. History disagrees: after 2008, prices fell roughly 20% in the Netherlands and over 30% in Spain and Ireland, taking the better part of a decade to recover; Japan's are famously below their 1990 peak in many areas. Real estate cycles, like everything else. \"You can't lose with bricks\" is anchoring (Lesson 14) wearing a hard hat.</p><p>What's a sensible <i>investment</i> slice? A world index fund already holds real estate companies at market weight — typically a few percent. Wanting more is a deliberate <b>tilt</b>: some investors add a REIT ETF as 5–10% of a portfolio for the income and inflation-linked rents, sized like any satellite (Lesson 9) — small enough that a property crash doesn't sink the plan.</p><p>And the home you live in? It's shelter first, investment second: it pays no rent to you, costs maintenance and taxes, and you can't sell the kitchen when markets dip. Buying a home can be a fine <i>life</i> decision without being treated as the portfolio. The honest rule is the same everywhere: no asset class is sacred, and anything can be overpaid for.</p>",
    example:
      "Daan, renting in an expensive European city, feels \"behind\" friends who bought in 2015. Instead of stretching into a maximum mortgage at any price, he keeps his diversified core and adds a 7% REIT ETF slice — property exposure without the concentration. If he later buys a home, it'll be because he wants to live in it for a decade, not because bricks are \"guaranteed.\"",
    check: [
      {
        q: "What does history say about \"property only goes up\"?",
        o: [
          "It cycles like everything — several European markets fell 20%+ after 2008; parts of Japan never regained 1990 peaks",
          "It's true for houses, just not apartments",
          "Correct — property has never fallen",
        ],
        a: 0,
        why: "Long booms breed the belief; the record contradicts it.",
      },
      {
        q: "How do investors who want extra real estate usually size it?",
        o: [
          "As a deliberate satellite tilt — e.g. 5–10% in a REIT ETF — on top of the core",
          "Replace the whole index core with property",
          "Exactly 50% in all cases",
        ],
        a: 0,
        why: "Sized like any satellite: meaningful, but never able to sink the plan.",
      },
    ],
  },
  {
    id: "l20",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    title: "Self-custody done right",
    core: "If you choose self-custody, the setup ritual is everything — the recovery phrase on paper, verified, and never digital.",
    reading:
      "<p>Lesson 7 covered the choice: an exchange holds your crypto (custodial) or you do (<b>self-custody</b>). If you choose self-custody, the security model is brutally simple — whoever has the <b>recovery phrase</b> owns the funds. There is no reset button, no support line, no fraud department. That's the deal you're accepting.</p><p>The ritual, done right: generate the wallet offline or on a <b>hardware wallet</b>; write the 12–24 words on paper (twice, stored in two places — never a photo, never a cloud note, never a password manager you also use for email); verify you can actually restore from those words <i>before</i> sending anything meaningful; then send a tiny test amount first. Boring, and boring is the point.</p><p>The threats to design against: phishing sites that ask you to \"validate\" your phrase (always theft), malware reading your clipboard and screenshots, and blind-signing <b>approvals</b> on sketchy sites that quietly grant spending rights over your tokens. A hardware wallet helps because the keys never touch your internet-connected computer — but it protects nothing if you type the phrase into a website anyway. The human is the attack surface.</p>",
    example:
      "Rick buys a hardware wallet, writes the 24 words on two paper cards — one at home, one at his parents' — then does a restore drill on the empty wallet to prove the backup works. Only then does he move €200 as a test, checks it arrived, and sends the rest. Two weeks later a \"wallet update\" email asks him to re-enter his phrase; he deletes it without a second thought. The drill made the scam obvious.",
    check: [
      {
        q: "Where should a recovery phrase live?",
        o: [
          "On paper, in two safe places — never typed into websites, photos or cloud notes",
          "In a screenshot, for quick access",
          "In an email draft to yourself",
        ],
        a: 0,
        why: "Anything digital can be read by malware or phished — paper can't be hacked remotely.",
      },
      {
        q: "Why test a restore before sending real money?",
        o: [
          "A backup you've never tested might not work — and there's no support line to call",
          "It earns a security bonus from the network",
          "Restoring resets the fees",
        ],
        a: 0,
        why: "Self-custody has no reset button; the drill is the only proof your backup is real.",
      },
    ],
  },
  {
    id: "l21",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    tier: "plus",
    title: "Staking & \"earn\" products, honestly",
    core: "\"Earn % on your crypto\" spans everything from protocol staking to uncollateralised lending — the % is what you're paid for a risk, so always ask which one.",
    reading:
      "<p><b>Staking</b>, at its cleanest, means locking coins to help run a proof-of-stake network in exchange for protocol rewards — a few percent a year on networks like Ethereum. The risks there: your coins may be locked for a period (while their price swings freely), and technical penalties (<b>slashing</b>) can trim a validator's stake. The reward is paid <i>in the same volatile asset</i> — 4% yield means little if the coin halves.</p><p>Then there's everything else sold as \"earn\": exchange staking programs (you're trusting the platform on top of the protocol), and lending products where the platform takes your crypto and lends it out. That last one is how several famous firms died in 2022 — Celsius offered up to ~17% \"yield\" until it collapsed, taking customers' funds into bankruptcy. The unbeatable rule: <b>yield is payment for risk</b>. If you can't name the risk, you are the risk.</p><p>A MiCA-licensed exchange (the only kind we ever reference) is regulated for how it operates — that does <i>not</i> make any yield product inside it risk-free, and crypto still has no deposit-guarantee scheme. The honest checklist before any \"earn\" button: Where does the yield come from? Can I unstake instantly or am I locked? Who holds the keys? What happens if the platform fails? If any answer is fuzzy, the answer is no.</p>",
    example:
      "Two offers on Noor's screen: ~3% for staking ETH via her regulated exchange, and a slick app promising \"12% flexible yield.\" She can explain the 3% (protocol rewards, minus the exchange's cut, with lock-up risk). Nobody can explain the 12% — the app lends her coins to unnamed parties. She remembers Celsius paid 17% right up until it paid nothing, and skips it.",
    check: [
      {
        q: "What is a crypto yield fundamentally?",
        o: [
          "Payment for a risk — if you can't name the risk, don't take the yield",
          "Free interest, like a savings account",
          "A government-guaranteed reward",
        ],
        a: 0,
        why: "Every % has a source: lock-ups, slashing, platform failure, or lending risk.",
      },
      {
        q: "Does a licensed exchange make its \"earn\" products safe?",
        o: [
          "No — regulation covers operations, not the risk inside yield products, and there's no deposit guarantee",
          "Yes — licensing guarantees all yields",
          "Yes — the EU refunds any crypto losses",
        ],
        a: 0,
        why: "MiCA licensing matters for how a platform operates; the product risk is still yours.",
      },
    ],
  },
  {
    id: "l22",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    tier: "plus",
    title: "DeFi & smart-contract risk",
    core: "DeFi replaces institutions with code — which removes the banker and adds the bug, and there's no undo button either way.",
    reading:
      "<p><b>DeFi</b> (decentralised finance) is financial plumbing — trading, lending, borrowing — run by <b>smart contracts</b>: programs on a blockchain that execute automatically. No bank, no opening hours, no permission needed. That's genuinely novel. It also means no fraud department, no reversals, and no compensation scheme when something breaks. The code is the counterparty.</p><p>The risk list is concrete. <b>Bugs and hacks</b>: billions have been drained from DeFi protocols through exploited code — audits reduce but never remove this. <b>Rug pulls</b>: the team itself drains the pool. <b>Stablecoin failure</b>: Terra/Luna wiped out roughly $40 billion in 2022 when its \"stable\" coin collapsed to nearly zero in a week. <b>Approval drains</b>: signing a malicious permission that lets a contract spend your tokens later. Yield in DeFi is usually highest exactly where these risks are thickest — that's not a coincidence, it's Lesson 21's rule again.</p><p>Where does that leave a beginner? Understanding DeFi is genuinely worthwhile — it's the most interesting part of the technology. <i>Using</i> it with meaningful money is expert territory: if you ever experiment, it's with self-custody mastered (Lesson 20), on-chain permissions understood, and an amount whose total loss you'd shrug at. \"I don't fully understand this yet\" is a complete and honourable reason to stay out.</p>",
    example:
      "A protocol offers 30% yield on a stablecoin pair. Jonas, curious, digs in: the yield is paid in the protocol's own token, the \"audit\" is a PDF from an unknown firm, and the anonymous team controls the contract's admin keys. Any one of those is a red flag; together they're a siren. He files it under \"interesting to watch, not to fund\" — and when the token collapses two months later, watching cost him nothing.",
    check: [
      {
        q: "What replaces the bank in DeFi — and what does that remove?",
        o: [
          "Smart-contract code — removing support, reversals and any compensation scheme",
          "A decentralised customer-service team",
          "The EU deposit-guarantee fund",
        ],
        a: 0,
        why: "The code is the counterparty: autonomous, and unforgiving when it breaks.",
      },
      {
        q: "Why does the highest DeFi yield sit next to the highest risk?",
        o: [
          "Yield is payment for risk — thick yield means thick risk, hidden or not",
          "Regulators set DeFi yields",
          "It's random which protocols pay more",
        ],
        a: 0,
        why: "Terra paid ~20% on its stablecoin right up until $40bn evaporated.",
      },
    ],
  },
  {
    id: "l28",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    tier: "plus",
    title: "Hot, cold & moving crypto without losing it",
    core: "Most beginner crypto losses aren't market crashes — they're transfers done wrong. Hot vs cold storage and a careful sending ritual prevent nearly all of them.",
    reading:
      "<p>A <b>hot wallet</b> keeps your keys on something connected to the internet — an exchange account, a phone app, a browser extension. Convenient, always an attack surface. A <b>cold wallet</b> keeps keys offline — a hardware wallet (Lesson 20) or even paper. The standard shape: small \"spending\" amounts hot, anything meaningful cold. It's the same logic as cash in your pocket vs savings at the bank.</p><p>Moving crypto is where beginners actually lose money, because transfers are <b>irreversible</b> and unforgiving. The traps: the same token can live on <b>several networks</b> (chains) — send on the wrong network and the funds can be gone or stranded; sender and receiver must match networks exactly. <b>Clipboard malware</b> silently swaps a copied address for the thief's. And every transfer costs a <b>network fee</b> (\"gas\"), which swings with congestion — sometimes cents, sometimes painful.</p><p>The ritual, every time: copy the address, then verify the <b>first and last characters</b> on both ends; double-check the network matches; send a <b>small test amount</b> first and confirm it arrives; only then send the rest. Thirty extra seconds, and it defeats wrong-network loss, clipboard swaps and fat-fingered addresses in one move. Nobody who does this ritual feels silly. Plenty who skipped it do.</p>",
    example:
      "Jonas moves €600 of crypto from his exchange to his hardware wallet. He copies the address, checks the first and last four characters on both screens, confirms both sides say the same network, and sends €20 first. It lands. He sends the rest. His colleague skipped the test send, picked the wrong network from a dropdown, and spent three weeks pleading with support to recover funds — a service the exchange calls \"best effort\" and sometimes simply can't do.",
    check: [
      {
        q: "Hot wallet vs cold wallet?",
        o: [
          "Keys online (convenient, exposed) vs keys offline (safer for meaningful amounts)",
          "A wallet for popular coins vs unpopular ones",
          "Mobile vs desktop apps",
        ],
        a: 0,
        why: "Spending money hot, savings cold — same logic as pocket cash vs the bank.",
      },
      {
        q: "The sending ritual is: verify address characters, match the network, and…",
        o: [
          "Send a small test amount first, confirm it arrives, then send the rest",
          "Send everything at once to save on fees",
          "Ask in a Telegram group if the address looks right",
        ],
        a: 0,
        why: "Transfers are irreversible — the €20 test is the cheapest insurance in crypto.",
      },
    ],
  },
  {
    id: "l29",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    tier: "plus",
    title: "How the machine runs: proof of work vs proof of stake",
    core: "Two ways a blockchain agrees on the truth — burning energy or locking money — explain mining, staking, the energy debate and Bitcoin's famous scarcity.",
    reading:
      "<p>A blockchain has no boss, so it needs a way for strangers to agree which transactions are real. <b>Proof of work</b> (Bitcoin's way): \"miners\" race to solve pointless-but-expensive puzzles; winning costs real electricity and hardware, and that cost is the security — rewriting history would mean out-spending the whole honest network. It works, and it's why Bitcoin's energy use draws criticism.</p><p><b>Proof of stake</b> (Ethereum's way since 2022, when its switch cut energy use by ~99.9%): instead of burning energy, <b>validators</b> lock up their own coins as collateral. Cheat, and the network destroys part of your stake (<b>slashing</b> — the risk behind Lesson 21's staking yields). Security comes from money at risk rather than electricity burned.</p><p>One more piece of machinery: <b>supply rules</b>. Bitcoin's code caps it at <b>21 million coins</b>, with the flow of new ones halving roughly every four years (a <b>halving</b>). That designed scarcity is central to the \"digital gold\" story — and here honesty matters: scarcity makes something <i>limited</i>, not <i>valuable</i>. Value still needs demand, which rests on belief (Lesson 6). Plenty of scarce things are worthless. Understanding the machine protects you from both the hype and the dismissal.</p>",
    example:
      "At a family dinner, Rosa gets both classics: \"crypto boils the oceans\" and \"Bitcoin can't lose because only 21 million exist.\" She can now answer both honestly: proof-of-work chains do burn serious energy (that's their security model), while proof-of-stake chains cut it by ~99.9% — and the 21-million cap makes Bitcoin scarce, not guaranteed valuable, since scarcity without demand is just a limited edition nobody wants.",
    check: [
      {
        q: "Where does proof-of-stake security come from?",
        o: [
          "Validators' own locked coins, which get slashed if they cheat",
          "Electricity burned by miners",
          "A central company checking transactions",
        ],
        a: 0,
        why: "Money at risk replaces energy burned — that's the whole swap.",
      },
      {
        q: "Bitcoin's 21-million cap means…",
        o: [
          "It's designed to be scarce — but scarcity alone doesn't create value; demand does",
          "Its price can only go up",
          "Nobody can ever sell more than 21 million times",
        ],
        a: 0,
        why: "Scarce and valuable are different properties. Belief and demand still do the work.",
      },
    ],
  },
  {
    id: "l30",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    tier: "plus",
    title: "Stablecoins, MiCA & the digital euro",
    core: "\"Stable\" comes in three very different flavours, EU law now regulates the serious ones, and the ECB is building a public alternative.",
    reading:
      "<p>Lesson 6 introduced stablecoins as crypto that tries to hold steady value. The flavours matter. <b>Fiat-backed</b>: the issuer holds real reserves (cash, short-term bonds) and promises 1-coin-equals-€1 redemption — the mainstream kind. <b>Crypto-collateralised</b>: backed by a buffer of other, volatile crypto — sturdier than it sounds, weirder than it looks. <b>Algorithmic</b>: \"stabilised\" by code and confidence alone — the design behind Terra, which went from \"stable\" to nearly zero in a week and vaporised ~$40 billion (Lesson 22). Flavour one is a claim on reserves; flavour three was a belief system.</p><p>This is where <b>MiCA</b> gets concrete. Serious euro-referencing stablecoins in the EU must be issued by authorised firms holding real, verifiable reserves with redemption rights — and a <b>CASP licence</b> (the thing we always check) means the <i>platform</i> meets standards on custody, complaint handling and honest marketing. Know what it doesn't mean: nobody guarantees prices, yield products remain risky (Lesson 21), and there's still no deposit-guarantee scheme. Licensing regulates conduct, not outcomes.</p><p>And the state's answer: the <b>digital euro</b>, a potential <b>CBDC</b> (central bank digital currency) the ECB has been preparing for years. The difference is who stands behind it — a stablecoin is a claim on a private company's reserves; a digital euro would be central-bank money, like cash, with no issuer that can go bust. It isn't live yet and may take years, but it reframes the question nicely: much of what stablecoins promise, a CBDC would simply <i>be</i>.</p>",
    example:
      "Mara sees a \"stable\" coin offering 9% yield in a slick app. Checklist from this lesson: What backs it — audited reserves or an algorithm? Is the issuer MiCA-authorised? Where does 9% come from when safe euro rates are far lower (Lesson 21: yield is payment for risk)? The answers — \"algorithmic\", \"not authorised\", \"lending your coins out\" — turn a tempting banner into an obvious pass. Terra holders in 2022 had no such checklist.",
    check: [
      {
        q: "The crucial difference between a fiat-backed and an algorithmic stablecoin?",
        o: [
          "A claim on real reserves vs stability held up by code and confidence alone",
          "The logo and the marketing budget",
          "Fiat-backed coins are always bigger",
        ],
        a: 0,
        why: "Terra was the confidence kind — 'stable' right up until belief ran out.",
      },
      {
        q: "What does a MiCA/CASP licence actually guarantee?",
        o: [
          "Conduct standards — custody, complaints, honest marketing — never prices or yields",
          "That prices can't fall",
          "That the EU refunds crypto losses",
        ],
        a: 0,
        why: "Licensing regulates how firms behave, not how markets move.",
      },
    ],
  },
  {
    id: "l23",
    pillar: "🛡️ Protections & traps",
    crypto: false,
    title: "Reading the label: the KID & the factsheet",
    core: "Every EU fund legally hands you a Key Information Document — three pages that answer most questions people never ask.",
    reading:
      "<p>Before you buy a fund or ETF in the EU, the platform must show you a <b>KID</b> (Key Information Document) — a standardised three-pager the fund is legally required to produce. Most people click past it. Don't: it's the one place the important stuff is written in plain(ish) language.</p><p>What to read: the <b>risk indicator</b>, a 1–7 scale (a world equity ETF typically sits around 4; anything at 6–7 is telling you it swings hard). The <b>performance scenarios</b> — what you might get back in a bad, moderate and good outcome; the point isn't the numbers, it's noticing a bad scenario exists. And <b>costs over time</b>, which turns percentages into euros taken from your pot.</p><p>The <b>factsheet</b> adds the practical fields: <b>TER</b> (the yearly fee — Lesson 4 showed why 0.2% vs 1.5% matters enormously), whether it's <b>accumulating</b> (dividends reinvested automatically) or <b>distributing</b> (paid out to you), the fund's size and age, and <b>UCITS</b> in the name — the EU regulatory standard for retail funds, with rules on diversification and custody built in. Two minutes of label-reading beats hours of opinions.</p>",
    example:
      "Nora compares two world ETFs her broker offers. Both track similar indexes. The KIDs show the same risk score (4), but one factsheet says TER 0.12%, accumulating, fund size €8bn; the other says TER 0.45%, distributing, €40m. Same market exposure — but over 30 years the fee gap alone is thousands of euros, and she wanted dividends reinvested anyway. The labels made the choice boring and obvious.",
    check: [
      {
        q: "What does the KID's 1–7 number tell you?",
        o: [
          "How much the investment tends to swing — a risk scale",
          "A quality score — 7 is the best fund",
          "How many stars analysts gave it",
        ],
        a: 0,
        why: "It's a risk indicator, not a rating. A 6 isn't 'better' than a 4 — it's wilder.",
      },
      {
        q: "Accumulating vs distributing means…",
        o: [
          "Dividends are reinvested automatically vs paid out to you",
          "The fund is growing vs shrinking",
          "Monthly vs yearly fees",
        ],
        a: 0,
        why: "Same investments — just what happens to the dividends.",
      },
    ],
  },
  {
    id: "l24",
    pillar: "🛡️ Protections & traps",
    crypto: false,
    title: "What if my broker goes bust?",
    core: "Your investments aren't the broker's property — segregation, a €20k compensation floor, and a €100k deposit guarantee form the EU safety net, and knowing it beats fearing it.",
    reading:
      "<p>The fear that stops many beginners: \"if the app disappears, does my money disappear?\" Mostly, no — and it's worth understanding exactly why. EU brokers must keep client investments <b>segregated</b>: your ETF shares are held apart from the broker's own assets, usually at a separate custodian. If the broker fails, those shares are still yours — typically transferred to another broker, not sucked into the bankruptcy.</p><p>Behind that sits the <b>investor compensation scheme</b>: an EU-mandated floor of at least <b>€20,000</b> per person per firm, covering the rare ugly case where assets went missing (fraud, administration failure). Read that carefully: it covers <i>missing assets</i> — it does <b>not</b> cover your investment simply losing value. Markets falling is investing, not a failure event.</p><p>Uninvested <b>cash</b> follows different rules: money held as a bank deposit is covered by a <b>deposit guarantee scheme</b> up to <b>€100,000</b> per person per bank. Some brokers park cash in money-market funds instead — protected as segregated assets, not by the deposit guarantee. Where to check all this: the provider's own \"how are my assets protected\" page, and the register of its national regulator. Crypto, one more time: generally <i>no</i> compensation scheme at all — which is exactly why it belongs in the small, bounded slice.</p>",
    example:
      "Emma has €6,000 in a world ETF and €800 cash at a regulated EU broker that suddenly enters administration. Her ETF shares were segregated at a custodian — after some tense weeks, they're transferred to another broker, untouched. Her €800 was a bank deposit, covered many times over by the €100k guarantee. What the schemes would never have covered: the €400 her ETF happened to be down that month. That part is just markets.",
    check: [
      {
        q: "What does the €20k investor compensation scheme cover?",
        o: [
          "Assets that went missing when a firm fails — never ordinary market losses",
          "Any investment that loses value",
          "Losses up to €20k per year, guaranteed",
        ],
        a: 0,
        why: "It's for failure-with-missing-assets. Markets falling is investing, not an insured event.",
      },
      {
        q: "Why does segregation matter?",
        o: [
          "Your investments are held apart from the broker's own assets, so they're still yours if it fails",
          "It spreads your money across many stocks",
          "It hides your holdings from tax authorities",
        ],
        a: 0,
        why: "Segregated assets typically transfer to another broker — they don't join the bankruptcy.",
      },
    ],
  },
  {
    id: "l25",
    pillar: "🛡️ Protections & traps",
    crypto: false,
    title: "Leverage kills: CFDs, margin & the 74–89%",
    core: "EU regulators force CFD platforms to print their own losing statistics — 74–89% of retail accounts lose money — and understanding why is the cheapest lesson in finance.",
    reading:
      "<p>Sooner or later an ad offers you trading with <b>leverage</b>: control €10,000 of market with €1,000 down, usually via a <b>CFD</b> (contract for difference — a bet on a price move, where you never own the asset). The pitch is amplified gains. The math is symmetric: with 10× leverage, a 10% move against you doesn't dent your position — it <b>wipes out your entire stake</b>. Normal market wobble becomes fatal.</p><p>This isn't opinion; it's the regulator's own data. EU rules force every CFD provider to display what share of its retail clients lose money — when ESMA measured across providers, it found <b>74–89% of retail CFD accounts lose</b>, with average losses in the thousands. The EU responded by capping retail leverage, banning <b>binary options</b> outright, and mandating negative-balance protection so you can't end up owing more than you deposited. When a regulator makes a product carry a health warning, believe the label.</p><p>The trap works on psychology, not information: fast feedback, near-misses, and the feeling of being <i>almost</i> right — the same loop as a slot machine (Lesson 12's loss aversion plus Lesson 14's overconfidence, on fast-forward). Long-term investing needs none of it: no leverage, no expiry dates, no margin calls. If you ever feel the pull, re-read the number the platform is legally forced to show you. It's telling you your odds.</p>",
    example:
      "Milan opens a CFD position: €500 stake, 20× leverage, €10,000 exposure. The market dips 4% during a normal choppy week — nothing dramatic, long-term investors barely notice. But 4% of €10,000 is €400 of his €500 gone; a margin call closes the position before it can recover. The same €500 in an unleveraged world ETF would have been down €20, on its way to recovering like every other wobble. Same market. Different survival odds.",
    check: [
      {
        q: "With 10× leverage, what does a 10% move against you do?",
        o: [
          "Wipes out your entire stake",
          "Loses you 10%, same as without leverage",
          "Nothing — leverage only amplifies gains",
        ],
        a: 0,
        why: "Leverage multiplies both directions; ordinary volatility becomes fatal.",
      },
      {
        q: "What do EU CFD platforms have to tell you by law?",
        o: [
          "The share of their retail clients who lose money — typically 74–89%",
          "Which trades to make",
          "Nothing — CFDs are unregulated",
        ],
        a: 0,
        why: "ESMA forces the warning because its own data showed most retail accounts lose.",
      },
    ],
  },
  {
    id: "l26",
    pillar: "🏛️ Taxes & pensions",
    crypto: false,
    tier: "plus",
    title: "Investment taxes in the EU: the four questions",
    core: "Tax rules differ per country, but the four questions are the same everywhere — and answering them once can be worth more than years of picking funds.",
    reading:
      "<p>There is no single EU investment tax — each country sets its own. But wherever you live, the same <b>four questions</b> decide what you keep: (1) How are <b>capital gains</b> taxed when you sell — and does holding longer change it? (2) How are <b>dividends</b> taxed as they arrive? (3) Does my country tax funds <b>yearly even without selling</b> (some tax assumed or unrealized gains — the Netherlands and Germany both do versions of this)? (4) Are there <b>tax-favoured accounts or wrappers</b> I'm ignoring (many countries offer pension or investment accounts with real advantages)?</p><p>One piece of plumbing is worth knowing everywhere: <b>withholding tax</b>. When a US company pays a dividend, the US takes a slice before it ever reaches your fund. Funds domiciled in <b>Ireland</b> pay 15% under the US–Ireland treaty instead of the default 30% — one big reason most flagship UCITS ETFs are Irish (look for \"IE\" at the start of the ISIN on the factsheet — Lesson 23). It's also why <b>accumulating vs distributing</b> isn't just a convenience choice: several countries tax the two differently.</p><p>What to actually do: find your country's official tax-authority page on investment income (every EU country has one), answer the four questions once, and prefer the boring structural wins — the right domicile, the right account type, the right share class — over tax cleverness. And the banner rule: this lesson explains <i>concepts that exist</i>; what applies to you depends on your country and situation. <b>This is education, not tax advice.</b></p>",
    example:
      "Tomas, investing €200/month, spends one Saturday on the four questions for his country. He discovers a tax-favoured investment account he wasn't using, and that his chosen world ETF is Irish-domiciled (15% US withholding instead of 30% — already handled inside the fund). Total effort: an afternoon. Over 30 years, the account wrapper alone plausibly beats a decade of trying to pick better funds — and unlike fund-picking, it was a decision he only had to get right once.",
    check: [
      {
        q: "Why are most flagship UCITS ETFs domiciled in Ireland?",
        o: [
          "The US–Ireland treaty halves withholding tax on US dividends (15% vs 30%)",
          "Ireland has no financial regulator",
          "EU law requires all ETFs to be Irish",
        ],
        a: 0,
        why: "A structural tax win handled inside the fund — visible in the ISIN starting with IE.",
      },
      {
        q: "What's the smartest general approach to investment taxes?",
        o: [
          "Answer the four questions for your country once; prefer structural wins over cleverness",
          "Ignore taxes until the tax office writes to you",
          "Copy tax strategies from social media",
        ],
        a: 0,
        why: "Domicile, account type and share class are one-time decisions that quietly compound.",
      },
    ],
  },
  {
    id: "l27",
    pillar: "🏛️ Taxes & pensions",
    crypto: false,
    tier: "plus",
    title: "Pensions in the EU: the three pillars",
    core: "Almost every EU country builds retirement on the same three pillars — and your DIY investing is pillar three, sitting on top of two you should check first.",
    reading:
      "<p>Across the EU, retirement income follows the same skeleton. <b>Pillar 1</b> is the state pension: funded by today's workers for today's retirees, tied to your contribution years. It's the floor — and with Europe ageing, most governments openly say the floor alone won't maintain your lifestyle. <b>Pillar 2</b> is occupational: schemes your employer pays into, common in some countries and sectors, rare in others. <b>Pillar 3</b> is personal: private pension products and, ultimately, everything this app teaches you to do yourself.</p><p>The order of operations matters more than any fund choice. First, <b>find your pillar-1 statement</b> — most countries have an online portal showing your projected state pension; most people have never looked. Second, <b>check pillar 2</b>: an employer scheme, especially one with matching contributions, is usually the best deal available to you — it's part of your salary you may be leaving unclaimed. Only then does pillar-3 DIY investing take the stage, often with tax advantages your country attaches to it (Lesson 26's fourth question).</p><p>Two more things worth knowing: the EU created <b>PEPP</b>, a pan-European personal pension wrapper designed to be portable across borders — young and rare so far, but worth watching if you move countries. And the honest framing: only around a quarter of EU citizens hold any pillar-3 product at all. The <b>pension gap</b> — the difference between what pillar 1 will pay and what your life costs — is precisely the number your monthly investing habit exists to close. That's not doom; it's a target.</p>",
    example:
      "Ines, 29, logs into her country's pension portal for the first time: projected state pension, €1,150/month in today's money — against current spending of €1,900. Gap: €750/month. Her employer offers a pension scheme matching 3% of salary that she never opted into — free money, fixed first. The rest becomes her pillar-3 target: her €250/month index habit now has a purpose with a number on it, instead of being an abstract 'saving for later'.",
    check: [
      {
        q: "What should you check before doing any pillar-3 DIY pension investing?",
        o: [
          "Your projected state pension and any employer scheme — especially matching contributions",
          "Nothing — private investing replaces the other pillars",
          "Only which funds performed best last year",
        ],
        a: 0,
        why: "Employer matching is usually the best deal available — unclaimed salary.",
      },
      {
        q: "The 'pension gap' is…",
        o: [
          "The difference between what pillar 1 will pay and what your life actually costs",
          "The years between quitting work and receiving the state pension",
          "A tax on early retirement",
        ],
        a: 0,
        why: "It's the concrete number your long-term investing exists to close.",
      },
    ],
  },
  {
    id: "l31",
    pillar: "🧠 Your brain & money",
    crypto: false,
    title: "Surviving your first crash: the drill",
    core: "Your first real crash is a when, not an if — and what long-term investors do in one is decided before it starts, not during.",
    reading:
      "<p>Here's the schedule nobody puts in the brochure: broad markets drop <b>10%+ most years</b> along the way, and <b>20%+ (a bear market)</b> every handful of years. In April 2025, trillions in market value vanished in two days. If you invest for decades, you will sit through several of these. The only question is whether you'll have a drill or a panic.</p><p>Set the expectation before you need it: a first year anywhere from <b>−15% to +25%</b> is completely normal and says nothing about whether you're \"doing it right.\" The long-run average you'll hear quoted (roughly 7–8%/year for a broad market) is a many-decade average, not a promise for any single year — judging year one against it is like judging a marathon runner's fitness from their first ten metres.</p><p>The drill, written in calm weather: <b>(1)</b> automatic contributions keep running — historically, buying through a crash meant buying cheap (Lesson 12's Ben). <b>(2)</b> No selling decisions during a drawdown; if you ever change the plan, you do it on a scheduled, calm review day, not a red one. <b>(3)</b> Check <i>less</i>, not more — every extra look is another loss-aversion sting (Lesson 14). <b>(4)</b> Re-read the note you wrote to your future self about why you invested. If you haven't written it yet, today — in a calm market — is exactly the day.</p><p>What makes crashes survivable isn't courage, it's <b>structure</b>: an emergency fund so you're never forced to sell (Lesson 10), diversification so nothing goes to zero on you (Lesson 4), automation so buying continues without a decision (Lesson 11). People who \"stayed calm\" through history's crashes mostly weren't calm — they had simply arranged things so their feelings had no lever to pull.</p>",
    example:
      "Two colleagues, same crash, −25% in six weeks. Priya has the drill: her €200/month keeps buying, she's deleted the app from her home screen, and her written note says \"you invest for 2050, not for next spring.\" Marco has no drill: he checks hourly, sells \"temporarily\" near the bottom to \"wait for clarity,\" and buys back in a year later — above his selling price. The market treated them identically. Their structures didn't.",
    check: [
      {
        q: "When do long-term investors decide what they'll do in a crash?",
        o: [
          "Before it happens — in calm weather, written down",
          "During the crash, when they have the most information",
          "Never — crashes can't be prepared for",
        ],
        a: 0,
        why: "In a drawdown your brain is compromised (loss aversion). The plan has to predate it.",
      },
      {
        q: "What actually makes a crash survivable?",
        o: [
          "Structure: emergency fund, diversification, automation — so feelings have no lever",
          "Courage and strong nerves",
          "Checking the portfolio hourly to react fast",
        ],
        a: 0,
        why: "The 'calm' investors of history mostly just removed their own ability to panic-sell.",
      },
    ],
  },
  {
    id: "l32",
    pillar: "🛡️ Protections & traps",
    crypto: false,
    title: "Finfluencers & copy trading: the machinery",
    core: "Behind the confident feed sits real machinery — undisclosed payments, EU rules many posters break, and copy-trading incentives that don't point your way.",
    reading:
      "<p>Lesson 13 covered the psychology of the hype feed. Now the machinery. In the EU, posting <b>investment recommendations</b> on social media isn't a free-for-all — ESMA has warned it can fall under the <b>Market Abuse Regulation</b>: recommendations must be objective, and paid promotion must be disclosed. The rules exist; enforcement is catching up. Meanwhile most \"here's my portfolio, use my code\" content is exactly what it looks like: <b>paid distribution</b> wearing a friendship costume.</p><p>Two checks before trusting anyone online about money: <b>(1) Are they licensed?</b> Anyone giving personal investment advice needs authorisation — every national regulator runs a public register you can search in one minute. Unlicensed + specific buy recommendations = walk away. <b>(2) Who pays them?</b> A referral code IS a payment. A #ad is honesty; a missing #ad on obvious promotion is your answer about their character.</p><p><b>Copy trading</b> automates the problem: your account mirrors a \"top trader's\" moves, often on CFD platforms (Lesson 25's 74–89% base rate applies). The incentive flaw: leaders typically earn from follower volume, not follower profits — they get paid whether you win or lose, which rewards flashy, high-frequency trading over the boring kind that works. Nobody with a genuinely money-printing strategy sells copies of it for follower fees. The whole arrangement answers its own question.</p>",
    example:
      "An account with 400k followers posts daily wins, a broker referral code, and a \"copy my trades\" link. Sara runs the checks: the national register shows no licence; there's no #ad anywhere despite the code paying per signup; the copy-platform's own disclosure says most retail accounts lose money; and the leader's fee is per copier, not per profit. Four checks, four red flags, three minutes. She keeps her boring index plan and mutes the account.",
    check: [
      {
        q: "What's the incentive flaw in most copy trading?",
        o: [
          "Leaders earn from follower volume, not follower profits — they're paid whether you lose or win",
          "Copying is illegal in the EU",
          "The trades copy too slowly to matter",
        ],
        a: 0,
        why: "Rewarding flashy volume over boring returns points the incentives away from you.",
      },
      {
        q: "How do you check if someone may legally give investment advice?",
        o: [
          "Search your national regulator's public register — it takes a minute",
          "Check their follower count",
          "Ask them directly and trust the answer",
        ],
        a: 0,
        why: "Licensed or not is a public fact, not a vibe.",
      },
    ],
  },
  {
    id: "l33",
    pillar: "📈 Investing",
    crypto: false,
    tier: "plus",
    title: "Currency risk: your world ETF is mostly dollars",
    core: "A 'global' fund bought in euros still lives mostly in dollars — sometimes your return is the market, and sometimes it's the exchange rate.",
    reading:
      "<p>Open the factsheet of a typical world index ETF (Lesson 23) and you'll find <b>60–70% of it is US assets</b> — priced in dollars. Buying it in euros doesn't change that. Your return has two layers: what the assets do, and what the <b>EUR/USD exchange rate</b> does. Some years the layers add; some years they fight. In 2025 many EU investors watched US markets rise while their euro-denominated ETFs barely moved — the dollar's slide against the euro ate the gains. Nothing was broken. That's currency risk.</p><p>The menu: an <b>unhedged</b> fund (the default) accepts the currency swings. A <b>hedged share class</b> uses contracts to cancel them — for a cost that quietly compounds like any fee, and rises when interest rates differ between the currencies. The classic reasoning: over <b>decades, equity investors</b> often accept unhedged swings (currencies tend to wash out over long horizons, and hedging costs are certain while the benefit isn't). For <b>bonds</b>, where returns are small and stability is the point, currency swings can dwarf the returns — which is why euro-hedged bond funds are common.</p><p>What matters is neither panic nor pretending it away: <b>know which you own</b> (the factsheet says \"EUR Hedged\" in the name if it is), expect years where the exchange rate — not the market — writes your result, and treat the choice like everything else here: a trade-off with costs on both sides, not a right answer someone on the internet has found for you.</p>",
    example:
      "In one 2025 stretch, a US-heavy world index rose ~8% in dollars while the dollar fell ~10% against the euro. Lena's unhedged ETF showed roughly −2% — while American investors celebrated. Her reaction, thanks to this lesson: check the factsheet (unhedged, as she chose), remember the same effect boosted her returns in dollar-strong years, and change nothing. The exchange rate had the pen that year; over her 25-year horizon, the market usually does.",
    check: [
      {
        q: "Why can your world ETF fall while US markets rise?",
        o: [
          "It's ~60–70% dollar assets — a falling dollar can eat the market gains in euro terms",
          "European brokers apply a penalty fee",
          "It can't — global funds remove all currency effects",
        ],
        a: 0,
        why: "Your return = the assets' move plus the exchange rate's move. Some years they fight.",
      },
      {
        q: "Why do euro investors often hedge bonds but not stocks?",
        o: [
          "Bond returns are small enough for currency swings to dwarf them; long-horizon equity swings tend to wash out",
          "Hedging stocks is illegal",
          "Bonds are traded only in dollars",
        ],
        a: 0,
        why: "Hedging costs are certain; its benefit depends on the asset's size of returns and your horizon.",
      },
    ],
  },
  {
    id: "l34",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    title: "What happens if your exchange fails?",
    core: "Buying crypto on an exchange isn't the same as owning it — and MiCA licensing exists specifically to make failure survivable instead of catastrophic.",
    reading:
      "<p>Here's a distinction almost every beginner misses: buying crypto on an exchange and <b>owning</b> crypto are not the same thing until you withdraw it. While it sits on the exchange, you hold an IOU — a database entry saying the exchange owes you that amount. If the exchange fails, you're a creditor, not an owner. When FTX collapsed in 2022, roughly <b>$8 billion</b> in customer funds went missing overnight — money people believed was simply \"in their account.\" Unlike a bank, crypto holdings on an exchange carry <b>no deposit insurance</b>. Nothing tops it up if it's gone.</p><p>This is exactly the gap <b>MiCA</b> licensing is built to close. A licensed <b>CASP</b> (crypto-asset service provider) must legally <b>segregate</b> client crypto from its own company funds and maintain a client-asset register — the same principle EU brokers already follow for shares (Lesson 24). It doesn't make an exchange invincible, but it means your holdings aren't just mixed into the company's balance sheet and gambled with. This is the concrete answer to \"why does it matter if my exchange is licensed\" — it's not a badge, it's a legal boundary around your assets.</p><p>And if a licensed exchange still fails? Recovery runs through <b>bankruptcy proceedings</b>, not a same-day refund. FTX customers waited over <b>two years</b> for staged repayments — and eventually recovering most of their money was an unusually good outcome, not a guarantee. <b>Self-custody</b> (Lesson 20) sidesteps this entire chain of risk by design: crypto in your own wallet isn't anyone's balance sheet to fail.</p>",
    example:
      "Wiktoria buys crypto on two platforms: a MiCA-licensed exchange for most of it, and — chasing a slightly better price — an unlicensed offshore site for a small top-up. A year later the offshore site quietly stops processing withdrawals and disappears; there's no register, no license, no regulator to complain to, and her funds are simply gone. Her licensed-exchange holdings are untouched. The price difference that looked like a bargain was actually the cost of the protection she skipped.",
    check: [
      {
        q: "While your crypto sits on an exchange (not withdrawn), what do you actually hold?",
        o: [
          "A claim on the exchange — you're a creditor, not the owner, until you withdraw it",
          "Direct ownership, identical to holding it in your own wallet",
          "A government-insured deposit, like cash in a bank",
        ],
        a: 0,
        why: "It's a database entry the exchange owes you — real ownership starts once it's in your own wallet.",
      },
      {
        q: "What does MiCA licensing concretely require of an exchange?",
        o: [
          "Segregating client crypto from company funds and keeping a client-asset register",
          "Guaranteeing prices will never fall",
          "Insuring all customer deposits like a bank",
        ],
        a: 0,
        why: "Segregation is a legal boundary around your assets — it doesn't prevent failure, but it changes what happens if it does.",
      },
    ],
  },
  {
    id: "l35",
    pillar: "📈 Investing",
    crypto: false,
    title: "Placing your first order — and what happens next",
    core: "Two order types cover almost everything a beginner needs, and the biggest first-time surprise isn't the click — it's what happens in the day or two after.",
    reading:
      "<p>When you place a trade, you'll usually choose between a <b>market order</b> (buy or sell right now, at whatever the current price is) and a <b>limit order</b> (only execute at a price you set, or better). For a broad, liquid fund bought mid-trading-day, the difference is often tiny. It stops being tiny right at <b>market open</b>, when prices can jump around before settling — a market order there can fill at a worse price than you expected. A simple habit: near the open, use a limit order a fraction above the last price; otherwise a market order is usually fine.</p><p>What surprises almost everyone the first time: clicking \"buy\" isn't the end of it. Trades go through <b>settlement</b> — in most markets this now takes one business day (<b>T+1</b>) after the trade date. Your position typically shows up right away for tracking, but the underlying legal transfer — and your ability to immediately withdraw cash from a sale — follows a day later. That's not a glitch; it's just how the plumbing works, and every broker operates on the same clock.</p><p>None of this needs to be memorized in detail. The practical takeaway is smaller: don't panic if withdrawn cash isn't instantly spendable, don't be surprised by a slightly different fill price right at the open, and know that both are completely normal, not a sign anything went wrong.</p>",
    example:
      "It's Sam's first trade — a world ETF, placed two minutes after the market opens. A market order fills a little higher than the price shown seconds earlier; Sam nearly messages support, thinking something broke. It didn't — that's the normal early-session jump a limit order would have avoided. The next day, wanting to withdraw a small amount, Sam finds the cash isn't there yet either — also normal, just settlement catching up a day behind.",
    check: [
      {
        q: "When does a limit order matter most for a beginner?",
        o: [
          "Right around market open, when prices can jump before settling",
          "Never — market and limit orders always fill at the same price",
          "Only when trading amounts over €10,000",
        ],
        a: 0,
        why: "Prices are most unstable in the first minutes of trading; a limit order caps what you'll pay.",
      },
      {
        q: "Why might cash from a sale not be withdrawable the same day?",
        o: [
          "Settlement (commonly T+1) follows a day after the trade — normal for every broker, not a fault",
          "The broker is holding it to earn interest illegally",
          "Something went wrong with the order",
        ],
        a: 0,
        why: "Settlement timing is standard market plumbing, unrelated to whether the trade itself was fine.",
      },
    ],
  },
  {
    id: "l36",
    pillar: "🛡️ Protections & traps",
    crypto: false,
    title: "Switching broker without losing your shirt",
    core: "Moving your investments to a new broker has three real paths — and picking the wrong one can quietly trigger a tax bill or lose your cost-basis records.",
    reading:
      "<p>Eventually many investors want to switch broker — better fees, better app, or a provider that no longer fits. There are three real ways to move: update your address and stay put (simplest, changes nothing about your holdings); an <b>in-kind transfer</b>, where your existing shares or funds move custodian-to-custodian without being sold; or <b>sell and rebuy</b> at the new broker, which is really opening a new position from scratch.</p><p>In-kind transfer is usually what people actually want — it avoids selling (no forced tax event, no time out of the market) — but it's also the option most likely to go wrong in practice. National regulators across the EU have flagged broker-transfer delays and lost <b>cost-basis</b> records (what you originally paid, needed for tax purposes) as among the most common complaints they receive from retail investors. A transfer that's supposed to take days can stretch into weeks, and if the paperwork trail breaks, reconstructing your original purchase prices later can be a real headache.</p><p>The practical version: before opening a new account specifically to switch, confirm the new broker actually supports in-kind transfers for what you hold — not every broker accepts every asset type. Keep your own records (old statements, purchase confirmations) rather than relying entirely on the transfer to carry that history. And build in patience — a transfer taking noticeably longer than advertised is common enough to expect, not a sign something's broken.</p>",
    example:
      "Aiden switches broker for lower fees and requests an in-kind transfer of his ETF holdings. It takes five weeks instead of the advertised five days, and the new broker initially shows the wrong purchase price — resolved only because Aiden had kept his own statements from the old broker. A friend doing the same move chose sell-and-rebuy instead, assuming it would be simpler; it was faster, but it also triggered a taxable gain neither of them had planned for that year.",
    check: [
      {
        q: "What's the main advantage of an in-kind transfer over sell-and-rebuy?",
        o: [
          "It avoids selling — no forced tax event and no time spent out of the market",
          "It's always faster than any other option",
          "It automatically updates your tax return",
        ],
        a: 0,
        why: "You keep the same holdings, just under a new custodian — nothing is sold, so nothing is taxed by the move itself.",
      },
      {
        q: "Why is it worth keeping your own purchase records before switching broker?",
        o: [
          "Cost-basis data can get lost or delayed in a transfer, and you may need it later for tax purposes",
          "Brokers are legally required to delete old records after a transfer",
          "It's needed to unlock a better interest rate",
        ],
        a: 0,
        why: "Lost cost-basis records are a common, documented transfer problem — your own copy is the backup.",
      },
    ],
  },
  {
    id: "l37",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    title: "Wallet drainers, fake airdrops & the seed phrase rule",
    core: "The newest big category of crypto theft doesn't steal your password — it gets you to sign a permission that lets it empty your wallet later, sometimes days later.",
    reading:
      "<p>Beyond phishing for passwords, a specific and fast-growing scam targets self-custody wallets directly: the <b>wallet drainer</b>. You connect your wallet to a site — often a fake \"claim your airdrop\" page — and sign what looks like a routine <b>approval</b> transaction. That signature can grant a contract standing permission to move your tokens later, sometimes not immediately, which is exactly why victims often don't connect the theft to the site that caused it. This isn't rare: tracked losses reached roughly <b>$300 million</b> across hundreds of thousands of victims in a single recent year, and scam techniques increasingly reuse the same playbook via fake ads and compromised social accounts.</p><p><b>Fake airdrops</b> are the most common bait. The tells are consistent: anything asking you to <b>send</b> crypto first to \"unlock\" a claim (real airdrops never require payment), urgent language (\"claim now or lose it\"), and a freshly registered look-alike website. A cheap habit that closes most of this off: periodically check and <b>revoke</b> old token approvals via a block explorer, so a permission you granted once and forgot about can't be used against you later.</p><p>None of this touches your <b>seed phrase</b> directly — connecting a wallet to a scam site doesn't reveal it — but the seed phrase remains the single point of total failure. The real-world mistakes are mundane: a screenshot, a note in a cloud drive, a photo in a messaging app. There's no \"forgot password\" for a seed phrase — lose it or expose it, and there's no support line that can help. If you've never actually tested restoring your wallet from your backup, you don't yet know it works.</p>",
    example:
      "Jonas sees an ad for a token airdrop tied to a project he's genuinely used before, connects his wallet, and signs what the site calls a \"claim\" transaction. Nothing happens immediately, so he forgets about it — until three weeks later his wallet is emptied in one transaction. The approval he signed had quietly given the scam contract standing permission all along. He'd never have connected the theft to that click if he hadn't, out of habit, checked his approval history afterward and found the exact permission still listed.",
    check: [
      {
        q: "How does a wallet-drainer scam typically work?",
        o: [
          "You sign an approval transaction that grants a contract permission to move your tokens later — sometimes days later",
          "The scammer directly guesses your password",
          "It only works if you type your seed phrase into a website",
        ],
        a: 0,
        why: "The theft can happen well after the original interaction, which is exactly why it's hard to trace back.",
      },
      {
        q: "What's the biggest red flag on an airdrop claim page?",
        o: [
          "Being asked to send crypto first to \"unlock\" the claim",
          "The site being a well-known, established exchange",
          "Taking more than a minute to load",
        ],
        a: 0,
        why: "Real airdrops never require an upfront payment — that request alone is close to a guarantee of a scam.",
      },
    ],
  },
  {
    id: "l38",
    pillar: "📈 Investing",
    crypto: false,
    title: "Too many choices: picking one",
    core: "Hundreds of thousands of investment products exist and most beginners wildly overestimate the money needed to start — both make simply beginning feel harder than it is.",
    reading:
      "<p>Open a broker and you're handed a genuine problem: hundreds of thousands of funds and shares to choose from — a landscape that didn't exist a generation ago, when the choice was a fraction of today's size. Faced with that much choice, a well-documented reaction kicks in: <b>decision paralysis</b>. In one recent survey, deciding how to invest ranked among the hardest life decisions for a large share of first-time investors — harder, for many, than choosing a career.</p><p>The way past it isn't more research — it's deliberately narrowing the decision. A single broad, low-cost, globally diversified fund (the kind covered in earlier lessons) is enough to start with. It won't be the single best-performing fund of the next ten years — nobody can pick that in advance anyway — but \"good enough and actually started\" reliably beats \"perfect but still researching\" a year from now. Complexity, if you want it, can always be added later, once the basics are running.</p><p>A second, separate misconception compounds the paralysis: people consistently overestimate how much money is needed to start at all — some surveys find beginners guessing they'd need tens of thousands of euros, when in practice many brokers allow starting with a small monthly amount, or even fractional shares. Overestimating the entry price is often the real reason someone who \"plans to start eventually\" never actually does.</p>",
    example:
      "Priya spends three weekends comparing dozens of funds, gets more confused with each new comparison, and starts nothing. A friend, less thorough but more decisive, picks one broad world-index fund from the shortlist Priya had already narrowed down and sets up a small monthly transfer that afternoon. A year later the friend has a year of contributions and compounding behind them; Priya, still \"deciding,\" has none — despite having done more research.",
    check: [
      {
        q: "What's the recommended way to cut through hundreds of thousands of fund choices as a beginner?",
        o: [
          "Deliberately pick one broad, low-cost, diversified fund to start — add complexity later if you want it",
          "Research every option thoroughly before making any decision",
          "Pick the fund with the highest recent returns",
        ],
        a: 0,
        why: "A simple, adequate choice made now beats an optimal choice that never gets made.",
      },
      {
        q: "What do beginners commonly get wrong about how much money is needed to start investing?",
        o: [
          "They significantly overestimate it — many brokers allow starting with small, regular amounts",
          "They underestimate it, and end up investing far more than they can afford",
          "There's a fixed EU-wide legal minimum everyone must meet",
        ],
        a: 0,
        why: "Overestimating the entry price is a common, correctable reason people delay starting at all.",
      },
    ],
  },
  {
    id: "l39",
    pillar: "🛡️ Protections & traps",
    crypto: false,
    title: "Your rights as an EU investor",
    core: "You have real, enforceable rights as a retail investor in the EU — including a specific cross-border complaints network most people have never heard of.",
    reading:
      "<p>When a broker asks you questions before letting you trade certain products — experience, knowledge, sometimes a short quiz — that's not gatekeeping for its own sake. EU rules require firms to check whether a product looks <b>appropriate</b> for you before you can buy it, and to warn you plainly if it doesn't. It can feel like friction. It exists because regulators found, repeatedly, that without it people ended up in products they didn't understand.</p><p>If something goes wrong — a fee you weren't told about, an order that wasn't handled properly, account access problems that never get resolved — you have a real complaints path, not just a support inbox. Step one is always the firm's own internal complaints process (every regulated broker must have one). If that doesn't resolve it, the next step is your country's <b>financial regulator or ombudsman</b>, who can investigate independently of the firm.</p><p>Here's the part almost nobody knows: if your broker is licensed in a <i>different</i> EU country than the one you live in — increasingly common as brokers operate across borders — your complaint doesn't have to go nowhere. <b>FIN-NET</b> is an EU-wide network of over 60 dispute-resolution bodies across all EU/EEA countries, built specifically to route a complaint like that to the right place, regardless of which country's rules technically apply. Knowing this one name is often the difference between giving up and actually being heard.</p>",
    example:
      "Elena lives in one EU country but her broker is licensed in another — common for cross-border apps. A fee dispute goes nowhere through the broker's support chat, and Elena assumes there's no one to appeal to since the broker isn't \"local.\" A quick search turns up FIN-NET, which routes her complaint to the correct dispute-resolution body for the broker's home country — resolved within weeks, at no cost to her.",
    check: [
      {
        q: "Why do brokers ask appropriateness questions before letting you trade certain products?",
        o: [
          "EU rules require checking whether a product suits your experience and warning you if it doesn't",
          "To decide how much to charge you in fees",
          "It's optional marketing research the broker chose to add",
        ],
        a: 0,
        why: "It's investor protection, not gatekeeping — required so people don't end up in products they don't understand.",
      },
      {
        q: "What is FIN-NET for?",
        o: [
          "Routing cross-border complaints to the right dispute-resolution body when your broker is licensed in a different EU country than you live in",
          "A crypto exchange licensing register",
          "An EU-wide investment fund",
        ],
        a: 0,
        why: "It exists specifically so a cross-border complaint doesn't fall through the cracks between two countries' systems.",
      },
    ],
  },
  {
    id: "l40",
    pillar: "₿ Crypto deep-dive",
    crypto: true,
    title: "Bitcoin, specifically",
    core: "Bitcoin isn't just \"the first crypto\" — it's a distinct decision (how much of your crypto slice, if any, is Bitcoin vs everything else) and it has a path into a normal brokerage account that most beginners never hear about.",
    reading:
      "<p>In 2008, someone using the name <b>Satoshi Nakamoto</b> published a short paper describing a currency with no bank or government behind it, and launched it in 2009. Nobody knows who Satoshi is. That origin — anonymous, leaderless, code instead of an institution — is the whole pitch: a fixed, predictable supply (Lesson 29's 21-million cap) that no central bank can print more of on a whim. Because of that, Bitcoin is often marketed as \"<b>digital gold</b>\" — a store of value outside the normal financial system. Be honest about the counter-evidence too: in real selloffs, Bitcoin has often moved <i>with</i> risky assets like stocks, not as a calm safe haven the way gold historically has. The scarcity is real; the \"safe haven\" story is, so far, only sometimes true.</p><p>A question this app hasn't answered yet: if you hold a crypto slice at all, does it have to include coins other than Bitcoin? There's no single right answer, but the common pattern among people who think about this carefully is to weight the large majority of any crypto slice toward <b>Bitcoin and Ethereum</b> — the two with the longest track record and deepest liquidity — and treat smaller, newer tokens as a separate, higher-risk bet layered on top, not a bigger version of the same thing. Most tokens launched in any given year end up worth a fraction of their launch price or worthless. \"Bitcoin only\" and \"Bitcoin plus a small satellite of other coins\" are both defensible; \"an even spread across whatever's trending\" usually isn't.</p><p>One more thing worth knowing, because it's genuinely useful: you can get price exposure to Bitcoin through an ordinary <b>regulated broker</b>, not just a crypto exchange — via an <b>ETP</b> (exchange-traded product) that holds real Bitcoin and trades on a normal stock exchange. This sits on the MiFID II side of the fence, not MiCA — it's a security, bought and held exactly like any other fund in your portfolio. One thing worth clearing up if you've seen US headlines: the well-known <b>US \"spot Bitcoin ETF\"</b> products are not available to EU retail investors — EU fund rules require a fund to be diversified, which rules out a fund holding a single asset. The EU-accessible route is the ETP structure specifically, a different (though economically similar) wrapper.</p>",
    example:
      "Felix wants Bitcoin exposure but doesn't want another exchange login and password to manage. He finds a Bitcoin ETP listed on his regular stock exchange, buys it through the same broker as his index fund, and it shows up in the same portfolio view — no wallet, no seed phrase, no separate KYC. He gives up direct self-custody in exchange for simplicity; a friend who wants to hold the actual Bitcoin, not just track its price, uses a MiCA-licensed exchange and self-custody instead. Neither choice is wrong — they're solving for different things.",
    check: [
      {
        q: "Within a crypto slice, what's a defensible way to think about Bitcoin vs. other coins?",
        o: [
          "Weight the majority toward Bitcoin (and often Ethereum) and treat smaller tokens as a separate, higher-risk layer",
          "Spread evenly across whatever coins are currently trending",
          "It doesn't matter which coins, only the total euro amount matters",
        ],
        a: 0,
        why: "Longer track record and liquidity are why Bitcoin/Ethereum are commonly treated differently from newer, less-proven tokens.",
      },
      {
        q: "What's true about Bitcoin ETPs available to EU retail investors?",
        o: [
          "They're a MiFID II security bought through a normal broker — but the US \"spot Bitcoin ETF\" products themselves aren't available in the EU",
          "They're identical products to the US spot Bitcoin ETFs, just listed in Europe",
          "They require a MiCA-licensed exchange account to buy",
        ],
        a: 0,
        why: "EU diversification rules block single-asset ETFs, so the EU-accessible route is the ETP wrapper specifically, via a normal broker.",
      },
    ],
  },
  {
    id: "l41",
    pillar: "🏛️ Taxes & pensions",
    crypto: true,
    tier: "plus",
    title: "Crypto & tax: the extra layer",
    core: "Crypto adds tax events traditional investing doesn't have — swapping one coin for another can itself be taxable, and staking rewards are usually taxed as income the moment you receive them.",
    reading:
      "<p>Lesson 26's four questions apply to crypto too, but crypto adds a trap traditional investing doesn't have: in most EU countries, <b>swapping one coin for another</b> — trading BTC for ETH, say — is treated as if you sold the first one, even though no euros ever touched your bank account. That's a taxable event most beginners never see coming, because nothing about the transaction <i>feels</i> like a sale.</p><p><b>Staking rewards</b> add a second layer (Lesson 21 covered the risk side; this is the tax side). New coins arriving as a reward are typically taxed as <b>income</b> at the moment you receive them, valued at that day's price — and then, separately, as a capital gain or loss whenever you eventually sell them. Two tax events from one staking position, at two different times, is the normal shape, not an edge case.</p><p>Country variance is sharper here than for traditional funds: some countries (Germany, for one) exempt crypto held over a year from tax entirely; others apply a flat rate regardless of holding period. And since <b>2026</b>, a new EU rule (<b>DAC8</b>) requires licensed exchanges to report your account activity to your country's tax authority automatically — record-keeping is no longer optional or private. As always: this explains the shape of the problem, not what applies to you. <b>This is education, not tax advice.</b></p>",
    example:
      "Karim buys €500 of ETH, stakes it, and six months later swaps his staking rewards for a different coin — three moves that feel like \"just managing my crypto.\" His country's tax authority sees three separate events: the staking rewards counted as income when received, and the swap counted as a disposal of whatever he swapped away. He finds out from a factsheet, not a fine — because he read Lesson 26's four questions and asked how crypto changes them before he needed to.",
    check: [
      {
        q: "In most EU countries, swapping one crypto coin for another is…",
        o: [
          "Typically a taxable event, even though no euros were involved",
          "Never taxable — only cashing out to euros counts",
          "Only taxable if you use a MiCA-licensed exchange",
        ],
        a: 0,
        why: "Tax authorities generally treat it as disposing of the first coin, regardless of what you received instead.",
      },
      {
        q: "How are staking rewards usually taxed?",
        o: [
          "As income when received, then separately as a capital gain/loss when eventually sold",
          "Only once, when you eventually sell",
          "They're never taxable if you keep staking",
        ],
        a: 0,
        why: "Two separate tax events from one staking position — at two different times.",
      },
    ],
  },
];

/** Lessons available on the free tier (Plus-marked lessons excluded). */
export const FREE_LESSONS: Lesson[] = LESSONS.filter((l) => l.tier !== "plus");
