import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import db from "../db";
import { eq } from "drizzle-orm";
import { userTable } from "../db/schema";
import { registerSchema, updateUserSchema } from "../validation/authSchema";
import argon2 from "argon2";

// GET USER
export const getUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return errorResponse(res, "Unauthorization", 401);
  }

  const getUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, req.user.id))
    .limit(1)
    .then((rows) => rows[0]);

  if (!getUser) {
    return errorResponse(res, "User tidak ditemukan", 404);
  }

  const { password, ...safeUser } = getUser;
  return successResponse(res, "Success get user", safeUser, 200);
};

export const getAllUser = async(req: Request, res:Response) => {
  // if (req.user?.role !== 'ADMIN') {
  //   return errorResponse(res, "Unauthorization", 401);
  // }

  try {
    const getUsers = await db.select().from(userTable);

    const safeUsers = getUsers.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return successResponse(res, "Success get users", safeUsers, 200);
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
}

// DETAIL USER
export const getDetailUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // check user if not there
  const checkUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id))
    .then((rows) => rows[0]);
  if (!checkUser) {
    return errorResponse(res, "Account not found", 400);
  }

  const getUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id))
    .then((rows) => rows[0]);

  const { password, ...safeUser } = getUser;
  return successResponse(res, "Success get detail user", safeUser, 200);
};

// UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  const parsed = updateUserSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { id } = req.params;
  const { name, email, password } = parsed.data;

  // check the same email user
 if (email) {
    const checkUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .then((rows) => rows[0]);

    if (checkUser && checkUser.id !== id) {
      return errorResponse(res, "Email has been used", 400);
    }
  }

  const updatePayload: any = {};

  if (name) updatePayload.name = name;
  if (email) updatePayload.email = email;
  if (password) {
    updatePayload.password = await argon2.hash(password);
  }

  // Update user
  const update = await db
    .update(userTable)
    .set(updatePayload)
    .where(eq(userTable.id, id))
    .returning()
    .then((rows) => rows[0]);

  const { password: _, ...userWithoutPassword } = update;

  return successResponse(
    res,
    "Update account successfully!",
    userWithoutPassword,
    200
  );
};

// DELETE USER
export const deleteUser = async (req:Request, res:Response) => {
  const {id} = req.params

  // check user if not there
  const checkUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id))
    .then((rows) => rows[0]);
  if (!checkUser) {
    return errorResponse(res, "Account not found", 400);
  }

  // delete user
  await db.delete(userTable).where(eq(userTable.id,id))

  return successResponse(res, "Delete account successfully",200)
  
}
