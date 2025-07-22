import { User } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const maxAge = 3*24*60*60;

const createToken = (userId: string)=>{
    return jwt.sign({userId},process.env.JWT_SECRET as string,{
        expiresIn:maxAge
    })
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Sprawdzenie czy uzytkownik istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Tworzenie nowego użytkownika
    const newUser = new User({
      name,
      email,
      password, 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  try {
    // Sprawdzenie pól
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Sprawdzenie emaila
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Sprawdzenie hasla
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // generowanie tokenu
    res.cookie("token", createToken(user._id.toString()), {
      httpOnly: true,
      maxAge: maxAge * 1000, // cookie expires after maxAge seconds
      sameSite: "lax"
    })
    .status(200)
    .json({ message: "Login successful",
       user: { id: user._id, name: user.name, email: user.email, role: user.role } 
      });
  } catch (err) {
    // console.error("Error logging in user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}