import type { Request, Response } from "express";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import Product from "../models/product.model.js";
import Category, { type ICategory } from "../models/category.model.js";
import { generateSKU } from "../utils/product.utils.js";
import { findOrCreateCategory } from "../utils/category.utils.js";
import type { AuthenticatedRequest } from "../middlewares/auth.middlewares.js";
import type { ICartProduct } from "../models/cart.model.js";
import Cart from "../models/cart.model.js";

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
			const categoryDoc = await Category.findOne({ name: category }).select(
				"_id"
			);
			if (!categoryDoc) {
				return res.status(404).json({ error: "This category was not found" });
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
		// check if id is of objectId;
		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		// fields to update;
		const { name, description, price, sku, category } = req.body;
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

export const addProductToCart = async (
	req: Request<{ id: string }, {}, { quantity?: string }> &
		AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	try {
		const userId = req.user?.userId;
		const { id: productId } = req.params;
		const quantity = Number(req.body.quantity) || 1;

		if (!userId) {
			return res.status(400).json({ error: "Please login" });
		}
		if (!productId) {
			return res.status(400).json({ error: "Product ID is required" });
		}

		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}
		// check if product exists;
		const product = await Product.findById(productId).select("_id name");
		if (!product) {
			return res.status(404).json({ error: "This product no longer exists" });
		}

		// find user's cart or create one;
		let cart = await Cart.findOne({
			user: userId,
		});
		if (!cart) {
			cart = await Cart.create({
				user: userId,
				products: [],
			});
		}
		// find if the index of the product in the cart;
		const productIndex = cart.products.findIndex(
			(item) => item.product.toString() === productId
		);
		// if this product is in cart, then increase the quantity;
		if (productIndex > -1) {
			const cartProduct = cart.products[productIndex];
			if (cartProduct) {
				cartProduct.quantity += quantity;
			}
		} else {
			// if this product is not in the cart, add it as  new product;
			cart.products.push({
				product: product._id,
				quantity,
			} as ICartProduct);
		}
		// save the updated cart;
		await cart.save();

		return res.status(200).json({
			message: "Product added to cart",
			cart,
		});
	} catch (error) {
		console.error("Error adding product to cart", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const removeProductFromCart = async (
	req: Request<{ id: string }> & AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	try {
		const userId = req.user?.userId;
		const { id: productId } = req.params;

		if (!userId) {
			return res.status(400).json({ error: "Unauthorized. Please login" });
		}

		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}

		// if cart is there then find the product;
		const productIndex = cart.products.findIndex(
			(p) => p.product.toString() === productId
		);
		if (productIndex === -1) {
			return res.status(404).json({ error: "Product not in cart" });
		}
		cart.products.splice(productIndex, 1);
		await cart.save();

		return res.status(200).json({
			message: "Product removed from cart",
			cart,
		});
	} catch (error) {
		console.error("Error removing product from cart", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};