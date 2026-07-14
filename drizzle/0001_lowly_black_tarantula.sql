ALTER TABLE "knowledge_items" ADD COLUMN IF NOT EXISTS "embedding" vector(1536);--> statement-breakpoint
ALTER TABLE "knowledge_items" ADD COLUMN IF NOT EXISTS "archived_at" timestamp;
