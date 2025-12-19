/*
  Warnings:

  - You are about to drop the column `tags` on the `Snippet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "_SnippetTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SnippetTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SnippetTags_B_index" ON "_SnippetTags"("B");

-- AddForeignKey
ALTER TABLE "_SnippetTags" ADD CONSTRAINT "_SnippetTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SnippetTags" ADD CONSTRAINT "_SnippetTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
