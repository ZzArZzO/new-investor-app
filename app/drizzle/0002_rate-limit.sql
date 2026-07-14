CREATE TABLE "rate_limit" (
	"key" text PRIMARY KEY NOT NULL,
	"windowStart" timestamp NOT NULL,
	"count" integer DEFAULT 1 NOT NULL
);
