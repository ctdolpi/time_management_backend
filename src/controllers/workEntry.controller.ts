import { Request, Response, NextFunction } from "express";
import WorkEntry from "../models/WorkEntry.model";
import { URequest, CustomError } from "../@types";

class WorkEntryController {
  async getWorkEntries(req: URequest, res: Response, next: NextFunction) {
    try {
      const { from, to } = req.query;

      if (!req.user) {
        return next(new CustomError("User not authenticated", 400));
      }
      const filter: any = { userId: req.user._id };

      if (from || to) {
        filter.date = {};
        if (from) filter.date.$gte = from;
        if (to) filter.date.$lte = to;
      }
      const workEntries = await WorkEntry.find(filter);
      res.status(200).json(workEntries);
    } catch (error) {
      next(error);
      // res.status(500).json({ message: "Error retrieving work entries", error });
    }
  }

  async getAllWorkEntries(req: Request, res: Response, next: Function) {
    try {
      const workEntries = await WorkEntry.find().populate("user", "name email");
      res.status(200).json(workEntries);
    } catch (error) {
      next(error);
      // res.status(500).json({ message: "Error retrieving work entries", error });
    }
  }

  async createWorkEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const newWorkEntry = new WorkEntry(req.body);
      await newWorkEntry.save();
      res.status(201).json(newWorkEntry);
    } catch (error) {
      next(error);
      // res.status(500).json({ message: "Error creating work entry", error });
    }
  }

  async updateWorkEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedWorkEntry = await WorkEntry.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedWorkEntry) {
        return next(new CustomError("Work entry not found", 404));
      }
      res.status(200).json(updatedWorkEntry);
    } catch (error) {
      next(error);
      // res.status(500).json({ message: "Error updating work entry", error });
    }
  }

  async deleteWorkEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedWorkEntry = await WorkEntry.findByIdAndDelete(id);
      if (!deletedWorkEntry) {
        return next(new CustomError("Work entry not found", 404));
      }
      res.status(200).json({ message: "Work entry deleted successfully" });
    } catch (error) {
      next(error);
      // res.status(500).json({ message: "Error deleting work entry", error });
    }
  }
}

export default new WorkEntryController();
