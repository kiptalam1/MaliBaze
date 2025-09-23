import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ShopByCatCard from "../cards/ShopByCatCard";
import type { Product } from "../categories/AllCategories";
import LoadingSpinner from "../ui/LoadingSpinner";

const ShopByCategory = () => {
	const { data: productsData, isPending } = useFetch<{ products: Product[] }>(
		"/products",
		["products"]
	);
	const navigate = useNavigate();

	const categoriesMap = new Map<string, { imageUrl: string; count: number }>();

	productsData?.products.forEach((p) => {
		if (!categoriesMap.has(p.category.name)) {
			categoriesMap.set(p.category.name, {
				imageUrl: p.imageUrl,
				count: 1,
			});
		} else {
			categoriesMap.get(p.category.name)!.count++;
		}
	});

	const categories = Array.from(categoriesMap.entries()).map(
		([category, { imageUrl, count }]) => ({
			category,
			imageSrc: imageUrl,
			count,
		})
	);

	return (
		<div className="w-full flex flex-col gap-5 items-center justify-center py-8 px-4 sm:px-4 md:px-6 lg:px-8">
			<h4 className="text-3xl font-semibold">Shop by Category</h4>
			<p className="text-base text-[var(--color-text-secondary)]">
				Explore our wide range of product categories
			</p>
			<div className="flex flex-col sm:flex-row gap-5 md:gap-7 items-stretch justify-center flex-wrap overflow-hidden w-full">
				{isPending ? (
					<LoadingSpinner />
				) : (
					categories.slice(0, 5).map(({ imageSrc, category, count }) => (
						<ShopByCatCard
							key={category}
							imageSrc={imageSrc}
							category={category}
							count={count}
							onClick={() => {
								navigate("/categories");
							}}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default ShopByCategory;
