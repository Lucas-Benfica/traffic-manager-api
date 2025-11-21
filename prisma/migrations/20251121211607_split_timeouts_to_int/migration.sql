/*
  Warnings:

  - You are about to drop the column `timeouts` on the `virtual_servers` table. All the data in the column will be lost.
  - Added the required column `timeoutClient` to the `virtual_servers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeoutConnect` to the `virtual_servers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeoutQueue` to the `virtual_servers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeoutServer` to the `virtual_servers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "virtual_servers" DROP COLUMN "timeouts",
ADD COLUMN     "timeoutClient" INTEGER NOT NULL,
ADD COLUMN     "timeoutConnect" INTEGER NOT NULL,
ADD COLUMN     "timeoutQueue" INTEGER NOT NULL,
ADD COLUMN     "timeoutServer" INTEGER NOT NULL;
