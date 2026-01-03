-- AlterTable
ALTER TABLE "GeneExpressionRun" ADD COLUMN "downregulatedGenes" INTEGER;
ALTER TABLE "GeneExpressionRun" ADD COLUMN "foldChangeData" TEXT;
ALTER TABLE "GeneExpressionRun" ADD COLUMN "upregulatedGenes" INTEGER;
