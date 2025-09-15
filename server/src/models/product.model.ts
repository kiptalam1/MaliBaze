import mongoose, { Document, Types, Model } from "mongoose";

const ProductSchema = new mongoose.Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		rating: {
			type: Number,
			min: 0,
			max: 5,
		},
	},
	{ timestamps: true }
);

export interface IProduct extends Document {
	_id: Types.ObjectId;
	name: string;
	description: string;
	price: number;
	category: Types.ObjectId;
	rating?: number | null;
}

ProductSchema.index({ category: 1 });
ProductSchema.index({ name: "text", description: "text" });

const Product: Model<IProduct> =
	mongoose.models["Product"] ||
	mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
