import type { AuthenticatedRequest } from "../middlewares/auth.middlewares.js";
import User, { type IUser } from "../models/user.model.js";
import type { Response } from "express";

export const getMyProfile = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	const userId = req.user?.userId;
	try {
		// find user from mongodb;
		const user: IUser = await User.findById(userId).select(
			"-password -refreshToken -__v -updatedAt -createdAt"
		);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		// if user is found, return response;
		return res.status(200).json({
			user,
		});
	} catch (error) {
		console.error("Error fetching user profile", (error as Error).message);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};
