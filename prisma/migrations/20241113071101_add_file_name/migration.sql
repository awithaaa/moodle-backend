/*
  Warnings:

  - You are about to drop the column `downloadLink` on the `file` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `downloadLink`,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL;
