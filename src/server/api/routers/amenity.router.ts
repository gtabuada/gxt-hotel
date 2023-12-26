import {
  createAmenityInput,
  updateAmenityInput,
} from "~/server/db/amenity/amenity.validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { amenities } from "~/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const amenityRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.amenities.findMany();
  }),

  create: protectedProcedure
    .input(createAmenityInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(amenities).values(input);
    }),

  update: protectedProcedure
    .input(updateAmenityInput)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(amenities)
        .set(input)
        .where(eq(amenities.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.string().cuid2())
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(amenities).where(eq(amenities.id, input));
    }),
});
