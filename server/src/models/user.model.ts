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
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
