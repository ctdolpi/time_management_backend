import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const connectDB = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    const connection = await mongoose.connect(mongoUri);
    console.log(
      `MongoDB connected successfully: ${connection.connection.host}`
    );
    next();
  } catch (error) {
    next(error);
  }
};

export default connectDB;
