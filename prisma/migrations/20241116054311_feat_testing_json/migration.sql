/*
  Warnings:

  - You are about to alter the column `details` on the `course` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `course` MODIFY `details` JSON NULL;
