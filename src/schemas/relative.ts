// m-one-emi-shared/src/schemas/relative.ts
import { z } from "zod";

export const RelativeSchema = z.object({
  relation: z.enum([
    "spouse",
    "child",
    "father",
    "mother",
    "sibling",
    "nominee",
    "earning_member",
    "other",
  ]),
  name: z.string().min(1),
  phone: z.string().optional(),
  address: z.string().optional(),
  workingStatus: z
    .enum([
      "employed",
      "self_employed",
      "business",
      "unemployed",
      "student",
      "retired",
      "other",
    ])
    .optional(),
  isEarningMember: z.boolean().optional(),
  isNominee: z.boolean().optional(),
  note: z.string().optional(),
});
export type RelativeDto = z.infer<typeof RelativeSchema>;
