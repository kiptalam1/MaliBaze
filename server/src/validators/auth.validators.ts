import { checkSchema } from "express-validator";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

export const userLoginInputValidators = checkSchema({
	email: {
		trim: true,
		toLowerCase: true,
		notEmpty: { errorMessage: "Email is required" },
		isEmail: { errorMessage: "Input must be a valid email address" },
		normalizeEmail: true,
	},
	password: {
		trim: true,
		notEmpty: { errorMessage: "Password is required" },
		isLength: {
			options: { min: 8 },
			errorMessage: "Password must be at least 8 characters long",
		},
		matches: {
			options: passwordRegex,
			errorMessage:
				"Password must contain at least one uppercase letter, one number, and one special character",
		},
	},
});

export const userSignUpInputValidators = checkSchema({
	email: {
		toLowerCase: true,
		trim: true,
		notEmpty: { errorMessage: "Email is required" },
		isEmail: { errorMessage: "Input must be a valid email address" },
		normalizeEmail: true,
	},
	name: {
		notEmpty: { errorMessage: "Name is required" },
		isLength: {
			options: { min: 3, max: 50 },
			errorMessage: "Name must be between 3 and 50 characters",
		},
		trim: true,
		escape: true,
	},
	password: {
		trim: true,
		notEmpty: { errorMessage: "Password is required" },
		isLength: {
			options: { min: 8 },
			errorMessage: "Password must be at least 8 characters long",
		},
		matches: {
			options: passwordRegex,
			errorMessage:
				"Password must contain at least one uppercase letter, one number, and one special character",
		},
	},
});
