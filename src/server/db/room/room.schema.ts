import { createId } from "@paralleldrive/cuid2";
import { pgTable } from "../_table";
import { text, timestamp, varchar, numeric } from "drizzle-orm/pg-core";

export const rooms = pgTable("room", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type Room = typeof rooms.$inferSelect;
export type RoomUpdate = Partial<typeof rooms.$inferInsert> & {
  id: string;
};
