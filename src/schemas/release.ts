// m-one-emi-shared/src/schemas/release.ts
import { z } from "zod";

export const AppSchema = z.enum(["dpc", "staff_app"]);
export type AppDto = z.infer<typeof AppSchema>;

export const UploadMetaSchema = z.object({
  app: AppSchema,
  versionName: z.string().min(1),
  versionCode: z.coerce.number().int().positive(),
  minSupportedCode: z.coerce.number().int().positive().optional(),
  isMandatory: z.coerce.boolean().optional(),
  changelogEn: z.string().optional(),
  changelogBn: z.string().optional(),
});
export type UploadMetaDto = z.infer<typeof UploadMetaSchema>;

export const FlagsSchema = z.object({
  isActive: z.boolean().optional(),
  isMandatory: z.boolean().optional(),
  minSupportedCode: z.number().int().positive().optional(),
});
export type FlagsDto = z.infer<typeof FlagsSchema>;
