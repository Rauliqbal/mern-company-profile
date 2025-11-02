import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import config from "../config";

// Verification Token
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_TOKEN) as {
      id: string;
      email: string;
      role?: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};

// Verification Role Admin
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || user.role !== "superadmin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }
  next();
};
