import express from "express";
import { register } from "../controllers/userController";

// Init
const authRouter = express.Router();

// Routing Auth
authRouter.post("/register", register);

export default authRouter;
