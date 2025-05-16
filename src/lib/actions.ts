"use server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { db } from "@/server/db";
import { revenues, revenueItems } from "@/server/db/schema";
import { stackServerApp } from "@/stack";

type PaymentData = {
  creditCard: number;
  debitCard: number;
  moneyTransfer: number;
  qrCode: number;
  cash: number;
};

export async function addRevenue(paymentData: PaymentData, date: Date) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  try {
    const formattedDate = format(date, "yyyy-MM-dd");
    // Check if an entry for this date already exists
    const existingEntry = await db
      .select({
        id: revenues.id,
      })
      .from(revenues)
      .innerJoin(revenueItems, eq(revenueItems.revenueId, revenues.id))
      .where(and(eq(revenues.userId, user.id), eq(revenueItems.date, date)))
      .limit(1);
    if (existingEntry.length > 0) {
      return {
        success: false,
        error: `Revenue for ${formattedDate} already exists. Delete the existing entry first if you want to replace it.`,
      };
    }
    await db.transaction(async (tx) => {
      const revenue =
        (await tx.query.revenues.findFirst({
          columns: {
            id: true,
          },
          where: eq(revenues.userId, user.id),
        })) ??
        (
          await tx
            .insert(revenues)
            .values({
              userId: user.id,
            })
            .returning({ id: revenues.id })
        )[0];

      if (!revenue) {
        throw new Error("This should be impossible");
      }

      await tx.insert(revenueItems).values({
        date: date,
        revenueId: revenue.id,
        creditCard: paymentData.creditCard.toString(),
        debitCard: paymentData.debitCard.toString(),
        moneyTransfer: paymentData.moneyTransfer.toString(),
        qrCode: paymentData.qrCode.toString(),
        cash: paymentData.cash.toString(),
      });
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to add revenue:", error);
    return { success: false, error: "Failed to add revenue" };
  }
}

export async function getRevenueData() {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  const revenueEntry = await db.query.revenues.findFirst({
    columns: {
      id: true,
    },
    where: eq(revenues.userId, user.id),
  });
  if (!revenueEntry) {
    return null;
  }
  const data = await db
    .select()
    .from(revenueItems)
    .where(eq(revenueItems.revenueId, revenueEntry.id))
    .orderBy(revenueItems.date);
  return data;
}

export async function deleteRevenueItemEntry(id: number) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  const revenueEntry = await db.query.revenues.findFirst({
    columns: {
      id: true,
    },
    where: eq(revenues.userId, user.id),
  });
  if (!revenueEntry) {
    throw new Error("No revenue entry for the current user");
  }
  try {
    await db
      .delete(revenueItems)
      .where(
        and(
          eq(revenueItems.revenueId, revenueEntry.id),
          eq(revenueItems.id, id),
        ),
      );
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete revenue entry:", error);
    return { success: false, error: "Failed to delete revenue entry" };
  }
}
