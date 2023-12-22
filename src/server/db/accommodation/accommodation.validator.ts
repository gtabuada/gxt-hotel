import { z } from "zod";

export const createAccommodationInput = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
});

export type CreateAccommodationInput = z.infer<typeof createAccommodationInput>;
