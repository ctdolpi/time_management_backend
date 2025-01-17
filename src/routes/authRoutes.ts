import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";

const router = express.Router();

// Login Route
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  })
);

// Register Route
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const user = await User.create({ name, email, password, role });
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    }
  })
);

export default router;
