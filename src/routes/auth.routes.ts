import express from "express";
import authController from "../controllers/auth.controller";
import {
  signinValidation,
  signupValidation,
} from "../validators/userValidator";
import { validateRequest } from "../middlewares/validateRequest.middleware";

const router = express.Router();

router
  .route("/signup")
  .post(signupValidation, validateRequest, authController.signupUser);
router
  .route("/signin")
  .post(signinValidation, validateRequest, authController.signinUser);

export default router;
