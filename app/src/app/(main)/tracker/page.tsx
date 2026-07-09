import { PortfolioTracker } from "@/components/tracker/portfolio-tracker";
import { LockedCard } from "@/components/plus/locked-card";

export default function TrackerPage() {
  return (
    <div className="flex flex-col gap-3.5 pt-1">
      <div>
        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight">Your portfolio</h1>
        <p className="mt-1 text-[15px] text-muted-foreground">
          A private, manual way to track what you&rsquo;ve put in and keep the monthly habit going. You enter the numbers —
          nothing is connected and no prices are fetched.
        </p>
      </div>
      <PortfolioTracker />
      <LockedCard
        title="Portfolio insights"
        description="See the fees you're paying and how far your mix has drifted from the targets you set — computed on your own numbers, never a recommendation."
        feature="tracker_insights"
      />
      <p className="mt-2 px-1.5 pb-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. The app fetches no prices and gives no recommendations.
      </p>
    </div>
  );
}
