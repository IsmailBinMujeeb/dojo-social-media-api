import express from "express";
import cors from "cors";
import helmet from "helmet";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import cookieParser from "cookie-parser";

// Importing routes
import userRouter from "./routes/api/v1/user.routes.js";
import postRouter from "./routes/api/v1/post.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle CORS and security headers
app.set("port", PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(cors({ origin: process.env.CORS_ORIGIN, methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(helmet());

// Middleware to handle routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

export default app;