// m-one-emi-shared/src/schemas/area.ts
import { z } from "zod";

export const CreateAreaSchema = z.object({
  name: z.string().min(1),
  kind: z.string().default("zone"),
  parentId: z.string().uuid().optional(),
  centerLat: z.number().min(-90).max(90).optional(),
  centerLng: z.number().min(-180).max(180).optional(),
  radiusM: z.number().int().positive().optional(),
});
export type CreateAreaDto = z.infer<typeof CreateAreaSchema>;

export const UpdateAreaSchema = CreateAreaSchema.partial();
export type UpdateAreaDto = z.infer<typeof UpdateAreaSchema>;
