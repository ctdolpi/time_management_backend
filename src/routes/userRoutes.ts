import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware";
import userController from "../controllers/userController";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize(["admin"]), userController.getAllUsers);
router.route("/profile").get(protect, userController.getCurrentUser);

export default router;
