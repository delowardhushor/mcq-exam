// src/controllers/Auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import fetch from "node-fetch";
import { GOOGLE_AUTH_URL } from "../utils/consts";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: "No token provided" });
    }

    // Verify Google token
    const googleRes = await fetch(`${GOOGLE_AUTH_URL}/tokeninfo?id_token=${token}`);
    const data: any = await googleRes.json();

    if (!data.email) {
      return res.status(401).json({ success: false, message: "Invalid Google token" });
    }

    // Check if user exists
    let user = await User.findOne({ email: data.email });

    if (!user) {
      user = await User.create({
        name: data.name,
        email: data.email,
        googleId: data.sub,
        picture: data.picture,
      });
    }

    // Create JWT
    const accessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      data: { accessToken, user },
    });
  } catch (error) {
    console.error("Google login failed:", error);
    res.status(500).json({ success: false, message: "Authentication failed" });
  }
};
