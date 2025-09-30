import { type Request, type Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middlewares.js";
import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import User from "../models/user.model.js";
import Cart, { type ICart } from "../models/cart.model.js";
import Order, { type OrderDocument } from "../models/order.model.js";
import type { IProduct } from "../models/product.model.js";

type PlaceOrderBody = {
	destination: string;
	shippingMethod: "express" | "standard";
};
export const placeOrder = async (
	req: Request & AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	const { destination, shippingMethod }: PlaceOrderBody = req.body;
	const userId = req.user?.userId;
	if (!mongoose.Types.ObjectId.isValid(String(userId))) {
		return res.status(400).json({ error: "Invalid user ID" });
	}
	try {
		// check if user exists;
		const user = await User.findById(userId).select("-password").lean();
		if (!user) {
			return res.status(404).json({ error: "User not found. Please signup." });
		}

		const cart: ICart | null = await Cart.findOne({
			user: userId,
		}).populate({
			path: "products.product",
			select: "_id name price",
		});
		if (!cart || cart.products.length === 0) {
			return res.status(400).json({ error: "Cart is empty" });
		}

		// filter out invalid/null products
		const validProducts = cart.products.filter((p) => p.product !== null);

		if (validProducts.length !== cart.products.length) {
			// clean cart in DB so bad refs don’t keep breaking things
			cart.products = validProducts;
			await cart.save();
		}

		if (validProducts.length === 0) {
			return res.status(400).json({
				error: "Your cart has invalid items. Please add products again.",
			});
		}
		// create an order with info;
		const totalAmount = validProducts.reduce((sum, p) => {
			const prod = p.product as IProduct;
			return sum + prod.price * p.quantity;
		}, 0);
		const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);

		const order = new Order({
			user: user._id,
			items: validProducts.map((p) => {
				const prod = p.product as IProduct;
				return {
					product: prod._id,
					name: prod.name,
					quantity: p.quantity,
					price: prod.price,
				};
			}),
			destination: destination,
			shippingMethod: shippingMethod || "standard",
			trackingNumber: `TRK-${Date.now()}`,
			status: "processing",
			payment: { status: "pending" },
			orderNumber: `ORD-${new Date().getFullYear()}-${nanoid()}`,
			totalAmount: totalAmount,
		}) as OrderDocument;

		await order.save();
		// clear cart;
		cart.products = [];
		await cart.save();

		return res.status(201).json({
			message: "Order placed successfully",
			order,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error placing order:", error.message);
		} else {
			console.error("Unknown error placing order:", error);
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};


export const getMyOrders = async (
	req: Request & AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	try {
		const userId = req.user?.userId;
		if (!mongoose.Types.ObjectId.isValid(String(userId))) {
			return res.status(400).json({ error: "Invalid user ID" });
		}

		const orders = await Order.find({ user: userId })
			.populate("items.product", "name price imageUrl")
			.lean()
			.sort({ createdAt: -1 });

		return res.status(200).json({ orders });
	} catch (error) {
		console.error("Error getting my orders:", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllOrders = async (
	_req: Request & AuthenticatedRequest,
	res: Response
): Promise<Response | void> => {
	try {
		const orders = await Order.find()
			.populate("user", "name email")
			.populate("items.product", "name price imageUrl")
			.lean()
			.sort({ createdAt: -1 });

		return res.status(200).json({ orders });
	} catch (error) {
		console.error("Error getting all orders:", (error as Error).message);
		return res.status(500).json({ error: "Internal server error" });
	}
};
