import {Router} from "express";
import { login, register } from "../controllers/authController";

// Init
const authRouter = Router();

// Routing Auth
authRouter.post("/register", register);
authRouter.post('/login',login)

export default authRouter;
