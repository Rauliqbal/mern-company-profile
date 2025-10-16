import { Request, Response } from "express";
import { registerSchema } from "../schemas/authSchema";
import { errorResponse, successResponse } from "../utils/response";
import { prisma } from "../config";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { username, email, password } = parsed.data;

  try {
    // Check User
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (user) {
      return errorResponse(res, "Account already exists ", 404);
    }

    // Hash Passowrd
    const hashPassword = await argon2.hash(password);

    // Create
    await prisma.users.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    successResponse(res, "Register account successfully!", 200);
  } catch (error) {
    errorResponse(res, "Error", 500);
  }
};
