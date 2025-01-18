import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.model";
import { CustomError } from "../@types";

class AuthController {
  constructor() {
    this.signupUser = this.signupUser.bind(this);
    this.signinUser = this.signinUser.bind(this);
  }

  private generateToken(id: string, role: string) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }

  async signupUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role } = req.body;
      const user: IUser = await User.create({ name, email, password, role });
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      next(error);
      // res.status(400).json({ error: (error as Error).message });
    }
  }

  async signinUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user: IUser | null = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        const error = new CustomError("Invalid credentials", 400);
        return next(error);
        // throw new Error("Invalid credentials");
      }
      const token = this.generateToken(user._id as string, user.role);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
      // res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default new AuthController();
