"use server";
import { sql, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { db } from "@/server/db";
import { revenueTable } from "@/server/db/schema";

type PaymentData = {
  creditCard: number;
  debitCard: number;
  moneyTransfer: number;
  qrCode: number;
  cash: number;
};

export async function addRevenue(paymentData: PaymentData, date: Date) {
  try {
    const formattedDate = format(date, "yyyy-MM-dd");

    // Check if an entry for this date already exists
    const existingEntries = await db
      .select()
      .from(revenueTable)
      .where(sql`DATE(${revenueTable.date}) = ${formattedDate}`);

    if (existingEntries.length > 0) {
      return {
        success: false,
        error: `Revenue for ${formattedDate} already exists. Delete the existing entry first if you want to replace it.`,
      };
    }

    await db.insert(revenueTable).values({
      date: date,
      creditCard: paymentData.creditCard.toString(),
      debitCard: paymentData.debitCard.toString(),
      moneyTransfer: paymentData.moneyTransfer.toString(),
      qrCode: paymentData.qrCode.toString(),
      cash: paymentData.cash.toString(),
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to add revenue:", error);
    return { success: false, error: "Failed to add revenue" };
  }
}

export async function getRevenueData() {
  const data = await db.select().from(revenueTable).orderBy(revenueTable.date);
  return data;
}

export async function deleteRevenueEntry(id: number) {
  try {
    await db.delete(revenueTable).where(eq(revenueTable.id, id));
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete revenue entry:", error);
    return { success: false, error: "Failed to delete revenue entry" };
  }
}
