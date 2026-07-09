import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  crons: [
    { path: "/api/cron/streak-warning", schedule: "0 18 * * *" },
    { path: "/api/cron/weekly-digest", schedule: "0 8 * * 1" },
  ],
};
