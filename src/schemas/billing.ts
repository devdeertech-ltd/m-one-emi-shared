// m-one-emi-shared/src/schemas/billing.ts
import { z } from "zod";

export const CreatePlanSchema = z.object({
  customerId: z.string().uuid(),
  deviceId: z.string().uuid(),
  commodityPrice: z.number().positive(),
  downPayment: z.number().min(0).default(0),
  emiAmount: z.number().positive(),
  termCount: z.number().int().min(1).max(60),
  dueDay: z.number().int().min(1).max(28),
  startDate: z.string().date(), // YYYY-MM-DD
});
export type CreatePlanDto = z.infer<typeof CreatePlanSchema>;

export const RecordPaymentSchema = z.object({
  planId: z.string().uuid(),
  amount: z.number().positive(),
  method: z.enum(["cash", "bkash", "nagad", "bank", "other"]).default("cash"),
  reference: z.string().optional(),
  paidAt: z.string().datetime().optional(),
});
export type RecordPaymentDto = z.infer<typeof RecordPaymentSchema>;
