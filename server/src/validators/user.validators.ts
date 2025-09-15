import { checkSchema } from "express-validator";

export const userProfileUpdateInputValidators = checkSchema({
	email: {
		optional: { options: { nullable: true } },
		trim: true,
		toLowerCase: true,
		customSanitizer: {
			options: (value) => (value === "" ? undefined : value),
		},
		isEmail: {
			errorMessage: "Input must be a valid email address",
		},
	},
	name: {
		optional: { options: { nullable: true } },
		trim: true,
		escape: true,
		customSanitizer: {
			options: (value) => (value === "" ? undefined : value),
		},
		isLength: {
			options: { min: 3, max: 50 },
			errorMessage: "Name must be between 3 and 50 characters",
		},
	},
});
