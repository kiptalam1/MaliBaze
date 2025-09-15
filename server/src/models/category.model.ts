import mongoose, { Schema, Types, type HydratedDocument } from "mongoose";

// Plain fields only, no Document
export interface ICategory {
	_id: Types.ObjectId;
	name: string;
}

// Hydrated version used at runtime
export type CategoryDocument = HydratedDocument<ICategory>;

const CategorySchema = new Schema<ICategory>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

const Category =
	mongoose.models["Category"] ||
	mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
