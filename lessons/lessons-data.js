var LESSONS = [
  {
    id: 1,
    pillar: 'Foundations',
    emoji: '🌱',
    title: 'Why put your money to work',
    coreIdea: 'Money left sitting as cash slowly loses value; investing is how people try to keep and grow their purchasing power over time.',
    reading: [
      'Imagine you put €1,000 under your mattress. In ten years, it’s still €1,000 — but it <strong>buys less</strong>, because prices rise over time. That’s inflation. At around 2–3% a year, prices roughly double over about 25 years, which means cash quietly loses about half its purchasing power over that stretch. Doing nothing isn’t "safe" — it’s a slow, invisible loss.',
      'Investing is the attempt to do better than that: you put money into assets (like shares of companies) that can grow in value and, historically over long periods, have outpaced inflation. Nothing is guaranteed, and values go up <em>and</em> down — but the point of investing isn’t to get rich quick. It’s to stop your savings from shrinking, and to let time do the heavy lifting.',
      'That "time doing the work" is <strong>compounding</strong>. When your money earns a return, and <em>that</em> return also earns a return next year, growth stacks on growth. €100 a month at 0% is just your deposits: €12,000 after ten years. The same €100 a month at a 7% average annual return would grow to roughly €17,000+ over the same ten years — the extra came from compounding, not from you adding more. Over 30 years the gap becomes dramatic.',
      'The single biggest lever isn’t picking the perfect investment — it’s <strong>starting</strong>, and giving compounding as many years as possible to work.'
    ],
    chart: 'compounding',
    example: 'Two friends both invest €150/month at a 7% average return. Anna starts at 25 and stops adding at 35 — ten years of contributions (€18,000 in total), then she just leaves it. Ben starts at 35 and contributes every month until 65 — thirty years of contributions (€54,000 in total). Despite putting in <strong>three times less money</strong>, Anna ends up with a comparable or larger pot at 65 (~€197k vs ~€183k), purely because her money had an extra decade to compound. Time in the market beat the amount invested.',
    checks: [
      { q: 'Why is holding all your long-term savings as cash not actually "safe"?', a: 'Because inflation erodes its purchasing power over time; the number stays the same but it buys less.' },
      { q: 'What makes compounding powerful?', a: 'Returns earn their own returns over time, so growth accelerates the longer the money stays invested.' }
    ]
  },
  {
    id: 2,
    pillar: 'Foundations',
    emoji: '🌱',
    title: 'Risk & time',
    coreIdea: 'Risk isn’t one thing — short-term ups and downs (volatility) are very different from a permanent loss — and your time horizon changes which one matters.',
    reading: [
      'When beginners hear "risk," they usually picture losing everything. But there are two very different risks hiding in that word.',
      '<strong>Volatility</strong> is the normal up-and-down bouncing of prices. A broad stock market might drop 20% in a bad year and recover over the next few. It <em>feels</em> scary, but for a long-term investor who doesn’t sell, it’s mostly noise — the price recovered.',
      '<strong>Permanent loss</strong> is when money doesn’t come back: a single company goes bankrupt, or someone sells everything at the bottom of a crash and locks in the loss. Volatility only <em>becomes</em> a permanent loss if you’re forced (or panic) into selling at a low point.',
      'This is why <strong>time horizon</strong> — how long until you need the money — changes everything. If you need the money in a year, a 20% drop is a real problem: there may not be time to recover before you spend it. If you don’t need it for 20 years, that same drop is something you can ride out. So "safe" isn’t a fixed property of an investment; it depends on when you’ll need the cash.',
      'There’s a subtler point too, called <strong>sequence of returns</strong>: a big drop early, while you’re still adding money, can actually help a long-term investor (you buy more while prices are low). The same drop right when you’re about to withdraw is much more damaging. A 20% fall means something different at 25 than at 60 — not because the market changed, but because your <em>timeline</em> did.'
    ],
    chart: 'volatility',
    example: 'In early 2020, global markets fell sharply in a matter of weeks. An investor five years from retirement who panic-sold turned a paper dip into a real, permanent loss. A 30-year-old who kept their monthly contributions going bought shares cheaply during the fall — and within a couple of years was ahead. Same event, opposite outcomes, driven by time horizon and behaviour, not stock-picking.',
    checks: [
      { q: 'What’s the difference between volatility and permanent loss?', a: 'Volatility is temporary price movement that can recover; permanent loss is money that doesn’t come back, often locked in by selling low or a total failure.' },
      { q: 'Why does the same 20% drop matter differently at 25 vs 60?', a: 'Time horizon: a young investor can wait for recovery (and may even benefit by buying cheap), while someone about to withdraw may not have time to recover.' }
    ]
  },
  {
    id: 3,
    pillar: 'Investing',
    emoji: '📈',
    title: 'The building blocks',
    coreIdea: 'A handful of basic instruments — shares, bonds, funds, ETFs and index funds — cover most of what beginners ever need, and "just buy a broad index fund" is common advice for a reason.',
    reading: [
      'Let’s demystify the vocabulary.',
      'A <strong>share</strong> (or stock) is a tiny slice of ownership in a real company. If the company grows and profits, your slice can become more valuable; if it struggles, it can lose value. Owning one company means your outcome is tied entirely to that one company.',
      'A <strong>bond</strong> is essentially a loan you give to a government or company; in return they pay you interest and (usually) return your money at the end. Bonds are generally steadier than shares but tend to grow less over long periods.',
      'A <strong>fund</strong> is a basket: you and thousands of others pool money, and it’s spread across many investments at once. Instead of betting on one company, you own a small piece of many.',
      'An <strong>ETF</strong> (exchange-traded fund) is a fund you can buy and sell like a share, through most brokers. An <strong>index fund</strong> is a fund that simply tries to mirror a whole market — for example, "the largest companies in the world" — rather than paying someone to hand-pick winners.',
      'Here’s why "just buy the index" is such common advice: decades of evidence show that most professional stock-pickers <em>fail to beat</em> a simple broad index over the long run, and index funds cost far less in fees. So instead of trying to find the needle, you buy the whole haystack. It’s not exciting, and that’s rather the point.'
    ],
    chart: null,
    example: 'A "world index" ETF might hold shares in over 1,500 companies across dozens of countries in a single product. Buy it once, and you own a sliver of Apple, Nestlé, Toyota, and hundreds of businesses you’ve never heard of — automatically diversified, with no stock-picking required. If one company collapses, it’s a rounding error in your holding rather than a disaster.',
    checks: [
      { q: 'What’s the difference between a single share and an index fund?', a: 'A share is ownership in one company (all your risk on that one); an index fund spreads your money across a whole market at once.' },
      { q: 'Why is "just buy the index" common advice?', a: 'Most active stock-pickers don’t beat a broad index over time, and index funds are cheaper — so owning the whole market often beats trying to pick winners.' }
    ]
  },
  {
    id: 4,
    pillar: 'Investing',
    emoji: '📈',
    title: 'Diversification, fees & mistakes',
    coreIdea: 'Spreading money across many investments reduces risk without necessarily reducing long-term returns; small fees compound into big money; and most beginner damage is self-inflicted through predictable mistakes.',
    reading: [
      '<strong>Diversification</strong> is the one genuine "free lunch" in investing. If you own 500 companies and one goes bankrupt, you barely notice. If you own one company and it goes bankrupt, you’re wiped out. Spreading your money means no single failure can sink you — and historically it hasn’t meant giving up much growth. That’s why "don’t put all your eggs in one basket" is really a mathematical statement, not just a proverb.',
      '<strong>Fees</strong> are the quiet killer. Funds charge an annual fee (the "expense ratio"). It sounds trivial — what’s the difference between 0.1% and 1.5%? Over one year, almost nothing. But over 20–30 years of compounding, a 1.5% yearly fee can eat a <em>large</em> chunk of your final pot compared to a 0.1% fee — often tens of thousands of euros on a serious portfolio. Because fees compound against you exactly like returns compound for you, small percentages become huge sums over decades.',
      'Finally, the <strong>common mistakes</strong> that quietly hurt beginners:'
    ],
    list: [
      '<strong>Timing the market</strong> — trying to buy at the bottom and sell at the top. Almost nobody does this reliably, and missing just a few of the market’s best days badly hurts long-term returns.',
      '<strong>Chasing hot stocks or coins</strong> — buying whatever went up recently, which often means buying high right before it falls.',
      '<strong>Panic-selling</strong> — turning a temporary dip into a permanent loss by selling at the worst moment.'
    ],
    readingAfterList: [
      'Notice that all three are <em>behavioural</em>. The biggest threat to a beginner’s returns usually isn’t the market — it’s their own impulses.'
    ],
    chart: 'fees',
    example: 'Consider two identical portfolios growing at 7% a year for 30 years. One pays a 0.2% annual fee, the other 1.5%. That 1.3% yearly difference can translate into the higher-fee investor ending up with roughly a quarter to a third <em>less</em> money after three decades — same investments, same market, just fees quietly compounding in the background.',
    checks: [
      { q: 'Why is diversification called a "free lunch"?', a: 'It lowers your risk (no single failure can sink you) without historically giving up much long-term return.' },
      { q: 'Why do small fees matter so much over time?', a: 'Fees compound year after year just like returns, so a seemingly tiny percentage can cost a large share of your final pot over decades.' }
    ]
  },
  {
    id: 5,
    pillar: 'Investing',
    emoji: '📈',
    title: 'Choosing a tool & making your first investment',
    coreIdea: 'Different tools (broker, robo-advisor, bank) suit different people, and the mechanics of a first investment are simpler than they look once you see the steps.',
    reading: [
      'There’s no single "best" way to invest — there are trade-offs that suit different people.'
    ],
    list: [
      'A <strong>broker</strong> (or investing app) gives you direct access to buy funds, ETFs and shares yourself. Lowest cost, most control, but you make the decisions.',
      'A <strong>robo-advisor</strong> asks you a few questions and then builds and manages a diversified portfolio for you automatically. More hands-off, slightly higher fees for the convenience.',
      'A <strong>bank’s</strong> investing product is the most familiar and simplest, but often the most expensive and most limited.'
    ],
    readingAfterList: [
      'Whichever you use, in the EU it matters that the provider is <strong>regulated</strong> (authorised by an EU national regulator) and that your assets sit under investor-protection schemes. Regulated, licensed, and boring is exactly what you want here.',
      'The <strong>mechanics</strong> of a first investment, step by step: open an account with your chosen provider; verify your identity (KYC — an ID check and some questions; a legal requirement, not a red flag); make a first deposit (often you can start small); place an order — a <strong>market order</strong> buys at the current price right now, a <strong>limit order</strong> only buys if the price hits a level you set, and <strong>fractional shares</strong> let you buy, say, €50 of a fund even if one unit costs more; then expect movement — in the first weeks, the value <em>will</em> wobble up and down, and that’s normal.',
      'The goal of a first investment isn’t to make money fast. It’s to get comfortable with the process and start the compounding clock.'
    ],
    chart: null,
    example: 'Someone opens a regulated broker account, passes the ID check in a day, deposits €100, and buys €100 of a low-cost world index ETF using a market order and fractional shares. Total decisions: one. A week later it’s worth €98; a week after that, €103. Nothing has gone wrong — they’ve simply started, and can now set up a small monthly automatic contribution and mostly leave it alone.',
    checks: [
      { q: 'What’s the main trade-off between a broker and a robo-advisor?', a: 'A broker is cheaper and gives you control but you decide; a robo-advisor manages it for you automatically for a somewhat higher fee.' },
      { q: 'What’s the difference between a market order and a limit order?', a: 'A market order buys at the current price immediately; a limit order only buys if the price reaches a level you set.' }
    ]
  },
  {
    id: 6,
    pillar: 'Crypto & blockchain',
    emoji: '₿',
    title: 'What blockchain & crypto actually are',
    coreIdea: 'A blockchain is a shared record that no single party controls; a cryptocurrency is an asset built on one — and understanding what it *is* (and isn’t) matters more than any price.',
    reading: [
      'Strip away the hype and a <strong>blockchain</strong> is surprisingly simple to describe: it’s a shared digital ledger — a record of who owns what — that’s copied across many computers at once, instead of being held by one bank or company. When something changes, the network agrees on the update, and past entries are extremely hard to alter. The headline idea is <em>no single owner</em>: no one company or government runs it, which is the whole point for its supporters and part of the risk for its critics.',
      'A <strong>cryptocurrency</strong> is an asset that lives on a blockchain. <strong>Bitcoin</strong> was the first — designed to be a scarce, fixed-supply digital asset, often compared (rightly or wrongly) to "digital gold." <strong>Ethereum</strong> added the ability to run small programs ("smart contracts"), which is what powers most of the wider crypto world.',
      'Here’s the honest part, and it’s important. Unlike a share, a crypto-asset usually represents <strong>no ownership of a business, no profits, and no cash flows</strong>. Its value comes from supply and demand — what others are willing to pay — and from belief in its future usefulness. That’s not a reason to dismiss it, but it <em>is</em> why it behaves very differently from stocks and can swing enormously.',
      'A few other terms you’ll meet: <strong>stablecoins</strong> try to hold a steady value (e.g. pegged to the euro or dollar); <strong>tokens</strong> are the huge, mixed category of everything else — some with real projects behind them, many with nothing at all. Being able to tell "a serious project" from "a logo and a promise" is a skill this course will keep building.'
    ],
    chart: null,
    example: 'Think of a blockchain like a shared Google Sheet that thousands of people hold identical copies of, where new rows can be added by agreement but old rows essentially can’t be edited or deleted — and no single person owns the document. Bitcoin is one such "sheet" tracking who holds how many bitcoin. That’s the core idea; everything else is detail.',
    checks: [
      { q: 'What’s the defining feature of a blockchain?', a: 'It’s a shared record copied across many computers with no single owner, where past entries are very hard to change.' },
      { q: 'How is a typical crypto-asset different from a share?', a: 'A share is ownership in a business with profits/cash flows; a crypto-asset usually has none of those — its value comes from supply, demand and belief.' }
    ]
  },
  {
    id: 7,
    pillar: 'Crypto & blockchain',
    emoji: '₿',
    title: 'Wallets, exchanges & staying safe',
    coreIdea: 'How you hold crypto (someone else’s custody vs. your own) is a real choice with real trade-offs — and crypto’s biggest beginner danger is often theft and scams, not price.',
    reading: [
      'In traditional investing, a regulated broker holds your assets and there are protection schemes if things go wrong. Crypto is different, and understanding <strong>custody</strong> is essential.',
      '<strong>Custodial (someone else holds it):</strong> you keep your crypto on an exchange, which holds the "keys" for you. Convenient and familiar — like an online account — but you’re trusting that platform. This is why we only ever mention <strong>MiCA-licensed</strong> exchanges: regulation reduces (never eliminates) that risk.',
      '<strong>Self-custody (you hold it):</strong> you hold your own keys in your own wallet. The phrase you’ll hear is <em>"not your keys, not your coins."</em> Full control — but full responsibility. Lose your secret recovery phrase and the money is gone forever; there’s no "forgot password" and no helpline that can restore it.',
      'Now the part that catches beginners most: <strong>security and scams.</strong> Crypto is a magnet for fraud because transactions are usually irreversible — once it’s sent, it’s gone. The common ones:'
    ],
    list: [
      '<strong>Seed-phrase theft</strong> — anyone who gets your 12–24 word recovery phrase can take everything. Never type it into a website or share it with "support." No legitimate service will ever ask for it.',
      '<strong>Fake support / impersonation</strong> — scammers posing as help staff in DMs, pointing you to fake sites.',
      '<strong>"Guaranteed returns"</strong> — anyone promising fixed or guaranteed crypto profits is running a scam. Full stop.',
      '<strong>Rug pulls</strong> — a shiny new token whose creators vanish with the money.'
    ],
    readingAfterList: [
      'The mindset that keeps beginners safe: slow down, assume unsolicited messages are hostile, and never let urgency rush you. Scammers <em>manufacture</em> urgency on purpose.'
    ],
    chart: null,
    example: 'A beginner gets a friendly DM from "official support" saying their wallet needs "verifying" — just enter your recovery phrase on this page. Entering it hands the scammer the keys, and the wallet is emptied within minutes, irreversibly. The red flag was simple and absolute: a recovery phrase is never entered anywhere except when restoring your own wallet, and never shared with anyone.',
    checks: [
      { q: 'What does "not your keys, not your coins" mean?', a: 'If someone else (like an exchange) holds your keys, you’re trusting them; only self-custody gives you full control — and full responsibility.' },
      { q: 'What should you do if "support" asks for your recovery phrase?', a: 'Never share it — it’s always a scam; a recovery phrase is only ever used to restore your own wallet.' }
    ]
  },
  {
    id: 8,
    pillar: 'Crypto & blockchain',
    emoji: '₿',
    title: 'Risk, reward & a sensible slice',
    coreIdea: 'Crypto is genuinely high-risk with no safety net, so people who choose to hold it typically keep it to a small, clearly-bounded slice they can afford to lose entirely.',
    reading: [
      'Let’s be straight about the risk, because honesty here is the whole point.',
      'Crypto is <strong>highly volatile</strong> — it’s normal for it to fall 50% or more, and individual tokens can and do go to <strong>zero</strong>. There’s generally <strong>no investor-compensation scheme</strong> like the ones that protect regulated stock investments, so if a platform fails or you’re defrauded, there may be no recourse. And the space is still young, lightly understood by most, and full of projects that won’t exist in a few years.',
      'None of that means crypto is "bad" — it means it belongs in a completely different mental box from your core long-term investments. The approach many thoughtful people use is a <strong>"core and satellite"</strong> idea: the bulk of their money sits in a boring, diversified core (like broad index funds), and only a <strong>small, bounded slice</strong> — an amount they could lose entirely without derailing their life — goes into higher-risk assets like crypto.',
      'How small is "small"? That’s personal, and this course won’t hand you a number — but the framing people often use is: <em>if this went to zero tomorrow, would it change my life?</em> If the answer is yes, the slice is too big. The rule <em>"only invest what you can afford to lose"</em> is a cliché everywhere else in finance; in crypto it’s meant literally.',
      'Two more habits that help: <strong>don’t chase</strong> whatever just went up (that’s usually how people buy high and sell low), and <strong>decide your slice in advance</strong> rather than topping it up emotionally every time there’s hype.'
    ],
    chart: 'slice',
    example: 'Someone with €10,000 invested decides their crypto satellite is 5% — €500 — held on a MiCA-licensed exchange, with the other €9,500 in a diversified index fund. If the crypto triples, nice bonus. If it goes to zero, it stings but changes nothing important. They chose the size <em>once</em>, in the cold light of day, and don’t add to it in a frenzy when prices are soaring.',
    riskNote: '⚠️ Crypto is high-risk. You can lose everything. Only ever use MiCA-licensed platforms.',
    checks: [
      { q: 'Why does crypto belong in a different "mental box" than core investments?', a: 'It’s far more volatile, can go to zero, and usually has no compensation scheme — so it’s held as a small bounded slice, not as the foundation.' },
      { q: 'What’s the practical test for whether a crypto slice is too big?', a: 'If losing it entirely would change your life, it’s too big; the amount should be one you can genuinely afford to lose.' }
    ]
  },
  {
    id: 9,
    pillar: 'Capstone',
    emoji: '🧭',
    title: 'One portfolio, both worlds & staying the course',
    coreIdea: 'Traditional investing and a bounded crypto slice can coexist in one simple plan, and long-term success is mostly about a few good habits repeated — not constant activity.',
    reading: [
      'You’ve now seen both worlds. The good news is they fit together without complexity, using ideas you already have.',
      'The <strong>core + satellite</strong> structure ties it together: a diversified, low-cost <strong>core</strong> (broad index funds/ETFs) does the long-term heavy lifting, and an optional, small, bounded <strong>satellite</strong> (individual picks, sector bets, or crypto) scratches the itch for engagement without putting the whole plan at risk. Your archetype leans this one way or another — a Cautious Starter might have no satellite at all; a Curious Diversifier holds a deliberately bounded one — but the <em>shape</em> is the same.',
      'Then it comes down to a handful of <strong>habits</strong>:'
    ],
    list: [
      '<strong>Dollar-cost averaging (DCA):</strong> invest a fixed amount on a regular schedule (say monthly), automatically. You stop trying to time the market and buy through both highs and lows.',
      '<strong>Rebalancing:</strong> occasionally (e.g. once a year) nudge things back toward your intended mix, so a surging satellite doesn’t quietly become an oversized risk.',
      '<strong>Check rarely.</strong> Counterintuitively, people who check their portfolio constantly tend to make <em>more</em> emotional mistakes. Boring is a feature.'
    ],
    readingAfterList: [
      'Finally, revisit your <strong>archetype every 6–12 months</strong> — not the market, <em>you</em>. As your life changes, the approach that fits you can shift too.',
      'The whole course really reduces to this: understand what you’re doing, keep costs low, diversify, size risk deliberately, automate the good habits, and then mostly get out of your own way and let time do the work.'
    ],
    chart: null,
    example: 'A Steady Builder sets up €200/month automatically into a world index fund (core) and €20/month into a MiCA-licensed exchange for a small crypto slice (satellite) — about 9% of contributions. They rebalance once a year, check the balance quarterly, and otherwise live their life. Ten years later, the boring monthly habit — not clever trades — is what did the work.',
    checks: [
      { q: 'What is the "core + satellite" idea?', a: 'A diversified low-cost core does the long-term work, while a small, bounded satellite (like crypto or individual picks) adds engagement without risking the whole plan.' },
      { q: 'Why is checking your portfolio less often often better?', a: 'Frequent checking tends to trigger emotional, ill-timed decisions; a set-and-mostly-forget approach lets the good habits and compounding work.' }
    ]
  },
  {
    id: 10,
    pillar: 'Bonus',
    emoji: '🎁',
    title: 'Before you invest: your safety net',
    coreIdea: 'Investing works best on top of a foundation — a small emergency buffer and paid-down high-interest debt — so a market dip never forces you to sell at the worst possible time.',
    reading: [
      'Everything in this course assumes the money you’re investing is money you won’t need on short notice. For a lot of beginners, that assumption isn’t true yet — and skipping this step is one of the most common reasons people abandon investing at the worst moment.',
      'An <strong>emergency fund</strong> is a cash buffer — commonly framed as a few months of essential expenses — held somewhere boring and accessible (a savings account, not the market). Its job isn’t to grow; it’s to exist so that a broken laptop, a medical bill, or a lost job doesn’t force you to sell investments during a downturn. Remember Lesson 2: a drop only becomes a permanent loss if you’re forced to sell into it. A safety net is what removes "forced."',
      '<strong>High-interest debt</strong> (credit cards are the classic example) usually charges more in interest than a diversified portfolio is expected to earn on average. Paying it down is, in effect, a guaranteed "return" equal to the interest rate you stop paying — which is why it commonly comes before investing, not after. Lower-interest debt (some mortgages, some student loans) is a more personal trade-off and less clear-cut.',
      'The common order people use, roughly: build a small starter buffer → pay off high-interest debt → build the full emergency fund → then invest consistently. It’s a sequence, not a rule carved in stone — but knowing it exists helps you make the trade-off consciously instead of by accident.'
    ],
    chart: null,
    example: 'Someone starts investing €200/month while still carrying a credit card balance charging 20% interest. A cheaper laptop breaks, they don’t have cash set aside, and they end up selling investments at a loss to cover it — while still paying 20% interest on the card. Redirecting that €200/month to the card first, then to a small cash buffer, then to investing, would have avoided both problems entirely.',
    checks: [
      { q: 'Why does an emergency fund matter for an investor specifically, not just in general?', a: 'It prevents being forced to sell investments during a downturn to cover an unexpected cost, which is what turns temporary volatility into a permanent loss.' },
      { q: 'Why does high-interest debt commonly come before investing?', a: 'Paying it off is close to a guaranteed return equal to the interest rate, which is often higher and far more certain than expected investment returns.' }
    ]
  },
  {
    id: 11,
    pillar: 'Bonus',
    emoji: '🎁',
    title: 'Stablecoins & DeFi, honestly',
    coreIdea: 'Stablecoins try to hold a steady value and act as crypto’s "plumbing"; DeFi rebuilds familiar financial products using smart contracts instead of a bank — both real, useful ideas, both carrying risks beginners regularly underestimate.',
    reading: [
      'Lesson 6 mentioned stablecoins in passing — here’s the honest detail.',
      'A <strong>stablecoin</strong> is a crypto-asset designed to hold a steady value, usually pegged to a currency like the euro or dollar. There are a few designs: <strong>fiat-collateralized</strong> (a company holds real euros/dollars in reserve for each coin issued — generally the most straightforward to understand), <strong>crypto-collateralized</strong> (backed by other crypto, over-collateralized to absorb swings), and <strong>algorithmic</strong> (trying to hold the peg through code and incentives rather than reserves). Being honest: algorithmic stablecoins have a track record of catastrophic failures — some have lost their peg entirely and gone to zero within days. "Stable" describes the intent, not a guarantee.',
      '<strong>DeFi</strong> (decentralized finance) uses smart contracts to recreate things a bank or broker normally does — lending, borrowing, trading one asset for another — without that intermediary. The appeal is access and transparency; the honest risks are real: <strong>smart contract bugs</strong> (a coding error can drain funds, and it has happened repeatedly across the industry), <strong>no compensation scheme</strong> if something goes wrong, and "<strong>yield</strong>" offers that are frequently just unregulated lending with hidden credit risk — a high advertised return isn’t free money, it’s compensation for a risk that isn’t always obvious.',
      'This course won’t point you toward specific stablecoins or DeFi platforms to use — the point here is understanding the shape of the thing, not a recommendation to use it. The same rules from Lessons 7 and 8 apply, only more so: understand what you’re using before you use it, and size any exposure as something you could fully lose.'
    ],
    chart: null,
    example: 'A fiat-backed stablecoin pegged to the dollar lets someone move value between exchanges quickly without converting back to euros each time — useful plumbing. Separately, an algorithmic stablecoin promising a high "stable" yield lost its peg over a weekend and became nearly worthless — a reminder that the word "stable" in the name is a design goal, not a fact.',
    checks: [
      { q: 'What’s the difference between a fiat-collateralized and an algorithmic stablecoin?', a: 'A fiat-collateralized one is backed by real currency held in reserve; an algorithmic one tries to hold its value through code and incentives alone, with a much worse track record of failure.' },
      { q: 'What’s a key risk of DeFi that doesn’t exist in regulated traditional finance?', a: 'Smart contract bugs can drain funds with no compensation scheme to fall back on; "yield" offers often hide credit risk rather than being free return.' }
    ]
  },
  {
    id: 12,
    pillar: 'Bonus',
    emoji: '🎁',
    title: 'Understanding taxes on your investments',
    coreIdea: 'Investment gains are usually taxed in some way, the rules vary a lot by country, and knowing the broad categories helps you avoid surprises — but this is general education, not tax advice for your specific situation.',
    reading: [
      'Taxes on investing tend to fall into a few broad categories, though exactly which apply — and how — depends entirely on where you live.',
      '<strong>Capital gains tax</strong> applies to the profit when you sell an investment for more than you paid. <strong>Dividend tax</strong> applies to income paid out by companies or funds you hold, sometimes withheld automatically before it reaches you. Some countries take a different approach entirely — the Netherlands, for example, has historically taxed a <em>deemed</em> return on your total wealth (including investments) rather than your actual realized gains, meaning the tax can apply whether or not you sold anything or the value dropped that year. Rules like this change periodically, so treat any specific figure you hear as something to verify at the time, not something to memorize here.',
      'The practical upshot for a beginner: most regulated brokers provide an annual overview or tax statement summarizing what you held and earned, which makes filing far simpler than tracking it yourself. It’s still worth understanding <em>why</em> the numbers on that statement matter before your first tax season arrives.',
      'This is a good moment to repeat the obvious but important caveat: <strong>this course explains categories, not your personal filing</strong> — for anything specific to your situation, your country’s tax authority or a qualified tax advisor is the right source, not a general course like this one.'
    ],
    chart: null,
    example: 'Someone sells a fund for a €2,000 profit after two years of holding it. Depending on where they live, that profit might be taxed as a capital gain when sold, or it might have already been taxed annually along the way as a deemed return on their wealth regardless of whether they sold — two genuinely different systems that call for checking local rules rather than assuming either applies.',
    checks: [
      { q: 'What’s the difference between a capital gains tax system and a "deemed return" wealth tax system, at a high level?', a: 'Capital gains tax applies to actual profit when you sell; a deemed-return system can tax an assumed return on your holdings each year regardless of whether you sold or what actually happened to the price.' },
      { q: 'Why does this course avoid giving specific tax figures or filing instructions?', a: 'Tax rules vary by country and change over time, and personal tax guidance depends on individual circumstances — exactly the kind of "for you specifically" territory this course stays out of; a tax authority or advisor is the right source.' }
    ]
  }
];

var CHARTS = {
  compounding: {
    caption: '7% is an illustrative long-run average, not a promise. The whole gap between the lines is compounding — same money in.',
    legend: '<span><i class="sw"></i>With 7% growth</span><span><i class="sw dash"></i>Deposits only (0%)</span>',
    svg: '<svg viewBox="0 0 680 300" role="img" aria-label="Line chart: money invested at 100 euro per month, deposits only versus with 7 percent growth, over 30 years">' +
      '<g stroke="var(--grid)" stroke-width="1">' +
      '<line x1="60" y1="56.9" x2="540" y2="56.9"/><line x1="60" y1="124.6" x2="540" y2="124.6"/>' +
      '<line x1="60" y1="192.3" x2="540" y2="192.3"/><line x1="60" y1="260" x2="540" y2="260"/>' +
      '</g>' +
      '<g class="axislbl" text-anchor="end">' +
      '<text x="52" y="61">€120k</text><text x="52" y="128.6">€80k</text>' +
      '<text x="52" y="196.3">€40k</text><text x="52" y="264">€0</text>' +
      '</g>' +
      '<g class="axislbl" text-anchor="middle">' +
      '<text x="60" y="278">0y</text><text x="220" y="278">10y</text>' +
      '<text x="380" y="278">20y</text><text x="540" y="278">30y</text>' +
      '</g>' +
      '<polyline points="60,260 540,199.1" fill="none" stroke="var(--slate)" stroke-width="2.5" stroke-dasharray="6 5" stroke-linecap="round"/>' +
      '<polyline points="60,260 140,247.9 220,230.7 300,206.4 380,171.7 460,122.8 540,53.2" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="540" cy="53.2" r="4.5" fill="var(--green)"/><circle cx="540" cy="199.1" r="4.5" fill="var(--slate)"/>' +
      '<text class="endlbl" x="550" y="50" fill="var(--green-deep)">€122k</text>' +
      '<text class="note" x="550" y="64">with 7% growth</text>' +
      '<text class="endlbl" x="550" y="196" fill="var(--slate)">€36k</text>' +
      '<text class="note" x="550" y="210">deposits only</text>' +
      '</svg>'
  },
  volatility: {
    caption: 'Same 20% fall — opposite outcomes. Selling at the bottom turns a temporary dip into a real loss; holding (or buying) rides it out.',
    legend: '',
    svg: '<svg viewBox="0 0 680 300" role="img" aria-label="Line chart: a market index rises, drops about 20 percent, then recovers above its previous peak">' +
      '<line x1="60" y1="131.7" x2="540" y2="131.7" stroke="var(--axis)" stroke-width="1.5" stroke-dasharray="4 5"/>' +
      '<text class="note" x="60" y="126">previous peak</text>' +
      '<polyline points="60,186.7 108,172 156,150 204,131.7 252,139 300,216 348,194 396,157.3 444,120.7 492,91.3 540,69.3" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="300" cy="216" r="6" fill="var(--amber)"/>' +
      '<text class="endlbl" x="300" y="238" text-anchor="middle" fill="var(--amber)">😱 sold here</text>' +
      '<text class="note" x="300" y="252" text-anchor="middle">loss locked in</text>' +
      '<circle cx="444" cy="120.7" r="6" fill="var(--green)"/>' +
      '<text class="endlbl" x="452" y="112" fill="var(--green-deep)">🧘 held on</text>' +
      '<text class="note" x="452" y="126">recovered above peak</text>' +
      '</svg>'
  },
  fees: {
    caption: '€10,000 invested for 30 years at the same 7% market return. The only difference is the annual fee — and it quietly took about a third.',
    legend: '',
    svg: '<svg viewBox="0 0 680 300" role="img" aria-label="Bar chart: 10,000 euro invested for 30 years, low fee ends at 76,400 euro, high fee ends at 51,900 euro">' +
      '<line x1="120" y1="260" x2="560" y2="260" stroke="var(--axis)" stroke-width="1.5"/>' +
      '<rect x="170" y="49.9" width="120" height="210.1" rx="5" fill="var(--green)"/>' +
      '<text class="endlbl" x="230" y="40" text-anchor="middle" fill="var(--green-deep)" style="font-size:15px">€76.4k</text>' +
      '<text class="axislbl" x="230" y="280" text-anchor="middle">Low fee · 0.2%</text>' +
      '<rect x="390" y="117.3" width="120" height="142.7" rx="5" fill="var(--amber)"/>' +
      '<text class="endlbl" x="450" y="107" text-anchor="middle" fill="var(--amber)" style="font-size:15px">€51.9k</text>' +
      '<text class="axislbl" x="450" y="280" text-anchor="middle">High fee · 1.5%</text>' +
      '<line x1="530" y1="49.9" x2="530" y2="117.3" stroke="var(--muted)" stroke-width="1.5"/>' +
      '<text class="note" x="538" y="87">≈ a third</text>' +
      '<text class="note" x="538" y="101">lost to fees</text>' +
      '</svg>'
  },
  slice: {
    caption: 'A bounded "core + satellite" split: the 5% is chosen once, deliberately, at a size you can afford to lose entirely.',
    legend: '',
    svg: '<svg viewBox="0 0 680 300" role="img" aria-label="Donut chart: 95 percent diversified core, 5 percent crypto that could go to zero">' +
      '<g transform="translate(150,150)">' +
      '<circle r="95" fill="none" stroke="var(--green)" stroke-width="42" stroke-dasharray="567 596.9" transform="rotate(-90)"/>' +
      '<circle r="95" fill="none" stroke="var(--amber)" stroke-width="42" stroke-dasharray="29.85 596.9" stroke-dashoffset="-567" transform="rotate(-90)"/>' +
      '<text x="0" y="-4" text-anchor="middle" style="font-size:30px;font-weight:800" fill="var(--ink)">95%</text>' +
      '<text x="0" y="18" text-anchor="middle" class="note">core</text>' +
      '</g>' +
      '<g transform="translate(300,110)">' +
      '<rect x="0" y="0" width="14" height="14" rx="3" fill="var(--green)"/>' +
      '<text x="24" y="12" style="font-size:14px" fill="var(--ink)">Diversified core — 95%</text>' +
      '<rect x="0" y="34" width="14" height="14" rx="3" fill="var(--amber)"/>' +
      '<text x="24" y="46" style="font-size:14px" fill="var(--ink)">Crypto — 5%</text>' +
      '<text x="24" y="64" class="note">high-risk · could go to zero</text>' +
      '</g>' +
      '</svg>'
  }
};
