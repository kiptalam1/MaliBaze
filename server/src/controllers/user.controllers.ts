import type { AuthenticatedRequest } from "../middlewares/auth.middlewares.js";
import User, { type IUser } from "../models/user.model.js";
import type { Response } from "express";
import type { JWTPayload } from "../utils/token.utils.js";

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

// utility to remove undefined keys from req.body;
function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, v]) => v !== undefined)
	) as Partial<T>;
}

export const updateMyProfile = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	const { userId } = req.user as JWTPayload;

	try {
		// check if user exists;
		const user = await User.findById(userId).select(
			"-password -__v -refreshToken"
		);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// sanitize update fields;
		const updates = removeUndefined({
			name: req.body.name,
			email: req.body.email,
		});

		//filter out unchanged fields;
		const effectiveUpdates: Partial<typeof updates> = {};
		for (const key of Object.keys(updates) as (keyof typeof updates)[]) {
			if (updates[key] !== user[key]) {
				effectiveUpdates[key] = updates[key];
			}
		}

		// if email is being updated check uniqueness;
		if (effectiveUpdates.email) {
			const emailExists = await User.findOne({
				email: effectiveUpdates.email,
				_id: { $ne: userId },
			}).select("_id");

			if (emailExists) {
				return res
					.status(400)
					.json({ error: "This email already exists. Try another email" });
			}
		}

		// if no more updates left, skip DB call;
		if (Object.keys(effectiveUpdates).length === 0) {
			return res.status(400).json({
				error: "No changes made",
			});
		}

		// else proceed;
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				$set: effectiveUpdates,
			},
			{
				returnDocument: "after",
			}
		).select("-password -refreshToken -__v");

		return res.status(200).json({
			message: "Profile updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Error updating user profile", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};
