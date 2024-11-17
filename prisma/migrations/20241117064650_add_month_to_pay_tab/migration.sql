/*
  Warnings:

  - Added the required column `month` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `month` VARCHAR(191) NOT NULL;
