import jwt from "jsonwebtoken";
import getEnv from "./env.utils.js";

export interface JWTPayload {
	userId: string;
	role: string;
}
export const generateWebToken = ({ userId, role }: JWTPayload): string => {
	return jwt.sign({ userId, role }, getEnv("ACCESS_SECRET"), {
		expiresIn: "15m",
	});
};
