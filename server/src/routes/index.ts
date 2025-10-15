import express from "express";
import authRouter from "./authRoute";

// Init
const router = express.Router();

// Routing
router.use("/auth", authRouter);

export default router;
