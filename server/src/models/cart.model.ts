import mongoose, { Model } from "mongoose";

const CartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1, // quantity must be at least 1;
					default: 1,
				},
			},
		],
	},
	{ timestamps: true }
);

export interface ICartProduct {
	_id?: mongoose.Types.ObjectId;
	product: mongoose.Types.ObjectId;
	quantity: number;
}

export interface ICart {
	_id: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	products: ICartProduct[];
}

const Cart: Model<ICart> =
	(mongoose.models["Cart"] as Model<ICart>) ||
	mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
