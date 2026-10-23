// m-one-emi-shared/src/schemas/control.ts
import { z } from "zod";

// message-only dialog on the phone (no lock/alarm)
export const AlertSchema = z.object({ message: z.string().min(1).max(500) });

// per-device circular geofence from the device's last location + radius stepper
export const DeviceGeofenceSchema = z.object({
  centerLat: z.number().gte(-90).lte(90),
  centerLng: z.number().gte(-180).lte(180),
  radiusM: z.number().int().min(200).max(50000),
});

export type AlertDto = z.infer<typeof AlertSchema>;
export type DeviceGeofenceDto = z.infer<typeof DeviceGeofenceSchema>;
