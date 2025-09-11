import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

// functions;
import connectToMongoDb from "./database/mongo.database.js";
import getEnv from "./utils/env.utils.js";

const app = express();

// connect to database;
connectToMongoDb();

// middleware;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = getEnv("PORT") || 5000;
app.listen(PORT, () => {
	console.log(`server running at port ${PORT}`);
});
