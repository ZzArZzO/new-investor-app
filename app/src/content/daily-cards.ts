import type { DailyCard } from "./types";

// Daily true/false questions, rotated deterministically by date.
//
// Editorial rule for this deck: tone must never predict the answer. True and
// false cards are deliberately written in both registers, statements that
// sound like overclaims but are documented facts, and statements that sound
// prudent but are wrong. Answers are also ordered in irregular runs, because
// daySeed produces near-sequential indices across a ten-day span.
export const DAILY_CARDS: DailyCard[] = [
  {
    q: "Over 15-year periods, more than 80% of active US fund managers have underperformed their benchmark index.",
    a: true,
    why: "Long-running scorecard studies show this repeatedly. Costs and competition make beating the index for 15 straight years genuinely rare.",
  },
  {
    q: "A limit order guarantees your order will execute.",
    a: false,
    why: "It guarantees the price, not the fill. If the market never reaches your price, the order simply never executes.",
  },
  {
    q: "Keeping money in a savings account protects its purchasing power.",
    a: false,
    why: "Savings interest usually trails inflation, so the balance quietly buys less each year. The number holds; the value leaks.",
  },
  {
    q: "A 1.5% yearly fee versus 0.2% can quietly cost you a third of your final pot over decades.",
    a: true,
    why: "Small fees compound against you year after year.",
  },
  {
    q: "Some years a broad stock market rises more than 25%.",
    a: true,
    why: "Big up years are as much a part of market history as big down years. The same volatility cuts both ways.",
  },
  {
    q: "The KID's 1–7 number is a quality rating, higher means a better fund.",
    a: false,
    why: "It's a risk scale, not a rating. A 6 isn't better than a 4, it swings harder.",
  },
  {
    q: "A common guideline for an emergency fund is about 3–6 months of essential expenses.",
    a: true,
    why: "The buffer exists so a surprise bill never forces you to sell investments at a bad moment.",
  },
  {
    q: "Checking your portfolio daily helps you catch problems early and improves results.",
    a: false,
    why: "Daily moves are close to a coin flip, and each red day stings roughly double. Frequent checking mostly manufactures ill-timed decisions.",
  },
  {
    q: "Because the 4% rule is built on historical data, it already accounts for fees, taxes and flexible spending.",
    a: false,
    why: "It mostly ignores all three, assumes exactly 30 years, and rests on one lucky market's past. A useful compass, not a contract.",
  },
  {
    q: "Your rough financial-independence number is about 25 times your yearly spending.",
    a: true,
    why: "That's the 4% rule flipped around: spending, not salary, sets the target.",
  },
  {
    q: "Some regulated brokers lend out their customers' shares to other traders.",
    a: true,
    why: "Securities lending is legal and disclosed in the account terms, often to short sellers. One more reason to actually read those terms.",
  },
  {
    q: "Rebalancing means moving money out of whatever fell.",
    a: false,
    why: "It's closer to the opposite: trimming what grew too large so your risk stays where you set it, which often means buying more of what fell.",
  },
  {
    q: "A market order buys at the current price; a limit order waits for the price you set.",
    a: true,
    why: "Two different tools, one takes the market's price, one insists on yours.",
  },
  {
    q: "You need a few thousand euros before starting to invest makes sense.",
    a: false,
    why: "Many brokers accept small monthly amounts or fractional shares. Overestimating the entry price is one of the main reasons people never start.",
  },
  {
    q: "At 2–3% inflation, cash loses roughly half its purchasing power over about 25 years.",
    a: true,
    why: "The account number never drops; the prices around it do the moving. That's the quiet cost of holding only cash for decades.",
  },
  {
    q: "Starting to invest at 25 instead of 35 makes only a small difference by retirement.",
    a: false,
    why: "At ~7%, money doubles roughly every decade, an extra decade can outweigh years of contributions.",
  },
  {
    q: "A diversified portfolio cannot lose value in a crash year.",
    a: false,
    why: "Diversification stops any single failure from sinking you, not the whole market falling. In a broad crash, nearly everything drops together for a while.",
  },
  {
    q: "€50,000 invested at 25 could be roughly €400,000 at 55 without another euro added.",
    a: true,
    why: "At an assumed 7% average return, money doubles roughly every decade, and three doublings turn 50 into 400. Illustrative math, not a promise.",
  },
  {
    q: "A world index ETF can hold over 1,500 companies in a single product.",
    a: true,
    why: "One buy, automatic diversification across dozens of countries.",
  },
  {
    q: "UCITS in a fund's name is a marketing label with no legal meaning.",
    a: false,
    why: "It's the EU regulatory standard for retail funds, with binding rules on diversification and custody built in.",
  },
  {
    q: "After 2008, house prices fell more than 30% in Spain and Ireland.",
    a: true,
    why: "The Netherlands fell roughly 20% too, and recovery took the better part of a decade. Property cycles like everything else.",
  },
  {
    q: "Like gold, Bitcoin has reliably acted as a safe haven when stock markets fall.",
    a: false,
    why: "In real selloffs it has often dropped alongside stocks. The scarcity is real; the safe-haven story is, so far, only sometimes true.",
  },
  {
    q: "A euro stablecoin from an authorised issuer is central-bank money, like cash.",
    a: false,
    why: "It's a claim on a private company's reserves. Only a digital euro from the central bank would be public money, and that doesn't exist yet.",
  },
  {
    q: "A 'stablecoin' held up only by an algorithm has collapsed to nearly zero before.",
    a: true,
    why: "Terra went from 'stable' to almost nothing in a week in 2022, erasing ~$40 billion.",
  },
  {
    q: "Ethereum's 2022 switch to proof of stake cut its energy use by roughly 99.9%.",
    a: true,
    why: "Validators locking coins replaced miners burning electricity. Proof-of-work chains like Bitcoin still run the energy-heavy model.",
  },
  {
    q: "Bitcoin's fixed 21-million cap means its price has to rise over time.",
    a: false,
    why: "A cap makes something limited, not valuable. Value still needs demand, and plenty of scarce things are worth nothing.",
  },
  {
    q: "A crypto platform paying around 17% 'yield' went bankrupt in 2022, taking customer funds with it.",
    a: true,
    why: "Celsius offered up to ~17% right up until the collapse. Yield is payment for a risk, and an unexplainable percentage is itself the warning.",
  },
  {
    q: "A high-yield 'earn' product on a licensed exchange has been vetted by the regulator for safety.",
    a: false,
    why: "Licensing covers how a platform operates: custody, complaints, honest marketing. The risk inside each product stays entirely yours, with no deposit guarantee behind it.",
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
    q: "Cash your broker parks in a money-market fund is covered by the €100,000 deposit guarantee.",
    a: false,
    why: "The deposit guarantee covers bank deposits only. Money-market holdings are protected differently, as segregated client assets.",
  },
  {
    q: "Bank deposits in the EU are guaranteed up to €100,000 per person per bank.",
    a: true,
    why: "That's the deposit guarantee scheme. It covers bank deposits specifically, not investments, and not crypto.",
  },
  {
    q: "With 10× leverage, a 10% move against you wipes out your whole stake.",
    a: true,
    why: "Leverage multiplies both directions, normal volatility becomes fatal.",
  },
  {
    q: "Copy trading lets a beginner reliably match the returns of top traders.",
    a: false,
    why: "Leaders typically earn from follower volume, not follower profits, and most copy platforms run on CFDs, where 74–89% of retail accounts lose.",
  },
  {
    q: "EU CFD platforms must publish the share of their retail clients who lose money.",
    a: true,
    why: "ESMA found 74–89% of retail CFD accounts lose, the warning is mandatory.",
  },
  {
    q: "A well-informed person can compound an edge in prediction markets the way an index investor compounds returns.",
    a: false,
    why: "Event contracts pay all or nothing and expire. There's no productive asset underneath, so there's nothing to compound.",
  },
  {
    q: "A 4% staking reward means you're up 4% for the year, whatever the coin's price does.",
    a: false,
    why: "Rewards arrive in the same volatile asset. If the coin halves, the extra 4% of it doesn't rescue the year.",
  },
  {
    q: "EU rules mean a retail CFD trader cannot end up owing the platform more than they deposited.",
    a: true,
    why: "Negative-balance protection is mandatory for EU retail accounts. The deposit itself can still vanish fast, which is what the loss statistics describe.",
  },
  {
    q: "The average investor in a fund often earns less than the fund itself returns.",
    a: true,
    why: "Money floods in after good years and flees after bad ones. The fund's return was fine; the timing behaviour ate the difference.",
  },
  {
    q: "A market crash early in retirement and one late in retirement damage a withdrawal plan about equally.",
    a: false,
    why: "Sequence matters. Selling shares to live on during an early crash removes the very shares that would have fuelled the recovery.",
  },
  {
    q: "Losing €100 typically feels about twice as intense as winning €100 feels good.",
    a: true,
    why: "That's loss aversion, and it's why people panic-sell at the bottom.",
  },
  {
    q: "Illustratively, saving half your income could put financial independence less than two decades away.",
    a: true,
    why: "A high savings rate works twice: it grows the pot faster and proves you need a smaller pot. Rough, assumption-heavy numbers, but the shape holds.",
  },
  {
    q: "Selling everything and rebuying at the new broker is the cautious way to switch providers.",
    a: false,
    why: "It can trigger an avoidable tax bill and time out of the market. An in-kind transfer moves the shares without selling them.",
  },
  {
    q: "You can get Bitcoin price exposure through an ordinary regulated broker, without a wallet or exchange account.",
    a: true,
    why: "Bitcoin ETPs trade on normal stock exchanges and sit in a portfolio like any other security. You give up holding the actual coins in exchange for simplicity.",
  },
  {
    q: "The US spot Bitcoin ETFs are available to EU retail investors through local brokers.",
    a: false,
    why: "EU fund rules require diversification, which rules out a single-asset ETF. The EU-accessible route is a Bitcoin ETP, a different wrapper.",
  },
  {
    q: "When the FTX exchange failed, roughly $8 billion in customer funds was missing.",
    a: true,
    why: "Crypto left on an exchange is an IOU, not ownership, and no deposit insurance stands behind it. That gap is what MiCA's segregation rules exist to close.",
  },
  {
    q: "Crypto held on a licensed EU exchange is insured much like a bank deposit.",
    a: false,
    why: "No deposit guarantee exists for crypto. Licensing requires segregating client assets, which improves the bankruptcy outcome but insures nothing.",
  },
  {
    q: "Since July 2026, a crypto exchange without MiCA authorisation can keep serving EU customers legally.",
    a: false,
    why: "The transition period ended on 1 July 2026. Unlicensed firms must wind down or block EU users.",
  },
  {
    q: "Since 2026, licensed crypto exchanges report EU customers' activity to national tax authorities automatically.",
    a: true,
    why: "The DAC8 rules make exchange reporting automatic, so record-keeping is no longer private or optional.",
  },
  {
    q: "In the EU, investments are only ever taxed when you sell.",
    a: false,
    why: "Several countries tax funds yearly even without a sale, on assumed or unrealized gains. The Netherlands and Germany both run versions of this.",
  },
  {
    q: "Swapping one cryptocurrency for another can trigger tax, even though no euros touched your account.",
    a: true,
    why: "Most EU countries treat a swap as selling the first coin. It's the crypto tax event beginners most often miss.",
  },
  {
    q: "An encrypted password manager is the recommended place to store a wallet recovery phrase.",
    a: false,
    why: "The standard advice is paper, in two safe places, and nothing digital at all. Anything online or synced can be phished or read by malware.",
  },
  {
    q: "You can buy an NFT and still not own the copyright to the image it points to.",
    a: true,
    why: "An NFT is a unique ledger entry, often linked to an image. The entry is yours; the legal rights to the work usually are not included.",
  },
  {
    q: "Connecting your wallet to a website exposes your seed phrase, which is how drainer scams work.",
    a: false,
    why: "Connecting reveals nothing by itself. Drainers work through the approval you sign afterwards, which can grant standing permission to move your tokens later.",
  },
  {
    q: "A world ETF bought in euros can fall even while US markets rise.",
    a: true,
    why: "It's ~60–70% dollar assets, a falling dollar can eat the market's gains in euro terms.",
  },
  {
    q: "Legitimate crypto airdrops sometimes ask for a small upfront payment to unlock your claim.",
    a: false,
    why: "Real airdrops never require payment. That single request is close to a guarantee you're looking at a scam.",
  },
  {
    q: "Only around a quarter of EU citizens hold any private pension product.",
    a: true,
    why: "Pillar 3 is the least used pillar. The gap between the state pension and your actual costs is what a monthly investing habit exists to close.",
  },
  {
    q: "AI chatbots are a poor tool for judging whether a message is a scam.",
    a: false,
    why: "Sanity-checking a suspicious pitch is one thing they do quite well. Where they fail is personal advice and product picks, delivered with unearned confidence.",
  },
  {
    q: "Broad markets dip 10% or more at some point in most years, including many that end positive.",
    a: true,
    why: "Double-digit dips are routine, and 20%+ bear markets arrive every handful of years. The long-term averages already include them.",
  },
  {
    q: "DeFi yields run high because smart contracts eliminate the risks banks are paid to carry.",
    a: false,
    why: "The risks are still there: bugs, hacks, collapses, drained pools. The highest yields sit exactly where those risks are thickest.",
  },
];
