import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/authSchema";
import { errorResponse, successResponse } from "../utils/response";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import db from "../db";
import { eq } from "drizzle-orm";
import { refreshTokenTable, userTable } from "../db/schema";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefeshToken,
} from "../utils/jwt";
import config from "../config";

// REGISTER USER
export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, password } = parsed.data;

  // check the same email user
  const checkUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .then((rows) => rows[0]);
  if (checkUser) return errorResponse(res, "Account already exists", 400);

  // Hash Password
  const hashPassword = await argon2.hash(password);

  // create new user
  const create = await db
    .insert(userTable)
    .values({
      name,
      email,
      password: hashPassword,
    })
    .returning()
    .then((rows) => rows[0]);

  const { password: _, ...userWithoutPassword } = create;

  return successResponse(
    res,
    "Register account successfully!",
    userWithoutPassword,
    200
  );
};

// LOGIN USER
export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { email, password } = parsed.data;

  // check user if not there
  const checkUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .then((rows) => rows[0]);
  if (!checkUser) {
    return errorResponse(res, "Account not found", 404);
  }

  // Valid password
  const validPassword = await argon2.verify(checkUser.password, password);
  if (!validPassword) {
    return errorResponse(res, "Wrong password", 401);
  }

  // Generate Token
  const accessToken = generateAccessToken(checkUser);
  const refreshToken = generateRefreshToken(checkUser);

  // Save Refresh Token DB
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await db.insert(refreshTokenTable).values({
    token: refreshToken,
    userId: checkUser.id,
    expiresAt,
  });

  // set refresh token to cookies
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // delete password
  const { password: _, ...userWithoutPassword } = checkUser;

  return successResponse(res, "Login successful!", {
    user: userWithoutPassword,
    accessToken,
  });
};

// LOGOUT USER
export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }
  try {
    const payload = verifyRefeshToken(token) as any;

    console.log(payload);

    await db
      .delete(refreshTokenTable)
      .where(eq(refreshTokenTable.userId, payload.id));

    // remove refresh token cookies
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Refresh Token
export const refreshAccessToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  console.log(token);
  if (!token) return res.sendStatus(401);

  try {
    const decoded = verifyRefeshToken(token) as { id: string };

    // check token on database
    const stored = await db
      .select()
      .from(refreshTokenTable)
      .where(eq(refreshTokenTable.token, token))
      .then((rows) => rows[0]);

    if (!stored) return errorResponse(res, "Invalid refresh token", 403);

    // Generate new access token
    const userData = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, decoded.id))
      .then((rows) => rows[0]);

    if (!userData) return errorResponse(res, "User not found", 404);

    const newAccessToken = generateAccessToken(userData);

    successResponse(res, "Access token refreshed", {
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("ERROR", error);
    errorResponse(res, "Invalid or expired refresh token", 403);
  }
};
