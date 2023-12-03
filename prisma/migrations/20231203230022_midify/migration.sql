/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `token_contracts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `token_contracts` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `private_key` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "token_contracts" DROP COLUMN "deleted_at",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "deleted_at",
ALTER COLUMN "token_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deleted_at",
DROP COLUMN "private_key";
