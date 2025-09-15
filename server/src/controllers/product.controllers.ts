import type { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import Product from "../models/product.model.js";
import Category, { type CategoryDocument } from "../models/category.model.js";
import type mongoose from "mongoose";
import { generateSKU } from "../utils/product.utils.js";

interface CreateProductDTO {
	name: string;
	description: string;
	price: number;
	category: string; // category name from request
	sku?: string;
}

export const createProduct = async (
	req: Request<{}, {}, CreateProductDTO>,
	res: Response
): Promise<Response | void> => {
	try {
		const { name: productName, description, price, category, sku } = req.body;

		// Ensure category exists
		const CategoryModel = Category as mongoose.Model<CategoryDocument>;
		let categoryDoc: CategoryDocument | null = await CategoryModel.findOne({
			name: category,
		});
		if (!categoryDoc) {
			categoryDoc = new CategoryModel({ name: category }) as CategoryDocument;
			await categoryDoc.save();
		}

		const generatedSKU = await generateSKU(categoryDoc.name, productName);
		// Create product using category _id
		const product = await Product.create({
			name: productName,
			description,
			price,
			category: categoryDoc._id,
			sku: sku || generatedSKU,
		});

		const products = await Product.find()
			.select("_id sku")
			.sort({ createdAt: -1 });

		console.log("products", products);

		return res.status(201).json({
			message: "Product created successfully",
			product,
		});
	} catch (error: unknown) {
		if (error instanceof MongoServerError && error.code === 11000) {
			return res.status(400).json({ error: "SKU must be unique" });
		}

		console.error("Error creating product", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};
