// m-one-emi-shared/src/schemas/geofence.ts
import { z } from "zod";

export const LocationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  accuracyM: z.number().nonnegative().optional(),
});
export type LocationDto = z.infer<typeof LocationSchema>;

export const LocationBatchSchema = z.object({
  points: z
    .array(
      z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        accuracyM: z.number().nonnegative().optional(),
        ts: z.number().int().nonnegative().optional(), // epoch ms; defaults to now
      }),
    )
    .min(1)
    .max(500),
});
export type LocationBatchDto = z.infer<typeof LocationBatchSchema>;

export const GeoActionSchema = z.object({
  action: z.enum(["warned", "locked", "ignored"]),
});
export type GeoActionDto = z.infer<typeof GeoActionSchema>;
