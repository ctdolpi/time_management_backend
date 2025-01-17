import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import { URequest } from "../@types/express";

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
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: URequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Not authorized for this action" });
    }
    next();
  };
};
