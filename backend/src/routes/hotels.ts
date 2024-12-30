import express from "express";
import { Request, Response } from "express";
import Hotel from "../models/hotel";
import { parse } from "path";
import { HotelSearchResponse } from "../models/search";
import { param, validationResult } from "express-validator";

const router = express.Router();
//api/hotels/search?
router.get("/search", async (req: Request, res: Response) => {
  try {
    //pagination
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize; //skip the previous pages and items on those pages
    //when no search params are provided
    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const totalHotels = await Hotel.countDocuments();
    console.log(totalHotels, "total hotels");
    const p = Math.ceil(totalHotels / pageSize);
    const resposne: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total: totalHotels,
        page: pageNumber,
        pages: p,
      },
    };
    res.json(resposne);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Putting this .get api route below the /search route because the /search route is a dynamic route and it will match with the /:id route i.e. if I were to put the /:id route above the /search route, then the /search route would never be called as it would match with the /:id route and the /:id route would be called instead and whatever would be in the /url would be treated as the id of the hotel and the /:id route would be called even if the /url is /search
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel id is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }
    try {
      const hotel = await Hotel.findById(req.params.id);
      if (!hotel) {
        res.status(404).json({ message: "Hotel not found" });
        return;
      }
      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);

export default router;
