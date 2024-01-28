import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env";
import { db } from "~/server/db";
import { pgTable } from "~/server/db/_table";
import { users, type UserRole } from "./db/user/user.schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      // const _user = await db.query.users.findFirst({
      //   where: eq(users.id, user.id),
      // });

      // if (_user) {
      //   session.user.role = _user.role;
      // }

      session.user.id = user.id;

      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // @ts-expect-error ...
  adapter: DrizzleAdapter(db, pgTable),
};

export const getServerAuthSession = () => getServerSession(authOptions);
