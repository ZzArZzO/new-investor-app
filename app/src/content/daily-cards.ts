import type { DailyCard } from "./types";

// Daily true/false questions, rotated deterministically by date.
export const DAILY_CARDS: DailyCard[] = [
  {
    q: 'Cash sitting idle for 20 years is "safe" because the number never drops.',
    a: false,
    why: "Inflation quietly erodes what that cash can buy, doing nothing is a slow, invisible loss.",
  },
  {
    q: "A 20% drop matters far less to a 25-year-old with a long time horizon than to someone retiring next year.",
    a: true,
    why: "With decades to recover, volatility is mostly noise; near retirement it can be a real problem.",
  },
  {
    q: "Most professional stock-pickers beat a broad, low-cost index fund over the long run.",
    a: false,
    why: 'Most do not, which is why "just buy the index" is such common advice.',
  },
  {
    q: "A 1.5% yearly fee versus 0.2% can quietly cost you a third of your final pot over decades.",
    a: true,
    why: "Small fees compound against you year after year.",
  },
  {
    q: "A legitimate support agent might ask for your recovery phrase to help fix your wallet.",
    a: false,
    why: "Never. The recovery phrase IS the wallet, no real service ever asks for it.",
  },
  {
    q: "Diversification lowers risk without giving up much long-term return.",
    a: true,
    why: "It is the closest thing to a free lunch in investing.",
  },
  {
    q: "A typical crypto-asset represents ownership of a business with profits, like a share does.",
    a: false,
    why: "Most have no business or cash flows, value comes from supply, demand and belief.",
  },
  {
    q: '"Only invest what you can afford to lose" is the literal rule for a crypto slice, not a cliché.',
    a: true,
    why: "There is generally no compensation scheme; the slice should be small and bounded.",
  },
  {
    q: "Checking your portfolio constantly tends to improve your returns.",
    a: false,
    why: "Frequent checking usually triggers emotional, ill-timed decisions.",
  },
  {
    q: "Dollar-cost averaging means investing a fixed amount on a schedule, whatever the price.",
    a: true,
    why: "It turns investing into a boring, automatic habit, which is the point.",
  },
  {
    q: "It's smart to start investing before paying off a credit card charging 16%.",
    a: false,
    why: "Clearing expensive debt is the one guaranteed 'return', no investment reliably beats it.",
  },
  {
    q: "An emergency fund exists so a surprise expense never forces you to sell investments at a bad moment.",
    a: true,
    why: "It's the buffer that lets your investments ride out bad markets untouched.",
  },
  {
    q: "The most reliable way to invest monthly is to transfer whatever is left at the end of the month.",
    a: false,
    why: "'What's left' is usually nothing. Pay yourself first, on payday, automatically.",
  },
  {
    q: "Losing €100 typically feels about twice as intense as winning €100 feels good.",
    a: true,
    why: "That's loss aversion, and it's why people panic-sell at the bottom.",
  },
  {
    q: "If a coin is all over social media because it went up, that's usually a great time to buy.",
    a: false,
    why: "Peak attention tends to be peak price, if you heard about it because it rose, you're late.",
  },
  {
    q: "Social feeds show winners and hide losers, making risky bets look safer than they are.",
    a: true,
    why: "Survivorship bias: thousands of quiet losses stand behind every viral win.",
  },
  {
    q: "“It was €80 and now it's €50, so it must be a bargain.”",
    a: false,
    why: "That's anchoring. The old price isn't evidence, things that fall often fall further.",
  },
  {
    q: "A lucky first win is a reliable sign you have a talent for picking investments.",
    a: false,
    why: "Mistaking luck for skill is how small early wins turn into big later losses.",
  },
  {
    q: "Urgency (countdowns, 'last chance', deadlines) is a red flag in any investment pitch.",
    a: true,
    why: "Long-term investing has no deadline. Only sellers need you to hurry.",
  },
  {
    q: "Your savings rate matters more for reaching financial independence than your investment returns.",
    a: true,
    why: "Saving more grows the pot AND shrinks the pot you need, a double effect you control.",
  },
  {
    q: "The 4% rule is a guarantee that your money will last 30 years.",
    a: false,
    why: "It's a rough compass built on past US data, useful for a ballpark, not a promise.",
  },
  {
    q: "Your rough financial-independence number is about 25 times your yearly spending.",
    a: true,
    why: "That's the 4% rule flipped around: spending, not salary, sets the target.",
  },
  {
    q: "Starting to invest at 25 instead of 35 makes only a small difference by retirement.",
    a: false,
    why: "At ~7%, money doubles roughly every decade, an extra decade can outweigh years of contributions.",
  },
  {
    q: "A REIT ETF lets you own slices of hundreds of buildings for the price of one share.",
    a: true,
    why: "Diversified, liquid real estate, without tenants calling at midnight.",
  },
  {
    q: "House prices only go up.",
    a: false,
    why: "Several European markets fell 20%+ after 2008; parts of Japan never regained 1990 peaks. Everything cycles.",
  },
  {
    q: "REITs are immune to stock-market crashes because they hold real buildings.",
    a: false,
    why: "They trade like stocks, and fell harder than the broad market in 2008.",
  },
  {
    q: "The home you live in pays you rent, so it should be treated as your portfolio.",
    a: false,
    why: "It's shelter first: it costs maintenance and taxes, and you can't sell the kitchen in a dip.",
  },
  {
    q: "A recovery phrase belongs on paper in two safe places, never in a photo or cloud note.",
    a: true,
    why: "Anything digital can be phished or read by malware. Paper can't be hacked remotely.",
  },
  {
    q: "You should test restoring a wallet from your backup before sending real money to it.",
    a: true,
    why: "An untested backup might not work, and self-custody has no support line to call.",
  },
  {
    q: "A crypto yield is fundamentally a payment for a risk, even when the risk isn't obvious.",
    a: true,
    why: "If you can't name the risk behind the %, you are the risk.",
  },
  {
    q: "A platform being licensed makes its high-yield 'earn' products risk-free.",
    a: false,
    why: "Licensing covers how a platform operates, not the risk inside its products. No deposit guarantee either.",
  },
  {
    q: "In DeFi, the smart-contract code is effectively your counterparty, with no fraud department.",
    a: true,
    why: "No bank, no reversals, no compensation scheme. The code is the deal.",
  },
  {
    q: "The highest DeFi yields tend to sit exactly where the risks are thickest.",
    a: true,
    why: "Terra paid ~20% on its 'stable' coin right up until $40bn evaporated in a week.",
  },
  {
    q: "A 4% staking reward means you're up 4%, whatever happens to the coin's price.",
    a: false,
    why: "Rewards are paid in the same volatile asset, 4% yield means little if the coin halves.",
  },
  {
    q: "An expense ratio of 1.5% instead of 0.2% can quietly eat about a third of your final pot.",
    a: true,
    why: "Small fees compound against you for decades.",
  },
  {
    q: "A market order buys at the current price; a limit order waits for the price you set.",
    a: true,
    why: "Two different tools, one takes the market's price, one insists on yours.",
  },
  {
    q: "Rebalancing means selling everything when markets look risky.",
    a: false,
    why: "It's occasionally trimming what grew too big so your risk stays where you intended.",
  },
  {
    q: "A world index ETF can hold over 1,500 companies in a single product.",
    a: true,
    why: "One buy, automatic diversification across dozens of countries.",
  },
  {
    q: "If 'support' DMs you first and asks to screen-share your wallet, it's a scam.",
    a: true,
    why: "Real support never DMs first and never needs to watch you type a recovery phrase.",
  },
  {
    q: "Missing one day always resets your learning streak to zero here.",
    a: false,
    why: "A banked streak freeze bridges a single missed day automatically. Earn them by showing up.",
  },
  {
    q: "The KID's 1–7 number is a quality rating, higher means a better fund.",
    a: false,
    why: "It's a risk scale, not a rating. A 6 isn't better than a 4, it swings harder.",
  },
  {
    q: "If your EU broker goes bankrupt, your segregated ETF shares are typically still yours.",
    a: true,
    why: "Client assets are held apart from the broker's own and usually transfer to another broker.",
  },
  {
    q: "The €20k investor compensation scheme refunds you when your investments lose value.",
    a: false,
    why: "It covers missing assets when a firm fails, never ordinary market losses.",
  },
  {
    q: "With 10× leverage, a 10% move against you wipes out your whole stake.",
    a: true,
    why: "Leverage multiplies both directions, normal volatility becomes fatal.",
  },
  {
    q: "EU CFD platforms must publish the share of their retail clients who lose money.",
    a: true,
    why: "ESMA found 74–89% of retail CFD accounts lose, the warning is mandatory.",
  },
  {
    q: "Checking your projected state pension and employer matching comes before DIY pension investing.",
    a: true,
    why: "Employer matching is unclaimed salary, usually the best deal available to you.",
  },
  {
    q: "Before moving crypto, you should send a small test amount and confirm it arrives.",
    a: true,
    why: "Transfers are irreversible, the small test defeats wrong-network and wrong-address losses.",
  },
  {
    q: "Sending a token on the wrong network is easily reversed by support.",
    a: false,
    why: "Wrong-network transfers can be gone for good; recovery is 'best effort' at most. Match networks on both sides.",
  },
  {
    q: "Keeping meaningful crypto amounts in a hot wallet is the recommended default.",
    a: false,
    why: "Hot = keys online = attack surface. Spending amounts hot, anything meaningful cold.",
  },
  {
    q: "Bitcoin's 21-million cap guarantees its price can only rise.",
    a: false,
    why: "Scarcity makes something limited, not valuable; demand and belief still do the work.",
  },
  {
    q: "A 'stablecoin' held up only by an algorithm has collapsed to nearly zero before.",
    a: true,
    why: "Terra went from 'stable' to almost nothing in a week in 2022, erasing ~$40 billion.",
  },
  {
    q: "The best time to decide what you'll do in a crash is during the crash, when you have the most information.",
    a: false,
    why: "In a drawdown your brain is compromised. The plan gets written in calm weather.",
  },
  {
    q: "Copy-trading leaders usually earn from how many people copy them, not from whether those people profit.",
    a: true,
    why: "Volume-based fees reward flashy trading over the boring kind that works.",
  },
  {
    q: "Anyone can legally give personal investment advice online if they're confident enough.",
    a: false,
    why: "Personal advice requires authorisation, every national regulator has a public register you can search.",
  },
  {
    q: "A world ETF bought in euros can fall even while US markets rise.",
    a: true,
    why: "It's ~60–70% dollar assets, a falling dollar can eat the market's gains in euro terms.",
  },
  {
    q: "A realistic video of a famous investor endorsing a platform is good evidence the platform is legitimate.",
    a: false,
    why: "Deepfakes made video worthless as proof. Verify on the person's official channels and the regulator's register instead.",
  },
  {
    q: "AI made scams cheaper to produce, but the classic tells (guarantees, urgency, unsolicited contact) still give them away.",
    a: true,
    why: "AI changed the production quality, not the business model. Verification beats detection.",
  },
  {
    q: "Since July 2026, a crypto exchange without MiCA authorisation can keep serving EU customers legally.",
    a: false,
    why: "The transition period ended on 1 July 2026. Unlicensed firms must wind down or block EU users.",
  },
  {
    q: "A prediction-market bet can compound over time like an index fund.",
    a: false,
    why: "Event contracts pay all-or-nothing and expire. There's no productive asset and nothing compounds.",
  },
  {
    q: "An AI chatbot giving financial answers carries the same legal duties as a licensed adviser.",
    a: false,
    why: "No licence, no liability, no register entry, no ombudsman. Use it to understand, never to decide alone.",
  },
];
