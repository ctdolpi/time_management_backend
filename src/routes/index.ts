import express from "express";
import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import workEntryRoutes from "./workEntry.routes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/work-entries", workEntryRoutes);

export default router;
