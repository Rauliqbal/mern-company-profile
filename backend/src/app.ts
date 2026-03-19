import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookiesParser from "cookie-parser";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import router from "./routes";

const app = express();

// Middlewares
const config = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));
app.use(cookiesParser());
app.use(morgan("dev"));
app.use(helmet());

// Routing
app.use("/api", router);
app.get("/", (req, res) => res.json({ message: "API is running" }));

// Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
