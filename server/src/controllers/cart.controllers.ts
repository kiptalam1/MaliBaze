import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { AuthenticatedRequest } from "../middlewares/auth.middlewares.js";
import Product from "../models/product.model.js";
import Cart, { type ICartProduct } from "../models/cart.model.js";

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