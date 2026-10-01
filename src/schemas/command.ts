// m-one-emi-shared/src/schemas/command.ts
import { z } from "zod";

export const AlarmSchema = z.object({ on: z.boolean() });
export type AlarmDto = z.infer<typeof AlarmSchema>;

export const MessageSchema = z.object({ message: z.string().min(1).max(500) });
export type MessageDto = z.infer<typeof MessageSchema>;

export const ReleaseSchema = z.object({
  mode: z.enum(["keep_protection", "clean_remove"]),
});
export type ReleaseDto = z.infer<typeof ReleaseSchema>;

export const AckSchema = z.object({ commandId: z.string().uuid() });
export type AckDto = z.infer<typeof AckSchema>;
