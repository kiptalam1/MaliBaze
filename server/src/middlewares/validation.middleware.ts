import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputValidation = (
	req: Request,
	res: Response,
	next: NextFunction
): void | Response => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const firstError = errors.array()[0]?.msg;
		return res.status(400).json({
			error: firstError,
		});
	}
	next();
};
