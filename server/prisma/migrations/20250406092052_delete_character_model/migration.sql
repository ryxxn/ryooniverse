/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_characterId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "character" TEXT;

-- DropTable
DROP TABLE "Character";
