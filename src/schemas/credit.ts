// m-one-emi-shared/src/schemas/credit.ts
import { z } from "zod";

export const GrantCreditSchema = z.object({
  packageId: z.string().uuid().optional(),
  deviceCount: z.number().int().positive(),
  amountBdt: z.number().int().nonnegative(),
  bkashRef: z.string().max(120).optional(),
  note: z.string().max(500).optional(),
});
export const SetCreditSchema = z.object({
  couponBalance: z.number().int().nonnegative().optional(),
  deviceLimit: z.number().int().nonnegative().optional(),
});
export const CreditPackageSchema = z.object({
  name: z.string().min(1).max(60),
  priceBdt: z.number().int().positive(),
  deviceCount: z.number().int().positive(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export type GrantCreditDto = z.infer<typeof GrantCreditSchema>;
export type SetCreditDto = z.infer<typeof SetCreditSchema>;
export type CreditPackageDto = z.infer<typeof CreditPackageSchema>;
