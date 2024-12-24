import express from "express";
import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import { client } from "../index";
import multer, { Multer } from "multer";
import Hotel, { HotelType } from "../models/hotel";
import { body, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
//this will be the root
router.post(
  "/",
  verifyToken, //only logged in users can create hotels
  upload.array("imageFiles", 6),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night must be a number"),
    body("adultCapacity")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult capacity must be a number"),
    body("childCapacity")
      .notEmpty()
      .isNumeric()
      .withMessage("Child capacity must be a number"),
    body("starRating")
      .notEmpty()
      .isNumeric()
      .withMessage("Star rating must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities must be an array"),
  ],
  async (req: Request, res: Response) => {
    console.log("req body");
    console.log(req.body);
    console.log("Headers:", req.headers);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ message: "Bad Request", errors: errors.array() });
      return;
    }
    try {
      const files = req.files as Express.Multer.File[];
      console.log(files);
      const promises = files.map(async (file) => {
        const fileExt = mime.extension(file.mimetype);
        console.log(file);
        const fileName = file.originalname;
        if (!fileExt) {
          throw new Error("Invalid file type");
        }
        const newFileName = `${fileName}-${Date.now()}`;
        const params = {
          Bucket: process.env.S3_BUCKET_NAME as string,
          Key:`${fileName}-${Date.now()}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        await client.send(new PutObjectCommand(params));
        const link = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
        return link;
      });
      const imageUrls = await Promise.all(promises);
      console.log("imageUrls", imageUrls);
      const newHotel: HotelType = req.body;
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId; //this is taken from the auth token
      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(201).send(hotel);
    } catch (error) {
      console.log("error creating hotel", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).send(hotels);
  } catch (error) {
    console.log("error getting hotels", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
})

export default router;