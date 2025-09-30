import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { type JWTPayload } from "../utils/token.utils.js";
import User, { type IUser } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/password.utils.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/token.utils.js";
import getEnv from "../utils/env.utils.js";

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
		const accessToken: string = generateAccessToken({ userId, role });
		const refreshToken: string = generateRefreshToken({ userId, role });

		// store refresh token in db;
		existingUser.refreshToken = refreshToken;
		await existingUser.save();

		// set access and refresh token in httpOnly cookie;
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: getEnv("NODE_ENV") === "production",
			sameSite: getEnv("NODE_ENV") === "production" ? "none" : "lax",
			maxAge: 15 * 60 * 1000, //15min;
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: getEnv("NODE_ENV") === "production",
			sameSite: getEnv("NODE_ENV") === "production" ? "none" : "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000, //7days;
		});
		//then return response;

		return res.status(200).json({
			message: "Login successful",
			user: {
				id: userId,
				name: existingUser.name,
				email: existingUser.email,
				role: existingUser.role,
			},
			// accessToken,
			//refreshToken,
		});
	} catch (error) {
		console.error("Failed to login user", (error as Error).message);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};

interface AuthCookies {
	refreshToken?: string;
}
export const logoutUser = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies as AuthCookies;

		if (!refreshToken) {
			console.log("❌ No refresh token found in cookies");
			return res.status(200).json({
				message: "Logged out",
			});
		}
		// find a user with the refreshToken;
		const user = await User.findOne({ refreshToken: refreshToken });

		if (user) {
			user.refreshToken = null;
			await user.save();
		}

		// clear cookie;
		res.clearCookie("accessToken", {
			httpOnly: true,
			secure: getEnv("NODE_ENV") === "production",
			sameSite: getEnv("NODE_ENV") === "production" ? "none" : "lax",
		});

		return res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Logout failed", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const refreshAccessToken = async (
	req: Request,
	res: Response
): Promise<Response | void> => {
	try {
		const refreshToken: string | undefined = req.cookies["refreshToken"];
		// if cookie is missing;
		if (!refreshToken) {
			return res.status(401).json("No refresh token. Please login");
		}
		// verify refresh token;
		let decoded: JWTPayload;
		try {
			decoded = jwt.verify(
				refreshToken,
				getEnv("REFRESH_SECRET")
			) as JWTPayload;
		} catch (error) {
			const { name } = error as Error & { name?: string };
			if (name === "TokenExpiredError") {
				return res.status(401).json({ error: "Refresh token expired" });
			}
			return res.status(403).json({ error: "Invalid refresh token" });
		}
		const { userId, role } = decoded;

		// compare with the one in db;
		const user = await User.findById(userId).select("refreshToken role");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		if (refreshToken !== user?.refreshToken) {
			return res.status(403).json({ error: "Token mismatch" });
		}
		// if they match generate new tokens;
		const newAccessToken = generateAccessToken({ userId, role });
		const newRefreshToken = generateRefreshToken({ userId, role });
		// rotate refresh token in db;
		user.refreshToken = newRefreshToken;
		await user.save();

		// set token to http-only cookies;
		const isProd = getEnv("NODE_ENV") === "production";
		res.cookie("accessToken", newAccessToken, {
			httpOnly: true,
			secure: isProd,
			sameSite: isProd ? "none" : "lax",
			maxAge: 15 * 60 * 1000, //15 minutes;
		});

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: isProd,
			sameSite: isProd ? "none" : "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7days;
		});

		//return minimal response;
		return res.status(200).json({
			user: {
				id: user._id,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("Error refreshing token :", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};
