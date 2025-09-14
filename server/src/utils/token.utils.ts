import jwt from "jsonwebtoken";
import getEnv from "./env.utils.js";
// import User from "../models/user.model.js";

export interface JWTPayload {
	userId: string;
	role: string;
}
export const generateAccessToken = ({ userId, role }: JWTPayload): string => {
	return jwt.sign({ userId, role }, getEnv("ACCESS_SECRET"), {
		expiresIn: "15m",
	});
};

export const generateRefreshToken = ({ userId, role }: JWTPayload): string => {
	return jwt.sign({ userId, role }, getEnv("REFRESH_SECRET"), {
		expiresIn: "7d",
	});
};

