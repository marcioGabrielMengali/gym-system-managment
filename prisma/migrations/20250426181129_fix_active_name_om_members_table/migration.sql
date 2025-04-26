/*
  Warnings:

  - You are about to drop the column `actieve` on the `members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "members" DROP COLUMN "actieve",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
