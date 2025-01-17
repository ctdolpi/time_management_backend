import { NextFunction, Request, Response } from "express";
import User from "../models/User.model"; // Assuming you have a User model
import { CustomError, URequest } from "../@types";
class UserController {
  public async getCurrentUser(
    req: URequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const currentUser = req.user;
      if (!currentUser) {
        next(new CustomError("User not found", 404));
        // return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(currentUser);
    } catch (error) {
      next(error);
      // return res
      //   .status(500)
      //   .json({ message: "Error retrieving current user", error });
    }
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
      // return res.status(500).json({ message: "Error retrieving users", error });
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(new CustomError("User not found", 404));
        // return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
      // return res.status(500).json({ message: "Error retrieving user", error });
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
      // return res.status(500).json({ message: "Error creating user", error });
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return next(new CustomError("User not found", 404));
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
      // return res.status(500).json({ message: "Error updating user", error });
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return next(new CustomError("User not found", 404));
        // return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
      // return res.status(500).json({ message: "Error deleting user", error });
    }
  }
}

export default new UserController();
