import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware";
import userController from "../controllers/user.controller";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize(["admin"]), userController.getAllUsers);
router.route("/profile").get(protect, userController.getCurrentUser);

export default router;
