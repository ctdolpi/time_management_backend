import express from "express";
import authController from "../controllers/auth.controller";
import {
  loginValidation,
  registerValidation,
} from "../validators/userValidator";
import { validateRequest } from "../middlewares/validateRequest.middleware";

const router = express.Router();

router
  .route("/register")
  .post(registerValidation, validateRequest, authController.registerUser);
router
  .route("/login")
  .post(loginValidation, validateRequest, authController.loginUser);

export default router;
