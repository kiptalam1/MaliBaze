import { useSearch } from "../../contexts/SearchContext";
import useCartMutation from "../../hooks/useCartMutation";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../cards/ProductCard";
import LoadingSpinner from "../ui/LoadingSpinner";

export interface ProductDataProps {
	products: {
		_id: string;
		name: string;
		price: number;
		category: { name: string };
		imageUrl: string;
	}[];
}

const AllProducts = () => {
	const { productSearch, categoryFilter } = useSearch();

	let url = `/products?category=${categoryFilter}`;
	if (productSearch?.trim()) {
		url += `&search=${productSearch}`;
	}

	const { data: productsData, isPending } = useFetch<ProductDataProps>(url, [
		"products",
		categoryFilter,
		productSearch,
	]);

	const { add } = useCartMutation();

	return (
		<div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 space-y-4">
			<div>
				<h3 className="text-lg sm:text-2xl font-semibold mb-2 mt-5">
					All Products
				</h3>
				<p className="text-sm py-1 px-3 bg-[var(--color-primary-lightest)] text-[var(--color-primary)] rounded-lg w-max">
					<span className="mr-1">{productsData?.products.length ?? 0}</span>
					products found
				</p>
			</div>
			<div className="flex flex-col sm:flex-row  items-center gap-4 flex-wrap ">
				{isPending ? (
					<LoadingSpinner />
				) : (
					productsData?.products?.map((p) => (
						<ProductCard
							key={p._id}
							imageUrl={p.imageUrl}
							category={p.category.name}
							name={p.name}
							price={p.price}
							onAdd={() => add.mutate(p._id)}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default AllProducts;
