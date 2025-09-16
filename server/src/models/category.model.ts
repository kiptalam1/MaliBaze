import mongoose, { Model, Schema, Types } from "mongoose";

// Plain fields only, no Document
export interface ICategory {
	_id: Types.ObjectId;
	name: string;
}

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

const Category: Model<ICategory> =
	(mongoose.models["Category"] as Model<ICategory>) ||
	mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
