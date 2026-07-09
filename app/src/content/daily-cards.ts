import type { DailyCard } from "./types";

// Daily true/false questions — rotated deterministically by date.
export const DAILY_CARDS: DailyCard[] = [
  {
    q: 'Cash sitting idle for 20 years is "safe" because the number never drops.',
    a: false,
    why: "Inflation quietly erodes what that cash can buy — doing nothing is a slow, invisible loss.",
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
    why: "Never. The recovery phrase IS the wallet — no real service ever asks for it.",
  },
  {
    q: "Diversification lowers risk without giving up much long-term return.",
    a: true,
    why: "It is the closest thing to a free lunch in investing.",
  },
  {
    q: "A typical crypto-asset represents ownership of a business with profits, like a share does.",
    a: false,
    why: "Most have no business or cash flows — value comes from supply, demand and belief.",
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
    why: "It turns investing into a boring, automatic habit — which is the point.",
  },
  {
    q: "It's smart to start investing before paying off a credit card charging 16%.",
    a: false,
    why: "Clearing expensive debt is the one guaranteed 'return' — no investment reliably beats it.",
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
    why: "That's loss aversion — and it's why people panic-sell at the bottom.",
  },
  {
    q: "If a coin is all over social media because it went up, that's usually a great time to buy.",
    a: false,
    why: "Peak attention tends to be peak price — if you heard about it because it rose, you're late.",
  },
  {
    q: "Social feeds show winners and hide losers, making risky bets look safer than they are.",
    a: true,
    why: "Survivorship bias: thousands of quiet losses stand behind every viral win.",
  },
  {
    q: "“It was €80 and now it's €50, so it must be a bargain.”",
    a: false,
    why: "That's anchoring. The old price isn't evidence — things that fall often fall further.",
  },
  {
    q: "A lucky first win is a reliable sign you have a talent for picking investments.",
    a: false,
    why: "Mistaking luck for skill is how small early wins turn into big later losses.",
  },
  {
    q: "Urgency — countdowns, 'last chance', deadlines — is a red flag in any investment pitch.",
    a: true,
    why: "Long-term investing has no deadline. Only sellers need you to hurry.",
  },
  {
    q: "Your savings rate matters more for reaching financial independence than your investment returns.",
    a: true,
    why: "Saving more grows the pot AND shrinks the pot you need — a double effect you control.",
  },
  {
    q: "The 4% rule is a guarantee that your money will last 30 years.",
    a: false,
    why: "It's a rough compass built on past US data — useful for a ballpark, not a promise.",
  },
  {
    q: "Your rough financial-independence number is about 25 times your yearly spending.",
    a: true,
    why: "That's the 4% rule flipped around — spending, not salary, sets the target.",
  },
  {
    q: "Starting to invest at 25 instead of 35 makes only a small difference by retirement.",
    a: false,
    why: "At ~7%, money doubles roughly every decade — an extra decade can outweigh years of contributions.",
  },
  {
    q: "A REIT ETF lets you own slices of hundreds of buildings for the price of one share.",
    a: true,
    why: "Diversified, liquid real estate — without tenants calling at midnight.",
  },
  {
    q: "House prices only go up.",
    a: false,
    why: "Dutch prices fell ~20% after 2008; parts of Japan never regained 1990 peaks. Everything cycles.",
  },
  {
    q: "REITs are immune to stock-market crashes because they hold real buildings.",
    a: false,
    why: "They trade like stocks — and fell harder than the broad market in 2008.",
  },
  {
    q: "The home you live in pays you rent, so it should be treated as your portfolio.",
    a: false,
    why: "It's shelter first: it costs maintenance and taxes, and you can't sell the kitchen in a dip.",
  },
  {
    q: "A recovery phrase belongs on paper in two safe places — never in a photo or cloud note.",
    a: true,
    why: "Anything digital can be phished or read by malware. Paper can't be hacked remotely.",
  },
  {
    q: "You should test restoring a wallet from your backup before sending real money to it.",
    a: true,
    why: "An untested backup might not work — and self-custody has no support line to call.",
  },
  {
    q: "A crypto yield is fundamentally a payment for a risk, even when the risk isn't obvious.",
    a: true,
    why: "If you can't name the risk behind the %, you are the risk.",
  },
  {
    q: "A platform being licensed makes its high-yield 'earn' products risk-free.",
    a: false,
    why: "Licensing covers how a platform operates — not the risk inside its products. No deposit guarantee either.",
  },
  {
    q: "In DeFi, the smart-contract code is effectively your counterparty — with no fraud department.",
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
    why: "Rewards are paid in the same volatile asset — 4% yield means little if the coin halves.",
  },
  {
    q: "An expense ratio of 1.5% instead of 0.2% can quietly eat about a third of your final pot.",
    a: true,
    why: "Small fees compound against you for decades.",
  },
  {
    q: "A market order buys at the current price; a limit order waits for the price you set.",
    a: true,
    why: "Two different tools — one takes the market's price, one insists on yours.",
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
];
