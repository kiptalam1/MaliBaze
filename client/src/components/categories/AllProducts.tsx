import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import useCartMutation from "../../hooks/useCartMutation";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../cards/ProductCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useState } from "react";

export interface ProductDataProps {
	page: number;
	totalPages: number;
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
	const [page, setPage] = useState(1);
	let url = `/products?page=${page}&category=${categoryFilter}`;
	if (productSearch?.trim()) {
		url += `&search=${productSearch}`;
	}

	const { data: productsData, isPending } = useFetch<ProductDataProps>(url, [
		"products",
		categoryFilter,
		productSearch,
		String(page),
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

			{productsData && productsData.totalPages > 1 && (
				<div className="flex items-center justify-center gap-2 mt-8">
					<button
						type="button"
						aria-label="previous products button"
						onClick={() => setPage((p) => Math.max(p - 1, 1))}
						disabled={page <= 1}>
						<ChevronLeft
							size={30}
							className={`border border-[var(--color-border)] rounded-md p-1 transition-colors duration-200 cursor-pointer ${
								page <= 1
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-[var(--color-border)]"
							}`}
						/>
					</button>
					<span className="text-sm text-[var(--color-text-secondary)]">
						{productsData?.page} / {productsData?.totalPages}
					</span>
					<button
						type="button"
						aria-label="next products button"
						onClick={() =>
							setPage((p) => Math.min(p + 1, productsData.totalPages))
						}
						disabled={page >= productsData.totalPages}>
						<ChevronRight
							size={30}
							className={`border border-[var(--color-border)] rounded-md p-1 transition-colors duration-200 cursor-pointer ${
								page >= productsData.totalPages
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-[var(--color-border)]"
							}`}
						/>
					</button>
				</div>
			)}
		</div>
	);
};

export default AllProducts;
