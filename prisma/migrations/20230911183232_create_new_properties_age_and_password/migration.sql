/*
  Warnings:

  - Added the required column `age` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
