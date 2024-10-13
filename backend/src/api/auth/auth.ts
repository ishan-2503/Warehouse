import express, { Request, Response } from "express";
import { signupSchema, signinSchema } from "../../types";
import { User } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
// const secret_key = process.env.JWT_SECRET;

router.post("/signup", async function (req: Request, res: Response) {
  const createpayload = req.body;
  const parsepayload = signupSchema.safeParse(createpayload);

  if (!parsepayload.success) {
    res.status(411).json({ message: "Invalid Input" });
  }
  try {
    const exisitinguser = await User.findOne({ Email: createpayload.Email });
    if (exisitinguser) {
      res.status(409).json({ message: "User already exists" });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        console.log("Salt: " + salt);
        const hashedPassword = await bcrypt.hash(createpayload.Password, salt);
        console.log("hashedPassword: " + hashedPassword);
        const user = await User.create({
          FirstName: createpayload.FirstName,
          LastName: createpayload.LastName,
          Email: createpayload.Email,
          Password: hashedPassword,
        });
        const userId = user._id;
        const token = jwt.sign({ userId }, "Ishan@jwt");
        res
          .status(201)
          .json({ message: "User Registered Successfully", token });
      } catch (error) {
        console.log("Error in HashedPassword and token section: " + error);
      }
    }
  } catch (err) {
    console.log("Error in registration: " + err);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/signin", async function (req: Request, res: Response) {
  const createpayload = req.body;
  const parsepayload = signinSchema.safeParse(createpayload);

  if (!parsepayload.success) {
    res.status(411).json({ message: "Invalid Input" });
  }
  const existinguser = await User.findOne({ Email: createpayload.Email });
  if (!existinguser) {
    res.status(400).json({ message: "Invalid email or password" });
  } else {
    try {
      const isValidPassword = await bcrypt.compare(
        createpayload.Password as string,
        existinguser.Password as string
      );
      if (!isValidPassword) {
        res.status(400).json({ message: "Invalid password" });
        console.log("invalid password");
      } else {
        const userId = existinguser._id;
        const token = jwt.sign({ userId }, "Ishan@jwt");
        res.status(200).json({ message: "Login successful", token });
      }
    } catch (error) {
        console.log("Error in isValidPassword: "+error);
    }
  }
});

export default router;
