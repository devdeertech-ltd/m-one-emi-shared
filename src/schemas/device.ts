// m-one-emi-shared/src/schemas/device.ts
import { z } from "zod";

// staff update
export const UpdateDeviceSchema = z.object({
  assignedAreaId: z.string().uuid().nullable().optional(),
  offlineLockMin: z.number().int().min(10).max(43200).optional(),
  simLockOnSwap: z.boolean().optional(),
  model: z.string().optional(),
  brand: z.string().optional(),
});
export type UpdateDeviceDto = z.infer<typeof UpdateDeviceSchema>;

// DPC heartbeat
export const HeartbeatSchema = z.object({
  lat: z.number().optional(),
  lng: z.number().optional(),
  androidVersion: z.string().optional(),
  dpcVersion: z.string().optional(),
  pushToken: z.string().optional(),
  sim: z
    .array(
      z.object({
        slot: z.number().int(),
        operator: z.string().optional(),
        iccidHash: z.string().optional(),
      }),
    )
    .optional(),
});
export type HeartbeatDto = z.infer<typeof HeartbeatSchema>;
