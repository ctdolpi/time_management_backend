import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
import {
  loginValidation,
  registerValidation,
} from "../validators/userValidator";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);

export default router;
