import { Router } from "express";
import { getUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

const userRoute = Router();

userRoute.get("/", verifyToken, getUser);

export default userRoute;
