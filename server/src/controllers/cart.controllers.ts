import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { AuthenticatedRequest } from "../middlewares/auth.middlewares.js";
import Product from "../models/product.model.js";
import Cart, { type ICartProduct } from "../models/cart.model.js";

export const addProductToCart = async (
	req: Request<{ id: string }> & AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	try {
		const userId = req.user?.userId;
		const { id: productId } = req.params;
		const quantityToAdd = 1; // always add 1 by default

		if (!userId) {
			return res.status(400).json({ error: "Please login" });
		}

		if (!productId) {
			return res.status(400).json({ error: "Product ID is required" });
		}

		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		const product = await Product.findById(productId).select("_id name price");

		if (!product) {
			return res.status(404).json({ error: "This product no longer exists" });
		}

		let cart = await Cart.findOne({ user: userId }).populate({
			path: "products.product",
			select: "_id name price",
		});

		if (!cart) {
			cart = await Cart.create({ user: userId, products: [] });
		}

		// Remove invalid products
		cart.products = cart.products.filter(function (item) {
			return (
				item !== undefined &&
				item.product !== undefined &&
				item.product !== null
			);
		});

		const productIndex = cart.products.findIndex(function (item) {
			const prodId =
				item.product instanceof mongoose.Types.ObjectId
					? item.product.toString()
					: (item.product as any)?._id?.toString();
			return prodId === productId;
		});

		if (productIndex > -1) {
			const cartProduct = cart.products[productIndex];
			if (cartProduct !== undefined && cartProduct.product !== undefined) {
				cartProduct.quantity = (cartProduct.quantity ?? 0) + quantityToAdd;
			} else {
				// fallback in case product is invalid
				cart.products.push({
					product: product._id,
					quantity: quantityToAdd,
				} as ICartProduct);
			}
		} else {
			// first time adding product, quantity defaults to 1
			cart.products.push({
				product: product._id,
				quantity: quantityToAdd,
			} as ICartProduct);
		}

		await cart.save();

		// Re-fetch populated cart
		cart = await Cart.findOne({ user: userId }).populate({
			path: "products.product",
			select: "_id name price",
		});

		if (!cart) {
			return res.status(500).json({ error: "Cart not found after update" });
		}

		// Filter invalid products again after re-fetch
		cart.products = cart.products.filter(function (item) {
			return (
				item !== undefined &&
				item.product !== undefined &&
				item.product !== null
			);
		});

		const totalQuantity = cart.products.reduce(function (sum, item) {
			return sum + (item.quantity ?? 0);
		}, 0);

		const totalAmount = cart.products.reduce(function (sum, item) {
			const price = (item.product as any)?.price ?? 0;
			return sum + (item.quantity ?? 0) * price;
		}, 0);

		return res.status(200).json({
			message: "Product added to cart",
			cart: {
				...cart.toObject(),
				totalQuantity,
				totalAmount,
			},
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
			return res.status(401).json({ error: "Unauthorized. Please login" });
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

export const incrementProductQuantity = async (
	req: Request<{ id: string }> & AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	const { id: productId } = req.params;
	const userId = req.user?.userId;

	try {
		if (!userId) {
			return res.status(401).json({ error: "Unauthorized. Please login." });
		}

		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}
		const productInCart = cart.products.find(
			(p) => p.product.toString() === productId
		);
		if (!productInCart) {
			return res.status(404).json({ error: "Product not in cart" });
		}
		productInCart.quantity += 1;
		await cart.save();

		return res.status(200).json({
			cart,
		});
	} catch (error) {
		console.error(
			"Error in incrementProductQuantity",
			(error as Error).message
		);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const decrementProductQuantity = async (
	req: Request<{ id: string }> & AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	const { id: productId } = req.params;
	const userId = req.user?.userId;
	try {
		if (!userId) {
			return res.status(401).json({ error: "Unauthorized. Please login." });
		}

		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}
		const productIndex = cart.products.findIndex(
			(p) => p.product.toString() === productId
		);
		if (productIndex === -1) {
			return res.status(404).json({ error: "Product not in cart" });
		}

		const product = cart.products[productIndex];
		if (!product) {
			return res.status(404).json({ error: "Product not in cart" });
		}

		if (product.quantity > 1) {
			// decrement quantity;
			product.quantity -= 1;
		} else {
			cart.products.splice(productIndex, 1);
		}
		await cart.save();
		return res.status(200).json({
			message: "Product quantity decremented",
			cart,
		});
	} catch (error) {
		console.error(
			"Error in decrementProductQuantity",
			(error as Error).message
		);
		return res.status(500).json({ error: "Internal server error" });
	}
};


export const getUserCart = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	try {
		const userId = req.user?.userId;

		if (!userId) {
			return res.status(401).json({ error: "Access denied. Please login" });
		}

		const cart = await Cart.findOne({ user: userId }).populate({
			path: "products.product",
			select: "name price imageUrl category rating",
			populate: {
				path: "category",
				select: "name",
			},
		});

		if (!cart) {
			return res.status(200).json({
				cart: {
					user: userId,
					products: [],
					totalQuantity: 0,
					uniqueItems: 0,
					totalAmount: 0,
				},
			});
		}
		// calculate counts;
		const totalQuantity = cart.products.reduce(
			(sum, item) => sum + item.quantity,
			0
		);

		const uniqueItems = cart.products.length;

		const totalAmount = cart.products.reduce((sum, item) => {
			const product = item.product as unknown as {
				name: string;
				price: number;
			};
			return sum + (product?.price || 0) * item.quantity;
		}, 0);

		return res.status(200).json({
			cart: {
				...cart.toObject(),
				totalQuantity,
				uniqueItems,
				totalAmount,
			},
		});
	} catch (error) {
		console.error(
			"Error in decrementProductQuantity",
			(error as Error).message
		);
		return res.status(500).json({ error: "Internal server error" });
	}
};