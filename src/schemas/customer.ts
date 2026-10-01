// m-one-emi-shared/src/schemas/customer.ts
import { z } from "zod";

export const CreateCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(3),
  address: z.string().optional(),
  nidNumber: z.string().optional(),
  areaId: z.string().uuid().optional(),
  guarantorName: z.string().optional(),
  guarantorPhone: z.string().optional(),
  guarantorRel: z.string().optional(),
});
export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;

export const UpdateCustomerSchema = CreateCustomerSchema.partial().extend({
  updatedAt: z.string().datetime(), // optimistic lock token (current row updatedAt)
});
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;

export const MatchCustomerSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});
export type MatchCustomerDto = z.infer<typeof MatchCustomerSchema>;

export const ActivateSchema = z.object({
  code: z.string().length(6),
  password: z.string().min(8),
});
export type ActivateDto = z.infer<typeof ActivateSchema>;

export const EmailChangeSchema = z.object({ newEmail: z.string().email() });
export type EmailChangeDto = z.infer<typeof EmailChangeSchema>;

export const EmailChangeConfirmSchema = z.object({
  code: z.string().length(6),
});
export type EmailChangeConfirmDto = z.infer<typeof EmailChangeConfirmSchema>;

export const ConsentSchema = z.object({
  agreementVer: z.string().min(1),
  channel: z.string().optional(),
});
export type ConsentDto = z.infer<typeof ConsentSchema>;
