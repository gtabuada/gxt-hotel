import { z } from "zod";

export const createRoomInput = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export type CreateRoomInput = z.infer<typeof createRoomInput>;
