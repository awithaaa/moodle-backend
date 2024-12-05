-- CreateTable
CREATE TABLE `StudentRegisterToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `studentId` INTEGER NULL,
    `onSubmit` BOOLEAN NOT NULL DEFAULT false,
    `createdBy` INTEGER NOT NULL,

    UNIQUE INDEX `StudentRegisterToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
