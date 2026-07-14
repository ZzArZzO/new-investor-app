import { pgTable, text, timestamp, jsonb, integer, boolean, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  name: text("name"),
  image: text("image"),
  // Null for Google-only accounts — password sign-in is opt-in per user.
  password: text("password"),
  // Basic brute-force guard for the Credentials provider (no external rate-limit infra yet).
  failedLoginAttempts: integer("failedLoginAttempts").notNull().default(0),
  lockedUntil: timestamp("lockedUntil", { mode: "date" }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (t) => [primaryKey({ columns: [t.provider, t.providerAccountId] })],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

/**
 * One row per user, jsonb mirror of the client AppState shape (see
 * content/types.ts). Deliberately not normalized — it's 1:1 with the user
 * and the client already treats it as a single blob (see app-state-transfer.ts).
 */
export const userAppState = pgTable("user_app_state", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  state: jsonb("state").notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  // "YYYY-MM-DD" idempotency guards for the retention cron jobs.
  streakWarningSentOn: text("streakWarningSentOn"),
  weeklyDigestSentOn: text("weeklyDigestSentOn"),
});

/**
 * Plus billing entitlement, one row per user. Written only by the Stripe
 * webhook/checkout flow (src/app/api/stripe/webhook, src/app/api/billing) —
 * never from client-writable state. See subscription-plan.md Phase B.
 */
export const subscriptions = pgTable("subscription", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeCustomerId: text("stripeCustomerId").notNull(),
  stripeSubscriptionId: text("stripeSubscriptionId"),
  status: text("status").notNull(),
  priceId: text("priceId"),
  currentPeriodEnd: timestamp("currentPeriodEnd", { mode: "date" }),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").notNull().default(false),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

/**
 * Fixed-window rate-limit counters (see src/lib/rate-limit.ts). DB-backed on
 * purpose: serverless instances share no memory, and this needs no extra
 * infrastructure. Key format: "<scope>:<identifier>", e.g. "register:1.2.3.4".
 */
export const rateLimits = pgTable("rate_limit", {
  key: text("key").primaryKey(),
  windowStart: timestamp("windowStart", { mode: "date" }).notNull(),
  count: integer("count").notNull().default(1),
});
