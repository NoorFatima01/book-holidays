import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import { S3Client } from "@aws-sdk/client-s3";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import bookingRoutes from './routes/bookings';

mongoose.connect(process.env.MONGODB_URI as string);

export const client = new S3Client({
  region: process.env.S3_REGION as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
});

const app = express();
app.use(cookieParser()); //to parse the cookie
app.use(express.json()); //converts the body of the request to json automatically
app.use(express.urlencoded({ extended: true })); //helps parse the url to get the query parameters
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels",hotelRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(7000, () => {
  console.log("Server started at port 7000");
});
