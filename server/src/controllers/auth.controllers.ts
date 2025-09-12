import type { Request, Response } from "express";
// import type { Types } from "mongoose";
// import { type JWTPayload } from "../utils/token.utils.js";
import User, { type IUser } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/password.utils.js";
import { generateWebToken } from "../utils/token.utils.js";

interface LoginFields {
	email: string;
	password: string;
}
interface RegisterFields extends LoginFields {
	name: string;
}

export const registerUser = async (
	req: Request,
	res: Response
): Promise<Response | void> => {
	const { email, name, password }: RegisterFields = req.body;

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			// Early return ensures no further code runs
			return res.status(400).json({
				error: "This email is already registered. Please log in",
			});
		}
		// Hash password
		const hashedPassword = await hashPassword(password, 12);

		// Create new user
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();

		// Exclude password before sending response
		const { password: _, ...userData } = newUser.toObject();
		return res.status(201).json({
			user: userData,
			message: "Account created successfully",
		});
	} catch (error) {
		console.error("Failed to register user", (error as Error).message);
		if (!res.headersSent) {
			return res.status(500).json({
				error: "Internal server error",
			});
		}
	}
};

export const loginUser = async (
	req: Request,
	res: Response
): Promise<Response | void> => {
	const { email, password }: LoginFields = req.body;

	try {
		// check if user is registered;
		const existingUser = await User.findOne({ email }).select(
			"_id email name role password"
		);
		if (!existingUser) {
			return res.status(404).json({
				error: "User not found. Please sign up",
			});
		}
		//then check if they provide correct password;
		const isPasswordMatch = await comparePassword(
			password,
			existingUser.password
		);
		if (!isPasswordMatch) {
			return res.status(403).json({
				error: "Wrong password",
			});
		}

		// otherwise provide a token;
		const { _id, role }: IUser = existingUser;
		const userId: string = _id.toString();
		const token: string = generateWebToken({ userId, role });
		//then return response;
		const { password: _, ...userData } = existingUser.toObject();
		return res.status(200).json({
			message: "Login successful",
			user: userData,
			token,
		});
	} catch (error) {
		console.error("Failed to login user", (error as Error).message);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};
