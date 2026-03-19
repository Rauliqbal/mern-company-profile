import express from "express";
import authRouter from "./authRoute";
import userRoute from "./userRoute";
import serviceRoute from "./serviceRoute";

const router = express.Router();

// Routing
router.use("/auth", authRouter);
router.use("/user", userRoute);
router.use("/service", serviceRoute);

export default router;
