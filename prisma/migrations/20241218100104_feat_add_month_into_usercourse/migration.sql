/*
  Warnings:

  - Added the required column `month` to the `UserCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usercourse` ADD COLUMN `month` VARCHAR(191) NOT NULL;
