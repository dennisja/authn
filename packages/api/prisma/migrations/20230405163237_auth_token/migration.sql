/*
  Warnings:

  - The primary key for the `user_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `user_profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuthTokenStatus" AS ENUM ('ACTIVE', 'REVOKED');

-- AlterTable
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "AuthToken" (
    "id" UUID NOT NULL,
    "token" VARCHAR NOT NULL,
    "status" "AuthTokenStatus" NOT NULL DEFAULT 'ACTIVE',
    "user_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
