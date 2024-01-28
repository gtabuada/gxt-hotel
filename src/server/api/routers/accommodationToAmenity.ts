import {
  addManyAccommodationToAmenityInput,
  createAccommodationToAmenityInput,
} from "~/server/db/accommodation/accommodation.validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { accommodationsToAmenities } from "~/server/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export const accommodationToAmenityRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createAccommodationToAmenityInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(accommodationsToAmenities).values(input);
    }),

  addMany: protectedProcedure
    .input(addManyAccommodationToAmenityInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(accommodationsToAmenities).values(
        input.amenities.map((amenityId) => ({
          amenityId: amenityId,
          accommodationId: input.accommodationId,
        })),
      );
    }),

  deleteMany: protectedProcedure
    .input(addManyAccommodationToAmenityInput)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(accommodationsToAmenities)
        .where(
          and(
            eq(
              accommodationsToAmenities.accommodationId,
              input.accommodationId,
            ),
            inArray(accommodationsToAmenities.amenityId, input.amenities),
          ),
        )
        .execute();
    }),
});
