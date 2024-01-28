import { createId } from "@paralleldrive/cuid2";
import { pgTable } from "../_table";
import {
  text,
  timestamp,
  varchar,
  numeric,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { amenities } from "../schema";

export const accommodations = pgTable("accomodation", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull().default(""),
  price: numeric("price", { precision: 10, scale: 2 })
    .$type<number>()
    .notNull(),

  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type Accommodation = typeof accommodations.$inferSelect & {
  accommodationsToAmenities: {
    amenity: typeof amenities.$inferSelect;
  }[];
};
export type AccommodationUpdate = Partial<
  typeof accommodations.$inferInsert
> & {
  id: string;
};

export const accommodationsRelations = relations(
  accommodations,
  ({ many }) => ({
    accommodationsToAmenities: many(accommodationsToAmenities),
  }),
);

export const accommodationsToAmenities = pgTable(
  "accommodations_to_amenities",
  {
    accommodationId: text("accommodationId")
      .notNull()
      .references(() => accommodations.id, { onDelete: "cascade" }),
    amenityId: text("amenityId")
      .notNull()
      .references(() => amenities.id),
  },
  (t) => ({
    pk: primaryKey(t.accommodationId, t.amenityId),
  }),
);

export const accommodationsToAmenitiesRelations = relations(
  accommodationsToAmenities,
  ({ one }) => ({
    accommodation: one(accommodations, {
      fields: [accommodationsToAmenities.accommodationId],
      references: [accommodations.id],
    }),
    amenity: one(amenities, {
      fields: [accommodationsToAmenities.amenityId],
      references: [amenities.id],
    }),
  }),
);
