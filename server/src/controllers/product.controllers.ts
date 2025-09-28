import type { Request, Response } from "express";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import Product from "../models/product.model.js";
import Category, { type ICategory } from "../models/category.model.js";
import { generateSKU } from "../utils/product.utils.js";
import { findOrCreateCategory } from "../utils/category.utils.js";

interface CreateProductDTO {
	name: string;
	description: string;
	price: number;
	category: string; // category name from request
	sku?: string;
	imageUrl: string;
}

export const createProduct = async (
	req: Request<{}, {}, CreateProductDTO>,
	res: Response
): Promise<Response | void> => {
	try {
		const {
			name: productName,
			description,
			price,
			category,
			sku,
			imageUrl,
		} = req.body;

		// Ensure category exists
		let categoryDoc: ICategory | null = await findOrCreateCategory(category);

		// Generate SKU if not provided
		const generatedSKU = await generateSKU(categoryDoc.name, productName);
		// Create product using category _id
		const product = await Product.create({
			name: productName,
			description,
			price,
			category: categoryDoc._id,
			sku: sku || generatedSKU,
			imageUrl,
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
	req: Request<
		{},
		{},
		{},
		{ category: string; page: string; limit: string; search: string }
	>,
	res: Response
): Promise<Response | void> => {
	try {
		const { category, search } = req.query;
		const page: number = Math.max(1, parseInt(req.query.page, 10) || 1);
		const limit: number = Math.min(
			100,
			Math.max(1, parseInt(req.query.limit, 10) || 20)
		);
		const skip = (page - 1) * limit;

		const filter: any = {};
		// add search query filter if provided;

		if (search) {
			// name or description is included in regex;
			const regex = { $regex: search, $options: "i" };
			filter.$or = [{ name: regex }, { description: regex }];
		}
		// when category is in query, find the category then create filter;
		if (category) {
			const categoryDoc = await Category.findOne({
				name: { $regex: category, $options: "i" },
			}).select("_id");
			if (!categoryDoc) {
				return res.status(404).json({ message: "This category was not found" });
			}
			filter.category = categoryDoc._id;
		}

		// fetch products based on the category filter with pagination;
		const products = await Product.find(filter)
			.populate("category", "name")
			.select("-__v -updatedAt")
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });

		// count total products;
		const total = await Product.countDocuments(filter);
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

export const getSingleProduct = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid product ID" });
	}

	try {
		const product = await Product.findById(id)
			.populate("category", "name")
			.select("-__v -updatedAt");
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		return res.status(200).json({
			product,
		});
	} catch (error) {
		console.error("Error fetching product", (error as Error).message);
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
	imageUrl?: string;
}

export const updateProduct = async (
	req: Request<{ id: string }, {}, UpdateProductDTO>,
	res: Response
): Promise<Response | void> => {
	try {
		const productId = req.params.id;
		// check if id is of objectId;
		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		// fields to update;
		const { name, description, price, sku, category, imageUrl } = req.body;
		const formattedSKU = sku?.replace(/\s+/g, "").toUpperCase();
		// ensure category exists if provided;
		let categoryDoc: ICategory | null = null;
		if (category) {
			categoryDoc = await findOrCreateCategory(category);
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{
				name,
				description,
				price,
				sku: formattedSKU,
				category: categoryDoc?._id,
				imageUrl,
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
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteProduct = async (
	req: Request<{ id: string }>,
	res: Response
): Promise<Response | void> => {
	try {
		const productId = req.params.id;
		// check if id is of objectId;
		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}
		// check if product has been deleted or not exists;
		const product = await Product.findById(productId).select("_id");
		if (!product) {
			return res.status(404).json({ error: "Product no longer exists" });
		}
		// if product is found, delete and return;
		const productDeleted = await Product.findByIdAndDelete(productId, {
			returnDocument: "after",
		}).populate("category", "name");

		return res.status(200).json({
			message: "Product deleted successfully",
			product: productDeleted,
		});
	} catch (error) {
		console.error("Error deleting product", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

