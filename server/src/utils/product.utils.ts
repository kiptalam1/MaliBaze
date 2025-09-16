import Category, { type ICategory } from "../models/category.model.js";
import Product, { type IProduct } from "../models/product.model.js";

export const generateSKU = async (
	categoryName: string, // category name from request
	productName: string
): Promise<string> => {
	// Helper to get first 3 non-space letters
	const getCode = (str: string, length = 3) =>
		str.replace(/\s+/g, "").slice(0, length).toUpperCase();

	// Ensure category exists
	let categoryDoc: ICategory | null = await Category.findOne({
		name: categoryName,
	});
	if (!categoryDoc) {
		categoryDoc = await Category.create({ name: categoryName });
	}

	// fetch latest product for this category using categoryDoc._id
	const products: IProduct[] = await Product.find({ category: categoryDoc._id })
		.select("sku")
		.sort({ createdAt: -1 })
		.limit(1);

	// determine the next number
	let nextNumber = 1;
	const latestProduct = products[0];
	if (latestProduct?.sku) {
		const parts: string[] = latestProduct.sku.split("-");
		const numberPart = parts[2];
		const lastNumber = numberPart ? parseInt(numberPart, 10) : 0;
		if (!isNaN(lastNumber)) {
			nextNumber = lastNumber + 1;
		}
	}

	const categoryPart = getCode(categoryName);
	const namePart = getCode(productName);
	return `${categoryPart}-${namePart}-${nextNumber
		.toString()
		.padStart(5, "0")}`;
};
