import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import db from "../db";
import { eq } from "drizzle-orm";
import { userTable } from "../db/schema";

export const getUser = async (req: Request, res: Response) => {
  try {

    if(!req.user) {
      return errorResponse(res,"Unauthorization",401)
    }

    const getUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, req.user.id))
      .limit(1)
      .then(rows => rows[0]);

    if (!getUser) {
      return errorResponse(res, "User tidak ditemukan", 404);
    }

    const { password, ...safeUser } = getUser;
    return successResponse(res, "Success get user", safeUser, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500);
  }
};
