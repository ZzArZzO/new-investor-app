CREATE TABLE "subscription" (
	"userId" text PRIMARY KEY NOT NULL,
	"stripeCustomerId" text NOT NULL,
	"stripeSubscriptionId" text,
	"status" text NOT NULL,
	"priceId" text,
	"currentPeriodEnd" timestamp,
	"cancelAtPeriodEnd" boolean DEFAULT false NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;