import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user.router";
import { accommodationRouter } from "./routers/accommodation.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  accommodation: accommodationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
