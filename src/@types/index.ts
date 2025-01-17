import { IUser } from "../models/User.model";
import { Request } from "express";

export interface URequest extends Request {
  user?: IUser;
}

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
