import {
  createAccommodationInput,
  updateAccommodationInput,
} from "~/server/db/accommodation/accommodation.validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { accommodations } from "~/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const accommodationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.accommodations.findMany({
      with: {
        accommodationsToAmenities: {
          columns: {},
          with: {
            amenity: true,
          },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(z.string().cuid2())
    .query(({ ctx, input }) => {
      return ctx.db.query.accommodations.findFirst({
        where: eq(accommodations.id, input),
        with: {
          accommodationsToAmenities: {
            columns: {},
            with: {
              amenity: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(createAccommodationInput)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .insert(accommodations)
        .values(input)
        .returning({ accommodationId: accommodations.id });
    }),

  updateOne: protectedProcedure
    .input(updateAccommodationInput)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(accommodations)
        .set(input)
        .where(eq(accommodations.id, input.id));
    }),

  deleteOne: protectedProcedure
    .input(z.string().cuid2())
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(accommodations).where(eq(accommodations.id, input));
    }),
});
