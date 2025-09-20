import { ArrowRight } from "lucide-react";
import BouncyButton from "../ui/BouncyButton";
import ProductCard from "../cards/ProductCard";
import { type ProductCardProps } from "../cards/ProductCard";

const FeaturedProducts = () => {
	const featuredProducts: ProductCardProps[] = [
		{
			imageSrc:
				"https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
			category: "electronics",
			productName: "wireless headphones",
			price: 2000,
		},
		{
			imageSrc:
				"https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
			category: "fashion",
			productName: "premium cotton t-shirt",
			price: 500,
		},
		{
			imageSrc:
				"https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg",
			category: "electronics",
			productName: "smart fitness watch",
			price: 3500,
		},
		{
			imageSrc:
				"https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
			category: "Home & Garden",
			productName: "minimalistic desk lamp",
			price: 6000,
		},
	];

	return (
		<div className="w-full px-4 py:6 sm:py-10 flex flex-col gap-5">
			<h4 className="text-3xl font-semibold text-center">Featured Products</h4>
			<p className="text-base text-[var(--color-text-secondary)] text-center">
				Discover our handpicked selection of amazing products
			</p>
			<div className="flex flex-col sm:flex-row gap-5 flex-wrap justify-center">
				{featuredProducts.map((p) => (
					<ProductCard
						imageSrc={p.imageSrc}
						category={p.category}
						productName={p.productName}
						price={p.price}
					/>
				))}
			</div>
			<BouncyButton
				className="bg-[var(--color-border)] flex items-center gap-2 w-max self-center my-8 hover:bg-[var(--color-bg-card)] transition-colors duration-400"
				onClick={() => console.log("all products arrow clicked")}>
				View All Products <ArrowRight size={18} />
			</BouncyButton>
		</div>
	);
};

export default FeaturedProducts;
