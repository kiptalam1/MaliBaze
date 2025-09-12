import mongoose, { Document, Types } from "mongoose";

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
			enum: ["user", "admin"],
			default: "user",
		},
		refreshToken: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

export enum Role {
	User = "user",
	Admin = "admin",
}
export interface IUser extends Document {
	_id: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	role: Role;
	refreshToken?: string | null;
}

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
