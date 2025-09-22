import useFetch from "../../hooks/useFetch";
import ShopByCatCard from "../cards/ShopByCatCard";
import LoadingSpinner from "../ui/LoadingSpinner";

export interface Product {
	_id: string;
	name: string;
	price: number;
	category: { name: string };
	imageUrl: string;
}
const AllCategories = () => {
	const { data: productsData, isPending } = useFetch<{ products: Product[] }>(
		"/api/products",
		"products"
	);

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
		<div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-6">
			<div className="flex gap-5 justify-between items-center">
				<h2 className="text-lg sm:text-2xl font-semibold">All Categories</h2>
				<p className="text-xs p-1 bg-[var(--color-primary-lightest)] text-[var(--color-primary)] rounded-lg">
					<span className="mr-1 text-xs">{categories.length ?? 0}</span>
					categories
				</p>
			</div>
			<div className="flex flex-col sm:flex-row  items-center gap-4 flex-wrap ">
				{isPending ? (
					<LoadingSpinner />
				) : (
					categories.map((cat) => (
						<ShopByCatCard
							key={cat.category}
							category={cat.category}
							imageSrc={cat.imageSrc}
							count={cat.count}
							onClick={() => console.log("clicked")}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default AllCategories;
