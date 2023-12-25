import { createAmenityInput } from "~/server/db/amenity/amenity.validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { amenities } from "~/server/db/schema";

export const amenityRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.amenities.findMany();
  }),

  create: protectedProcedure
    .input(createAmenityInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(amenities).values(input);
    }),
});
