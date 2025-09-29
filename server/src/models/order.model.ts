import mongoose, { Document } from "mongoose";

type OrderItem = {
	product: mongoose.Types.ObjectId;
	name: string;
	price: number;
	quantity: number;
};

type PaymentInfo = {
	method?: string;
	transactionId?: string;
	status: "pending" | "completed" | "failed";
};

export type OrderDocument = Document & {
	orderNumber: string;
	user: mongoose.Types.ObjectId;
	items: OrderItem[];
	destination: string;
	shippingMethod: "express" | "standard";
	trackingNumber: string;
	status: "processing" | "paid" | "shipped" | "delivered" | "cancelled";
	payment: PaymentInfo;
	totalAmount: number;
	createdAt: Date;
	updatedAt: Date;
};

const OrderSchema = new mongoose.Schema<OrderDocument>(
	{
		orderNumber: {
			type: String,
			required: true,
			unique: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				name: String,
				price: Number,
				quantity: Number,
			},
		],
		destination: {
			type: String,
			required: true,
		},
		shippingMethod: {
			type: String,
			enum: ["express", "standard"],
			default: "standard",
		},
		trackingNumber: {
			type: String,
			required: true,
			unique: true,
			sparse: true,
		},
		status: {
			type: String,
			enum: ["processing", "paid", "shipped", "delivered", "cancelled"],
			default: "processing",
		},
		payment: {
			method: {
				type: String,
			},
			transactionId: { type: String },
			status: {
				type: String,
				enum: ["pending", "completed", "failed"],
				default: "pending",
			},
		},
		totalAmount: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
export default Order;
