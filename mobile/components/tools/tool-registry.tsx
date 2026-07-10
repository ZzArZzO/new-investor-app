import type { ComponentType } from "react";
import type { ToolId } from "@/content/types";
import { AllocationDonut } from "@/components/tools/allocation-donut";
import { CompoundPlayground } from "@/components/tools/compound-playground";
import { FeeEroder } from "@/components/tools/fee-eroder";
import { PortfolioSandbox } from "@/components/tools/portfolio-sandbox";
import { ScamSpotter } from "@/components/tools/scam-spotter";

export const TOOL_COMPONENTS: Record<ToolId, ComponentType> = {
  compound: CompoundPlayground,
  fee: FeeEroder,
  scam: ScamSpotter,
  sandbox: PortfolioSandbox,
  allocation: AllocationDonut,
};
