import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import router from "./routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routing
app.use("/api", router);
app.get("/", (req, res) => res.json({ message: "API is running" }));

// Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
