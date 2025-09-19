import ShopByCatCard from "./cards/ShopByCatCard";

const categories = [
	{ imageSrc: "/electronics.jpg", category: "Electronics", count: 30 },
	{ imageSrc: "/fashion.jpg", category: "Fashion", count: 67 },
	{ imageSrc: "/sports.jpg", category: "Sports", count: 7 },
	{ imageSrc: "/books.jpg", category: "Books", count: 7 },
	{ imageSrc: "/beauty.jpg", category: "Beauty", count: 7 },
];

const ShopByCategory = () => {
	return (
		<div className="w-full flex flex-col gap-5 items-center justify-center py-8 px-4 sm:px-4 md:px-6 lg:px-8">
			<h4 className="text-3xl font-semibold">Shop by Category</h4>
			<p className="text-base text-[var(--color-text-secondary)]">
				Explore our wide range of product categories
			</p>
			<div className="flex flex-col sm:flex-row gap-5 md:gap-7 items-stretch justify-center flex-wrap overflow-hidden w-full">
				{categories.map(({ imageSrc, category, count }) => (
					<ShopByCatCard
						key={category}
						imageSrc={imageSrc}
						category={category}
						count={count}
						onClick={() => console.log(`${category} card clicked!!!`)}
					/>
				))}
			</div>
		</div>
	);
};

export default ShopByCategory;
