-- CreateTable
CREATE TABLE "GeneExpressionRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT,
    "fileHash" TEXT NOT NULL,
    "genes" INTEGER NOT NULL,
    "samples" INTEGER NOT NULL,
    "meanExpr" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneExpressionRun_fileHash_key" ON "GeneExpressionRun"("fileHash");
