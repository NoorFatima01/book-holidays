import express from "express";
import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
import { check, validationResult } from "express-validator";
const router = express.Router();

// url: /api/users/register
router.post("/register", [
    check("firstName","First Name is required").isString(),
    check("lastName","Last Name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password is required of 6 or more characters").isLength({min:6})
    
],async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({message:"Bad Request",errors:errors.array()});
        return;
    }
  try {
    const { email, password, firstName, lastName } = req.body;

    let user = await User.findOne({
      email: email,
    });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
      //400 used for bad requests
    }
    user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await user.save();

    const token = jwt.sign({userId:user.id, role:user.role}, process.env.JWT_SECRET as string,{expiresIn:"1d"});

    res.cookie("authCookie",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production", //false for dev
        maxAge:1000*60*60*24, //1 day (is same as the duration of expiry of the token)
    })

    //no need to write code to send the cookie as the cookie is automatically
    res.status(200).json(user);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

router.get("/me",verifyToken, async (req:Request,res:Response)=>{
  const userId = req.userId;
  console.log(userId,"userId");
  try{
    const user = await User.findById(userId);
    if(!user){
      res.status(404).json({message:"User not found"});
      return;
    }
    console.log(user,"user");
    res.status(200).json(user);
    return;
  }catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error"});
    return;
  }
})
export default router;
