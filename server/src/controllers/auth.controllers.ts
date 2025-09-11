import type { Request, Response } from "express";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/password.utils.js";

interface RegisterFields {
	email: string;
	name: string;
	password: string;
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
