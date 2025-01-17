import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import User from "../models/User.model";
import { CustomError, URequest } from "../@types";

export const protect = async (
  req: URequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultsecret"
      );
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      next(error);
      // res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    return next(new CustomError("Not authorized, no token", 401));
  }
};

export const authorize = (roles: string[]) => {
  return (req: URequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new CustomError("Not authorized", 403));
    }
    next();
  };
};
