/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "cnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customers_cnpj_key" ON "customers"("cnpj");
