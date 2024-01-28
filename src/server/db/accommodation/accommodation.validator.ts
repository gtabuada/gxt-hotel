import { z } from "zod";

export const createAccommodationInput = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
});

export type CreateAccommodationInput = z.infer<typeof createAccommodationInput>;

export const updateAccommodationInput = createAccommodationInput
  .partial()
  .extend({
    id: z.string().cuid2(),
  });

export type UpdateAccommodationInput = z.infer<typeof updateAccommodationInput>;

export const createAccommodationToAmenityInput = z.object({
  accommodationId: z.string().cuid2(),
  amenityId: z.string().cuid2(),
});

export type CreateAccommodationToAmenityInput = z.infer<
  typeof createAccommodationToAmenityInput
>;

export const addManyAccommodationToAmenityInput = z.object({
  accommodationId: z.string().cuid2(),
  amenities: z.array(z.string().cuid2()),
});

export type AddManyAccommodationToAmenityInput = z.infer<
  typeof addManyAccommodationToAmenityInput
>;
