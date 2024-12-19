/*
  Warnings:

  - Added the required column `createdy` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `createdy` INTEGER NOT NULL,
    ADD COLUMN `day` VARCHAR(191) NOT NULL,
    ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `level` VARCHAR(191) NOT NULL,
    ADD COLUMN `time` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
