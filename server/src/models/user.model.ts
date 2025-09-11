import mongoose, { Document } from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			default: "user",
		},
	},
	{ timestamps: true }
);

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: String;
}

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
