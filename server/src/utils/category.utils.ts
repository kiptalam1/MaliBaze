import Category from "../models/category.model.js";

export const findOrCreateCategory = async (categoryField: string) => {
	let categoryDoc = await Category.findOne({
		name: categoryField,
	});
	if (!categoryDoc) {
		categoryDoc = await Category.create({
			name: categoryField,
		});
	}
	return categoryDoc;
};
