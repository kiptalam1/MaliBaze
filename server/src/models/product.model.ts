import mongoose, { Document, Types, Model } from "mongoose";

export interface IProduct extends Document {
	_id: Types.ObjectId;
	name: string;
	description: string;
	price: number;
	category: Types.ObjectId;
	rating?: number | null;
	sku: string;
}

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
		sku: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ name: "text", description: "text" });
ProductSchema.index({ sku: 1 }, { unique: true });


const Product: Model<IProduct> =
	mongoose.models["Product"] ||
	mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
