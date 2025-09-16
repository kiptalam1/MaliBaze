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
			errorMessage: "Name must be between 2 - 50 characters long",
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
		custom: {
			options: (value) => parseFloat(value) > 0,
			errorMessage: "Price must be greater than 0",
		},
	},
	category: {
		trim: true,
		notEmpty: {
			errorMessage: "Enter product category",
		},
	},
	sku: {
		optional: true,
		isLength: {
			options: { min: 5, max: 25 },
			errorMessage:
				"SKU must be between 5 - 25 characters long and separated by '-'",
		},
		trim: true,
		escape: true,
	},
});

export const updateProductValidators = checkSchema({
	name: {
		optional: true,
		isLength: {
			options: { min: 2, max: 50 },
			errorMessage: "Name must be between 2 - 50 characters long",
		},
		trim: true,
		escape: true,
	},
	description: {
		optional: true,
		isLength: {
			options: { min: 5, max: 500 },
			errorMessage: "Description must be between 5 - 500 characters long",
		},
		trim: true,
	},
	price: {
		optional: true,
		isNumeric: {
			errorMessage: "Price must be a number",
		},
		custom: {
			options: (value) => parseFloat(value) > 0,
			errorMessage: "Price must be greater than 0",
		},
	},
	category: {
		optional: true,
		trim: true,
		isLength: {
			options: { min: 2, max: 40 },
			errorMessage: "Category name must be between 2 - 40 characters long",
		},
	},
	sku: {
		optional: true,
		isLength: {
			options: { min: 5, max: 25 },
			errorMessage:
				"SKU must be between 5 - 25 characters long and separated by '-'",
		},
		trim: true,
		escape: true,
	},
});
