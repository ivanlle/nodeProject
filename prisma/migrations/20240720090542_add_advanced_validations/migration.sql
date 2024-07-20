/*
  Warnings:

  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `dni` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.
  - A unique constraint covering the columns `[dni]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "post" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "dni" SET DATA TYPE VARCHAR(9);

-- CreateIndex
CREATE UNIQUE INDEX "user_dni_key" ON "user"("dni");
