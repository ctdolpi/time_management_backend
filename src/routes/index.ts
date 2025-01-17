import express from "express";
import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
