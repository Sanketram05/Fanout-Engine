ALTER TABLE "matches" ADD COLUMN "api_match_id" integer;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_api_match_id_unique" UNIQUE("api_match_id");