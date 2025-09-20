import ProductCard, { type ProductCardProps } from "../cards/ProductCard";

const AllProducts = () => {
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
		<div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 space-y-4">
			<div>
				<h3 className="text-lg sm:text-2xl font-semibold mb-2 mt-5">
					All Products
				</h3>
				<p className="text-sm py-1 px-3 bg-[var(--color-primary-lightest)] text-[var(--color-primary)] rounded-lg w-max">
					<span className="mr-1">{featuredProducts.length}</span>products found
				</p>
			</div>
			<div className="flex flex-col sm:flex-row  items-center gap-4 flex-wrap ">
				{featuredProducts.map((p) => (
					<ProductCard
						imageSrc={p.imageSrc}
						category={p.category}
						productName={p.productName}
						price={p.price}
					/>
				))}
			</div>
		</div>
	);
};

export default AllProducts;
