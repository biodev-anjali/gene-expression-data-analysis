-- AlterTable: Add species, datasetSource, and datasetId fields
-- These fields support species-based data discovery and tracking

ALTER TABLE "GeneExpressionRun" ADD COLUMN "species" TEXT;
ALTER TABLE "GeneExpressionRun" ADD COLUMN "datasetSource" TEXT;
ALTER TABLE "GeneExpressionRun" ADD COLUMN "datasetId" TEXT;

