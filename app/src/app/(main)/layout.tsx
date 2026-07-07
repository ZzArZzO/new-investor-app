import type { ReactNode } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { AppToast } from "@/components/ui/toast";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-140 flex-col">
      <TopBar />
      <main className="flex-1 px-4 pb-24">{children}</main>
      <BottomTabBar />
      <AppToast />
    </div>
  );
}
