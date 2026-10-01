// m-one-emi-shared/src/schemas/auth.ts
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export const RefreshSchema = z.object({ refreshToken: z.string().min(1) });
export const ResetRequestSchema = z.object({ email: z.string().email() });
export const ResetConfirmSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  newPassword: z.string().min(8),
});

export type LoginDto = z.infer<typeof LoginSchema>;
export type RefreshDto = z.infer<typeof RefreshSchema>;
export type ResetRequestDto = z.infer<typeof ResetRequestSchema>;
export type ResetConfirmDto = z.infer<typeof ResetConfirmSchema>;
