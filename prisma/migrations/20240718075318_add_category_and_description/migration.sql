-- This is an empty migration.
ALTER TABLE "Post" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'default-category';
ALTER TABLE "Post" ADD COLUMN "description" TEXT NOT NULL DEFAULT 'default-description';

