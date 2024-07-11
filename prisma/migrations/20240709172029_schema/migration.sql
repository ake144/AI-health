/*
  Warnings:

  - You are about to drop the column `dietary_suggestions` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_plan` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `expert_advice` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `potential_risks` on the `Recommendation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkUserId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recommendations` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recommendation" DROP COLUMN "dietary_suggestions",
DROP COLUMN "exercise_plan",
DROP COLUMN "expert_advice",
DROP COLUMN "potential_risks",
ADD COLUMN     "recommendations" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "clerkUserId" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_clerkUserId_key" ON "Users"("clerkUserId");
