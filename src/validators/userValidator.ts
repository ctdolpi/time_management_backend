import { check } from "express-validator";

export const registerValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  // check("role").isIn(["user", "manager", "admin"]).withMessage("Invalid role"),
];

export const loginValidation = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").notEmpty().withMessage("Password is required"),
];
