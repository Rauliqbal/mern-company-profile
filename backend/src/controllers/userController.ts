import { Request, Response } from "express";
import { registerSchema } from "../validation/authSchema";
import { errorResponse, successResponse } from "../utils/response";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import db from "../db";
import { eq } from "drizzle-orm";
import { user } from "../db/schema";

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, password } = parsed.data;

  try {
    // Check User
    const checkUser = await db.select().from(user).where(eq(user.email, email));
    if (checkUser) {
      return errorResponse(res, "Account already exists ", 404);
    }

    // Hash Passowrd
    const hashPassword = await argon2.hash(password);

    // Create
    const create = await db.insert(user).values({
      name,
      email,
      password: hashPassword,
    }).returning;

    successResponse(res, "Register account successfully!", create, 200);
  } catch (error) {
    errorResponse(res, "Error", 500);
  }
};
