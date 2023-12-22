import { createAccommodationInput } from "~/server/db/accommodation/accommodation.validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { accommodations } from "~/server/db/schema";

export const accommodationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.accommodations.findMany();
  }),

  create: protectedProcedure
    .input(createAccommodationInput)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .insert(accommodations)
        .values({ ...input, price: input.price.toString() });
    }),
});
