import { checkSchema } from "express-validator";

export const userAuthInputValidators = checkSchema({
	email: {
		notEmpty: {
			errorMessage: "Email is required",
		},
		isEmail: {
			errorMessage: "Input must be a valid email address",
		},
		normalizeEmail: true,
		matches: {
			options: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
			errorMessage: "Email format is invalid",
		},
	},
	name: {
		notEmpty: {
			errorMessage: "Name is required",
		},
		isLength: {
			options: { min: 3, max: 50 },
			errorMessage: "Name must be between 3 and 50 characters",
		},
		trim: true,
		escape: true,
	},
	password: {
		notEmpty: {
			errorMessage: "Password is required",
		},
		isLength: {
			options: { min: 8 },
			errorMessage: "Password must be atleast 8 characters long",
		},
		matches: {
			options: [/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/],
			errorMessage:
				"Password must contain at least one uppercase letter, one number, and one special character",
		},
	},
});
