import express from "express";
import { login, register } from "../controllers/userController";

// Init
const authRouter = express.Router();

// Routing Auth
authRouter.post("/register", register);
authRouter.post('/login',login)

export default authRouter;
