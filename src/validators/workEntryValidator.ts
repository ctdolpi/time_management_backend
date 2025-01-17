import { body, check } from "express-validator";

export const createValidation = [
  check("description").notEmpty().withMessage("Description is required"),
  check("date").isISO8601().withMessage("Invalid date format"),
  check("duration").isNumeric().withMessage("Duration must be a number"),
];

export const updateValidation = [
  check("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  check("date").optional().isISO8601().withMessage("Invalid date format"),
  check("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number"),
];
