import { integer, text } from "drizzle-orm/pg-core";
import { pgTable } from "../_table";
import { createId } from "@paralleldrive/cuid2";
import type { IconName } from "~/components/Icon";

export const amenities = pgTable("amenity", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  quantity: integer("quantity").notNull().default(-1),
  icon: text("icon").$type<IconName>().notNull().default("alert-triangle"),
});

export type Amenity = typeof amenities.$inferSelect;
export type AmenityUpdate = typeof amenities.$inferInsert & {
  id: string;
};
