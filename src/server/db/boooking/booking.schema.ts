import { createId } from "@paralleldrive/cuid2";
import { pgTable } from "../_table";
import { timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "../schema";
import { accommodations } from "../accommodation/accommodation.schema";

export const bookings = pgTable("booking", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  checkInDate: timestamp("startDate", { mode: "date" }).notNull(),
  checkOutDate: timestamp("endDate", { mode: "date" }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  accommodationId: varchar("accommodationId", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const bookingUserRelations = relations(bookings, ({ one }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  accommodation: one(accommodations, {
    fields: [bookings.accommodationId],
    references: [accommodations.id],
  }),
}));

export type Booking = typeof bookings.$inferSelect;
export type BookingUpdate = Partial<typeof bookings.$inferInsert> & {
  id: string;
};
