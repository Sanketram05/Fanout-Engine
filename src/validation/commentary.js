import { z } from "zod";

export const listCommentaryQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const createCommentarySchema = z.object({
  minute: z.number().int().nonnegative(),
  sequence: z.number().int(),
  period: z.string(),
  eventType: z.string(),
  actor: z.string(),
  team: z.string(),
  message: z.string().min(1, "Message is required"),
  metadata: z.record(z.string(),z.any()).default({}),
  tags: z.array(z.string()).default([]),
});