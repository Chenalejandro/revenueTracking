import { decimal, pgTable } from "drizzle-orm/pg-core";

export const revenueTable = pgTable("revenue", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  date: t.date("date", { mode: "date" }).notNull().defaultNow().unique(),
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

export type Revenue = typeof revenueTable.$inferSelect;
export type NewRevenue = typeof revenueTable.$inferInsert;

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
