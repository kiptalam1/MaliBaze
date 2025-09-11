import bcrypt from "bcrypt";

export const hashPassword = async (
	password: string,
	salt: number
): Promise<string> => {
	return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
	password: string,
	hash: string
): Promise<boolean> => {
	return await bcrypt.compare(password, hash);
};
