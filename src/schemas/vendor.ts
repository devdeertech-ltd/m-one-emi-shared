// m-one-emi-shared/src/schemas/vendor.ts
import { z } from "zod";

export const VendorRegisterSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(20).optional(),
  password: z.string().min(8),
  privacyAccepted: z.boolean(),
});
export const VendorVerifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});
export const VendorLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export const VendorUpdateSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  phone: z.string().min(6).max(20).optional(),
});

export type VendorRegisterDto = z.infer<typeof VendorRegisterSchema>;
export type VendorVerifyDto = z.infer<typeof VendorVerifySchema>;
export type VendorLoginDto = z.infer<typeof VendorLoginSchema>;
export type VendorUpdateDto = z.infer<typeof VendorUpdateSchema>;

// vendor refresh / reset reuse the shared RefreshSchema / ResetRequestSchema /
// ResetConfirmSchema from ./auth (identical shapes). Platform-admin login reuses
// LoginSchema from ./auth as well.
