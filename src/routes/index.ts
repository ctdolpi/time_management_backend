import express from "express";
import { Router } from "express";
import userRoutes from "./userRoutes";

const router: Router = express.Router();

router.use("/user", userRoutes);

export default router;
