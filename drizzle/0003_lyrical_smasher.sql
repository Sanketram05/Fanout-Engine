ALTER TABLE "commentary" ALTER COLUMN "api_event_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ALTER COLUMN "api_match_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "home_logo" text;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "away_logo" text;