// m-one-emi-shared/src/schemas/enrollment.ts
import { z } from "zod";

export const CreateEnrollmentSchema = z.object({
  customerId: z.string().uuid(),
  expiresInHours: z.number().int().positive().max(720).optional(),
});
export type CreateEnrollmentDto = z.infer<typeof CreateEnrollmentSchema>;

// POST /customers/:id/enrollment (ensure) and /regenerate
export const EnsureEnrollmentSchema = z.object({
  expiresInHours: z.number().int().positive().max(720).optional(),
});
export type EnsureEnrollmentDto = z.infer<typeof EnsureEnrollmentSchema>;

export const SelfEnrollSchema = z.object({
  code: z.string().min(4),
  secret: z.string().min(8),
  imei: z.string().min(5),
  serial: z.string().optional(),
  model: z.string().optional(),
  brand: z.string().optional(),
  androidVersion: z.string().optional(),
  dpcVersion: z.string().optional(),
});
export type SelfEnrollDto = z.infer<typeof SelfEnrollSchema>;
