import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

// functions;
import connectToMongoDb from "./database/mongo.database.js";
import getEnv from "./utils/env.utils.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
const app = express();

// connect to database;
connectToMongoDb();

// middleware;
const allowedOrigins = ["http://localhost:3000"];
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes;
app.get("/", (_req: Request, res: Response) => {
	res.json({
		message: "Welcome to MaliBaze",
	});
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);



const PORT = getEnv("PORT") || 5000;
app.listen(PORT, () => {
	console.log(`server running at port ${PORT}`);
});
