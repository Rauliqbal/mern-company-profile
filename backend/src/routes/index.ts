import express from "express";
import authRouter from "./authRoute";
import userRoute from "./userRoute";
import { verifyToken } from "../middlewares/auth";

// Init
const router = express.Router();

// Routing
router.use("/auth", authRouter);
router.use('/user',userRoute)

export default router;
