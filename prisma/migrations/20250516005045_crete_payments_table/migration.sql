-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gym_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
