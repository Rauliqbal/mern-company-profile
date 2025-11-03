import { Router } from "express";
import { getDetailUser, getUser, updateUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

const userRoute = Router();

userRoute.get("/", verifyToken, getUser);
userRoute.put('/:id', verifyToken, updateUser)
userRoute.get('/:id', verifyToken, getDetailUser)

export default userRoute;
