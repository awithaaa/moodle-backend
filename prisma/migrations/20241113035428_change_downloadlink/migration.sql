/*
  Warnings:

  - You are about to drop the column `webContentLink` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `webViewLink` on the `file` table. All the data in the column will be lost.
  - Added the required column `downloadLink` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `webContentLink`,
    DROP COLUMN `webViewLink`,
    ADD COLUMN `downloadLink` VARCHAR(191) NOT NULL;
