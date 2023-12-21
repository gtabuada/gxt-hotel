import { eq, inArray } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),

  getClients: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({ where: eq(users.role, "client") });
  }),

  getUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({
      where: inArray(users.role, ["client", "admin"]),
    });
  }),
});
