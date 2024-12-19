/*
  Warnings:

  - You are about to drop the column `createdy` on the `course` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `createdy`,
    ADD COLUMN `createdBy` INTEGER NOT NULL;
