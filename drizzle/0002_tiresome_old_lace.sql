ALTER TABLE "commentary" ADD COLUMN "api_event_id" text;--> statement-breakpoint
ALTER TABLE "commentary" ADD CONSTRAINT "commentary_api_event_id_unique" UNIQUE("api_event_id");