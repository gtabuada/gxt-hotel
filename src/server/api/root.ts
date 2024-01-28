import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user.router";
import { accommodationRouter } from "./routers/accommodation.router";
import { amenityRouter } from "./routers/amenity.router";
import { accommodationToAmenityRouter } from "./routers/accommodationToAmenity";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  accommodation: accommodationRouter,
  amenity: amenityRouter,
  accommodationToAmenity: accommodationToAmenityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
