import { ArrowRight } from "lucide-react";
import BouncyButton from "../ui/BouncyButton";
import ProductCard from "../cards/ProductCard";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import type { ProductDataProps } from "../categories/AllProducts";

const FeaturedProducts = () => {
	const navigate = useNavigate();
	const { data: productsData, isPending } = useFetch<ProductDataProps>(
		"/api/products",
		"products"
	);

	return (
		<div className="w-full px-4 py:6 sm:py-10 flex flex-col gap-5">
			<h4 className="text-3xl font-semibold text-center">Featured Products</h4>
			<p className="text-base text-[var(--color-text-secondary)] text-center">
				Discover our handpicked selection of amazing products
			</p>
			<div className="flex flex-col sm:flex-row gap-5 flex-wrap justify-center">
				{isPending ? (
					<LoadingSpinner />
				) : (
					productsData?.products
						.slice(0, 4)
						.map((p) => (
							<ProductCard
								imageUrl={p.imageUrl}
								category={p.category.name}
								name={p.name}
								price={p.price}
							/>
						))
				)}
			</div>
			<BouncyButton
				className="bg-[var(--color-border)] flex items-center gap-2 w-max self-center my-8 hover:bg-[var(--color-bg-card)] transition-colors duration-400"
				onClick={() => navigate("/categories")}>
				View All Products <ArrowRight size={18} />
			</BouncyButton>
		</div>
	);
};

export default FeaturedProducts;
