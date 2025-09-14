import type { JWTPayload } from "./../utils/token.utils.js";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import getEnv from "../utils/env.utils.js";

export interface AuthenticatedRequest extends Request {
	user?: JWTPayload;
}
export const authenticateUser = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): void | Response => {
	try {
		const token: string | undefined = req.cookies["accessToken"];
		if (!token) {
			return res.status(401).json({
				error: "Access denied. Please login",
			});
		}
		const decoded = jwt.verify(token, getEnv("ACCESS_SECRET")) as JWTPayload;
		req.user = decoded;
		next();
	} catch (error) {
		if ((error as Error).name === "TokenExpiredError") {
			return res
				.status(401)
				.json({ error: "Token expired. Please login again." });
		}
		if ((error as Error).name === "JsonWebTokenError") {
			return res
				.status(401)
				.json({ error: "Invalid token. Please login again" });
		}
		console.error("Error authenticating user", (error as Error).message);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};

export const isAdmin = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Response | void => {
	if (req.user?.role !== "admin") {
		return res.status(403).json({ error: "Unauthorized" });
	}
	next();
};
