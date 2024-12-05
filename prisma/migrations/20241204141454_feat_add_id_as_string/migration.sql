/*
  Warnings:

  - The primary key for the `studentregistertoken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `token` on the `studentregistertoken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `studentregistertoken` DROP PRIMARY KEY,
    DROP COLUMN `token`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
