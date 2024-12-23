import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

mongoose.connect(process.env.MONGODB_URI as string);

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

app.listen(7000, () => {
  console.log("Server started at port 7000");
});
