import mongoose from "mongoose";

export type BookingModelType = {
    _id: string;
    hotelId : string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCapacity: number;
    childCapacity: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
}

const bookingSchema = new mongoose.Schema<BookingModelType>({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCapacity: { type: Number, required: true },
  childCapacity: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalCost: { type: Number, required: true },
});

const Booking = mongoose.model<BookingModelType>("Booking", bookingSchema);
export default Booking;
