// m-one-emi-shared/src/schemas/staff.ts
import { z } from "zod";

export const CreateStaffSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.enum(["admin", "moderator"]),
  password: z.string().min(8),
});
export type CreateStaffDto = z.infer<typeof CreateStaffSchema>;
