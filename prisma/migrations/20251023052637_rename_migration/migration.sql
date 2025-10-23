SET @EMPTY_GUID = '00000000-0000-0000-0000-000000000000';
SET @UNKNOWN_COMPANY_ID = UUID();

-- CreateTable
CREATE TABLE `employees` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert Companies
INSERT INTO `companies` (`id`, `name`, `created_at`)
VALUES (@UNKNOWN_COMPANY_ID, 'UNKNOWN', NOW());

-- Insert Employees
INSERT INTO `employees` (`id`, `company_id`, `user_id`, `created_at`)
SELECT UUID(), @UNKNOWN_COMPANY_ID, `user_id`, NOW() FROM `survey_responses`;

-- AlterTable
ALTER TABLE `survey_responses`
    RENAME COLUMN `user_id` TO `employee_id`;

UPDATE `survey_responses`
    SET `employee_id` = @EMPTY_GUID;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
