/*
  Warnings:

  - You are about to drop the `_SnippetTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_userId_fkey";

-- DropForeignKey
ALTER TABLE "_SnippetTags" DROP CONSTRAINT "_SnippetTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_SnippetTags" DROP CONSTRAINT "_SnippetTags_B_fkey";

-- DropIndex
DROP INDEX "Snippet_collectionId_idx";

-- DropIndex
DROP INDEX "Snippet_userId_idx";

-- DropTable
DROP TABLE "_SnippetTags";

-- CreateTable
CREATE TABLE "SnippetTag" (
    "id" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SnippetTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SnippetTag_snippetId_idx" ON "SnippetTag"("snippetId");

-- CreateIndex
CREATE INDEX "SnippetTag_tagId_idx" ON "SnippetTag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "SnippetTag_snippetId_tagId_key" ON "SnippetTag"("snippetId", "tagId");

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetTag" ADD CONSTRAINT "SnippetTag_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetTag" ADD CONSTRAINT "SnippetTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
