import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/UserModel";

class AuthController {
  constructor() {
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  private generateToken(id: string, role: string) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }

  async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const user: IUser = await User.create({ name, email, password, role });
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user: IUser | null = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        throw new Error("Invalid credentials");
      }
      const token = this.generateToken(user._id as string, user.role);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default new AuthController();