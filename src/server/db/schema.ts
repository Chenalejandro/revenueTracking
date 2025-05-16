import { relations } from "drizzle-orm";
import { decimal, pgTable } from "drizzle-orm/pg-core";

export const revenueItems = pgTable("revenueItems", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  revenueId: t.integer().notNull(),
  date: t.date("date", { mode: "date" }).notNull(),
  creditCard: decimal("credit_card", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  debitCard: decimal("debit_card", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  moneyTransfer: decimal("money_transfer", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  cash: decimal("cash", { precision: 10, scale: 2 }).notNull().default("0"),
  qrCode: decimal("qr_code", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  billing: decimal("billing", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
}));

export const revenueItemsRelations = relations(revenueItems, ({ one }) => ({
  revenue: one(revenues, {
    fields: [revenueItems.revenueId],
    references: [revenues.id],
  }),
}));

export const revenues = pgTable("revenues", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: t.text().notNull().unique(),
}));

export const revenuesRelations = relations(revenues, ({ many }) => ({
  revenueItem: many(revenueItems),
}));

export type RevenueItem = typeof revenueItems.$inferSelect;
export type NewRevenueItem = typeof revenueItems.$inferInsert;

export type PaymentType =
  | "creditCard"
  | "debitCard"
  | "moneyTransfer"
  | "cash"
  | "qrCode"
  | "all";

export const paymentTypeLabels: Record<PaymentType, string> = {
  creditCard: "Credit Card",
  debitCard: "Debit Card",
  moneyTransfer: "Money Transfer",
  cash: "Cash",
  qrCode: "QR Code",
  all: "All Payments",
};
