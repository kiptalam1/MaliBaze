import AllCategories from "../components/categories/AllCategories";
import AllProducts from "../components/categories/AllProducts";
import CategoryPageHeader from "../components/categories/CategoryPageHeader";

const CategoryPage = () => {
	return (
		<div>
			<CategoryPageHeader />
			<AllCategories />
			<AllProducts />
		</div>
	);
};

export default CategoryPage;
