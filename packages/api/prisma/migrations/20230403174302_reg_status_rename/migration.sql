/*
  Warnings:

  - The `registration_status` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRegistrationStatus" AS ENUM ('ACTIVATED', 'DEACTIVATED', 'UNVERIFIED');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "registration_status",
ADD COLUMN     "registration_status" "UserRegistrationStatus" NOT NULL DEFAULT 'UNVERIFIED';

-- DropEnum
DROP TYPE "UserStatus";
