import express from "express";
import { Request, Response } from "express";
import Hotel from "../models/hotel";
import { body, validationResult } from "express-validator";
import Booking, { BookingModelType } from "../models/booking";
import verifyToken from "../middleware/auth";


const router = express.Router();

router.post(
  '/book-hotel',
  verifyToken,
  [
    body("hotelId", "hotel ID must be a non-empty string").isString().notEmpty(),
    body("firstName", "First name must be a non-empty string").isString().notEmpty(),
    body("lastName", "Last name must be a non-empty string").isString().notEmpty(),
    body("email", "Email must be a valid email address").isEmail(),
    body("adultCapacity", "Adult capacity must be a positive integer")
      .isInt({ min: 0 }),
    body("childCapacity", "Child capacity must be a non-negative integer")
      .isInt({ min: 0 }),
    body("checkIn", "Check-in date must be a valid ISO8601 date").isISO8601(),
    body("checkOut", "Check-out date must be a valid ISO8601 date").isISO8601(),
    body("totalCost", "Total cost must be a positive number")
      .isInt({ min: 0 }),
    
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: "Bad Request", errors: errors.array() });
      return;
    }

    const {hotelId, ...bookingData} = req.body;

    try {
      // Find the hotel by hotelId
      const hotel = await Hotel.findById(hotelId);

      if (!hotel) {
        res.status(404).json({ message: "Hotel not found" });
        return;
      }

      const newBooking: BookingModelType = {
        hotelId,
        userId: req.userId,
        ...bookingData
      }

      const booking = new Booking(newBooking);
      await booking.save();

      // Proceed with booking logic (if any)
      res.status(200).json({ message: "Hotel booked"});
    } catch (error) {
      console.error("Error finding hotel:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get('/my-bookings', verifyToken, async (req: Request, res: Response)=> {
  try {
  const bookings = await Booking.find({userId: req.userId});

  res.status(200).json(bookings);
  } catch (error) {
    console.log('error in getting user bookings', error);
    res.status(500).json({ message: "Error fetching bookings" });

  }
})


export default router;
