import type { ComponentType } from "react";
import type { ToolId } from "@/content/types";
import { CompoundPlayground } from "@/components/tools/compound-playground";
import { FeeEroder } from "@/components/tools/fee-eroder";
import { ScamSpotter } from "@/components/tools/scam-spotter";
import { PortfolioSandbox } from "@/components/tools/portfolio-sandbox";
import { AllocationDonut } from "@/components/tools/allocation-donut";

export const TOOL_COMPONENTS: Record<ToolId, ComponentType> = {
  compound: CompoundPlayground,
  fee: FeeEroder,
  scam: ScamSpotter,
  sandbox: PortfolioSandbox,
  allocation: AllocationDonut,
};
