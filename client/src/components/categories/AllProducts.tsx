import { div } from "motion/react-client";
import useFetch from "../../hooks/useFetch";
import ProductCard, { type ProductProps } from "../cards/ProductCard";
import { LoaderPinwheel } from "lucide-react";

interface ProductDataProps {
	products: {
		_id: string;
		name: string;
		price: number;
		category: { name: string };
		imageUrl: string;
	}[];
}

const AllProducts = () => {
	const { data: productsData, isPending } = useFetch<ProductDataProps>(
		"/api/products",
		"products"
	);

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
					<div className="w-full text-center py-10">
						<LoaderPinwheel
							size={32}
							className="animate-spin mx-auto text-[var(--color-primary)]"
						/>
					</div>
				) : (
					productsData?.products?.map((p) => (
						<ProductCard
							key={p._id}
							imageUrl={p.imageUrl}
							category={p.category.name}
							name={p.name}
							price={p.price}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default AllProducts;
