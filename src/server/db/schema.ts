export {
  type User,
  accounts,
  accountsRelations,
  sessions,
  sessionsRelations,
  users,
  usersRelations,
  verificationTokens,
} from "./user/user.schema";

export {
  type Accommodation,
  type AccommodationUpdate,
  accommodations,
} from "./accommodation/accommodation.schema";

export {
  type Booking,
  type BookingUpdate,
  bookingUserRelations,
  bookings,
} from "./boooking/booking.schema";
