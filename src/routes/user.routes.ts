import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware";
import userController from "../controllers/user.controller";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize(["admin", "manager"]), userController.getAllUsers);
router.route("/profile").get(protect, userController.getCurrentUser);
router
  .route("/:id")
  .get(protect, authorize(["admin", "manager"]), userController.getUserById)
  .put(protect, authorize(["admin", "manager"]), userController.updateUser)
  .delete(protect, authorize(["admin", "manager"]), userController.deleteUser);

export default router;
