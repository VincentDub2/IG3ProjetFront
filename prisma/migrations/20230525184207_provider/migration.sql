/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Listing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sessionToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `Favorite` DROP FOREIGN KEY `Favorite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Listing` DROP FOREIGN KEY `Listing_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_listingId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_userId_fkey`;

-- AlterTable
ALTER TABLE `Account` DROP PRIMARY KEY,
    DROP COLUMN `_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL,
    MODIFY `id_token` TEXT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` ADD COLUMN `activityLevel` ENUM('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active') NULL,
    ADD COLUMN `age` INTEGER NULL,
    ADD COLUMN `dailyCalories` INTEGER NULL,
    ADD COLUMN `dailyCarbs` INTEGER NULL,
    ADD COLUMN `dailyFat` INTEGER NULL,
    ADD COLUMN `dailyProtein` INTEGER NULL,
    ADD COLUMN `gender` ENUM('male', 'female') NULL,
    ADD COLUMN `goalType` ENUM('lose_weight', 'gain_weight', 'maintain_weight') NULL,
    ADD COLUMN `percentageCarbs` INTEGER NOT NULL DEFAULT 20,
    ADD COLUMN `percentageFat` INTEGER NOT NULL DEFAULT 40,
    ADD COLUMN `percentageProtein` INTEGER NOT NULL DEFAULT 40,
    ADD COLUMN `salt` VARCHAR(191) NULL,
    ADD COLUMN `sessionToken` VARCHAR(191) NULL,
    ADD COLUMN `targetWeight` INTEGER NULL;

-- DropTable
DROP TABLE `Favorite`;

-- DropTable
DROP TABLE `Listing`;

-- DropTable
DROP TABLE `Reservation`;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `brandId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `calories` DOUBLE NOT NULL,
    `protein` DOUBLE NOT NULL,
    `fat` DOUBLE NOT NULL,
    `carbs` DOUBLE NOT NULL,
    `sugar` DOUBLE NULL,
    `fiber` DOUBLE NULL,
    `salt` DOUBLE NULL,
    `servingSize` INTEGER NOT NULL DEFAULT 100,
    `vitamins` VARCHAR(191) NULL,
    `minerals` VARCHAR(191) NULL,
    `allergens` VARCHAR(191) NULL,
    `foodCategory` VARCHAR(191) NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavori` (
    `_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `food_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserFavori_user_id_food_id_key`(`user_id`, `food_id`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meal` (
    `_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `meal_type` ENUM('breakfast', 'lunch', 'dinner', 'snack') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Meal_user_id_meal_type_createdAt_key`(`user_id`, `meal_type`, `createdAt`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealFood` (
    `_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `foodId` VARCHAR(191) NOT NULL,
    `mealId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_sessionToken_key` ON `User`(`sessionToken`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavori` ADD CONSTRAINT `UserFavori_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavori` ADD CONSTRAINT `UserFavori_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealFood` ADD CONSTRAINT `MealFood_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealFood` ADD CONSTRAINT `MealFood_mealId_fkey` FOREIGN KEY (`mealId`) REFERENCES `Meal`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
