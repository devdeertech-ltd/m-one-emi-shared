// m-one-emi-shared/src/schemas/geofence.ts
import { z } from "zod";

export const LocationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  accuracyM: z.number().nonnegative().optional(),
});
export type LocationDto = z.infer<typeof LocationSchema>;

export const GeoActionSchema = z.object({
  action: z.enum(["warned", "locked", "ignored"]),
});
export type GeoActionDto = z.infer<typeof GeoActionSchema>;
