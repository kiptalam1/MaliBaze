import { checkSchema } from "express-validator";

export const createProductValidators = checkSchema({
	name: {
		notEmpty: {
			errorMessage: "Product name is required",
		},
		isLength: {
			options: {
				min: 2,
				max: 50,
			},
			errorMessage: "Name must be between 3 - 50 characters long",
		},
		trim: true,
		escape: true,
	},
	description: {
		notEmpty: {
			errorMessage: "Describe the product",
		},
		trim: true,
	},
	price: {
		notEmpty: {
			errorMessage: "Enter price",
		},
		isNumeric: {
			errorMessage: "Price must be a number",
		},
	},
	category: {
		trim: true,
		notEmpty: {
			errorMessage: "Enter product category",
		},
	},
});
