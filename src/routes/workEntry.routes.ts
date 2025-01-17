import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware";
import workEntryController from "../controllers/workEntry.controller";
import {
  createValidation,
  updateValidation,
} from "../validators/workEntryValidator";
import { validateRequest } from "../middlewares/validateRequest.middleware";

const router = Router();

router
  .route("/")
  .get(protect, workEntryController.getWorkEntries)
  .post(
    protect,
    createValidation,
    validateRequest,
    workEntryController.createWorkEntry
  );

router
  .route("/:id")
  .put(
    protect,
    updateValidation,
    validateRequest,
    workEntryController.updateWorkEntry
  )
  .delete(protect, workEntryController.deleteWorkEntry);

router
  .route("/all")
  .get(protect, authorize(["admin"]), workEntryController.getAllWorkEntries);

export default router;
