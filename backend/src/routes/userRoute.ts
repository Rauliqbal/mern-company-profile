import { Router } from "express";
import {
  deleteUser,
  getDetailUser,
  getUser,
  updateUser,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

const userRoute = Router();

userRoute.get("/", verifyToken, getUser);
userRoute.put("/:id", verifyToken, updateUser);
userRoute.get("/:id", verifyToken, getDetailUser);
userRoute.delete("/:id", verifyToken,deleteUser);

export default userRoute;
