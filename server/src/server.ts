import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

// functions;
import connectToMongoDb from "./database/mongo.database.js";
import getEnv from "./utils/env.utils.js";
import authRoutes from "./routes/auth.routes.js";
const app = express();

// connect to database;
connectToMongoDb();

// middleware;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes;
app.get("/", (_req: Request, res: Response) => {
	res.json({
		message: "Welcome to MaliBaze",
	});
});
app.use("/api/auth", authRoutes);


const PORT = getEnv("PORT") || 5000;
app.listen(PORT, () => {
	console.log(`server running at port ${PORT}`);
});
