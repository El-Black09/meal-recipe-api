-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "cook_time" TEXT NOT NULL,
    "servings" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "favorites_user_id_idx" ON "favorites"("user_id");

-- CreateIndex
CREATE INDEX "favorites_recipe_id_idx" ON "favorites"("recipe_id");

-- CreateIndex
CREATE INDEX "favorites_created_at_idx" ON "favorites"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_recipe_id_key" ON "favorites"("user_id", "recipe_id");
