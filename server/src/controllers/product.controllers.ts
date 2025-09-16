import type { Request, Response } from "express";
import { MongoServerError } from "mongodb";
import Product from "../models/product.model.js";
import Category, { type ICategory } from "../models/category.model.js";
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
		let categoryDoc: ICategory | null = await Category.findOne({
			name: category,
		});
		if (!categoryDoc) {
			categoryDoc = await Category.create({ name: category });
		}

		// Generate SKU if not provided
		const generatedSKU = await generateSKU(categoryDoc.name, productName);
		// Create product using category _id
		const product = await Product.create({
			name: productName,
			description,
			price,
			category: categoryDoc._id,
			sku: sku || generatedSKU,
		});

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

export const getAllProducts = async (
	req: Request,
	res: Response
): Promise<Response | void> => {
	try {
		const page: number = Math.max(
			1,
			parseInt(req.query["page"] as string, 10) || 1
		);
		const limit: number = Math.min(
			100,
			Math.max(1, parseInt(req.query["limit"] as string, 10) || 20)
		);
		const skip = (page - 1) * limit;

		// count total products;
		const total = await Product.estimatedDocumentCount();

		// fetch products with pagination;
		const products = await Product.find()
			.populate("category", "name")
			.select("-__v -updatedAt")
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });

		// pagination metadata;
		const totalPages = Math.ceil(total / limit);

		return res.status(200).json({
			page,
			limit,
			total,
			totalPages,
			products,
		});
	} catch (error) {
		console.error("Error fetching products", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

interface UpdateProductDTO {
	// id: string;
	name?: string;
	description?: string;
	price?: number;
	category?: string;
	sku?: string;
}

export const updateProduct = async (
	req: Request<{ id: string }, {}, UpdateProductDTO>,
	res: Response
): Promise<Response | void> => {
	try {
		const productId = req.params.id;

		// fields to update;
		const { name, description, price, sku, category } = req.body;
		const formattedSKU = sku?.replace(/\s+/g, "").toUpperCase();
		// ensure category exists if provided;
		let categoryDoc: ICategory | null = null;
		if (category) {
			categoryDoc = await Category.findOne({
				name: category,
			});
			if (!categoryDoc) {
				categoryDoc = await Category.create({
					name: category,
				});
			}
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{
				name,
				description,
				price,
				sku: formattedSKU,
				category: categoryDoc?._id,
			},
			{ returnDocument: "after" }
		).populate("category", "name");

		return res.status(200).json({
			message: "Product updated successfully",
			product: updatedProduct,
		});
	} catch (error) {
		if (error instanceof MongoServerError && error.code === "11000") {
			return res.status(400).json({ error: "SKU must be unique" });
		}
		console.error("Error updating product", (error as Error).message);
	}
};