ALTER TABLE "category" DROP CONSTRAINT "category_title_unique";--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "title" SET NOT NULL;