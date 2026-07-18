/**
 * Daily masthead quotes. Editorial selection criteria: patience, behaviour,
 * diversification, humility. Never price predictions, never "buy X" calls.
 */
export interface DailyQuote {
  text: string;
  author: string;
}

export const QUOTES: DailyQuote[] = [
  {
    text: "The individual investor should act consistently as an investor and not as a speculator.",
    author: "Benjamin Graham",
  },
  {
    text: "Time is your friend; impulse is your enemy.",
    author: "John C. Bogle",
  },
  {
    text: "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
  },
  {
    text: "The big money is not in the buying and selling, but in the waiting.",
    author: "Charlie Munger",
  },
  {
    text: "The investor's chief problem, and even his worst enemy, is likely to be himself.",
    author: "Benjamin Graham",
  },
  {
    text: "Don't look for the needle in the haystack. Just buy the haystack.",
    author: "John C. Bogle",
  },
  {
    text: "If owning stocks is a long-term project for you, following their changes constantly is a very, very bad idea.",
    author: "Daniel Kahneman",
  },
  {
    text: "Doing well with money has a little to do with how smart you are and a lot to do with how you behave.",
    author: "Morgan Housel",
  },
  {
    text: "Know what you own, and know why you own it.",
    author: "Peter Lynch",
  },
  {
    text: "Someone's sitting in the shade today because someone planted a tree a long time ago.",
    author: "Warren Buffett",
  },
  {
    text: "Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas.",
    author: "Paul Samuelson",
  },
  {
    text: "In the short run, the market is a voting machine, but in the long run, it is a weighing machine.",
    author: "Benjamin Graham",
  },
];
