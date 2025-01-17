import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel"; // Assuming you have a User model
import { URequest } from "../@types/express";
class UserController {
  public async getCurrentUser(req: URequest, res: Response): Promise<Response> {
    try {
      const currentUser = req.user;
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(currentUser);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving current user", error });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving users", error });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving user", error });
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Error creating user", error });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Error updating user", error });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting user", error });
    }
  }
}

export default new UserController();
