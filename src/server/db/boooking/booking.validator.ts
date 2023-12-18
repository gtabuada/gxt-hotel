import { z } from "zod";

export const createBookingInput = z.object({
  roomId: z.string().cuid2(),
  userId: z.string().cuid2(),
  checkInDate: z.date(),
  checkOutDate: z.date(),
});

export type CreateBookingInput = z.infer<typeof createBookingInput>;
