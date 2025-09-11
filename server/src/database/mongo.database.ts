import mongoose from "mongoose";
import getEnv from "../utils/env.utils.js";

const connectToMongoDb = async () => {
	try {
		await mongoose
			.connect(getEnv("MONGO_URI"), {
				dbName: "malibaze",
			})
			.then(() => console.log("MongoDB connected to malibaze"));
	} catch (error) {
		console.error("Failed to connect to mongodb", (error as Error).message);
		process.exit(1);
	}
};

export default connectToMongoDb;
