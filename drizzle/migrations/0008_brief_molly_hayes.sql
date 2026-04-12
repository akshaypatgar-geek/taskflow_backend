CREATE TYPE "public"."taskStatusEnum" AS ENUM('OPEN', 'IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "task_status" "taskStatusEnum" DEFAULT 'OPEN' NOT NULL;