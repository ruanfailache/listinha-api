/*
  Warnings:

  - You are about to drop the column `product_id` on the `product_lists` table. All the data in the column will be lost.
  - Added the required column `name` to the `product_lists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_lists" DROP CONSTRAINT "product_lists_product_id_fkey";

-- AlterTable
ALTER TABLE "product_lists" DROP COLUMN "product_id",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "product_list_items" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_list_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_list_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_list_items" ADD CONSTRAINT "product_list_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_list_items" ADD CONSTRAINT "product_list_items_product_list_id_fkey" FOREIGN KEY ("product_list_id") REFERENCES "product_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
