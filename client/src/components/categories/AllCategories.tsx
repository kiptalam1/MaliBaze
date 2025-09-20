import ShopByCatCard from "../cards/ShopByCatCard";

const AllCategories = () => {
	const categories = [
		{ imageSrc: "/electronics.jpg", category: "Electronics", count: 30 },
		{ imageSrc: "/fashion.jpg", category: "Fashion", count: 67 },
		{ imageSrc: "/sports.jpg", category: "Sports", count: 7 },
		{ imageSrc: "/books.jpg", category: "Books", count: 7 },
		{ imageSrc: "/beauty.jpg", category: "Beauty", count: 7 },
	];
	return (
		<div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-6">
			<div className="flex gap-5 justify-between items-center">
				<h2 className="text-lg sm:text-2xl font-semibold">All Categories</h2>
				<p className="text-xs p-1 bg-[var(--color-primary-lightest)] ">
					<span className="mr-1 text-xs">{categories.length}</span>categories
				</p>
			</div>
			<div className="flex flex-col sm:flex-row  items-center gap-4 flex-wrap ">
				{categories.map((cat) => (
					<ShopByCatCard
						key={cat.category}
						category={cat.category}
						imageSrc={cat.imageSrc}
						count={cat.count}
						onClick={() => console.log("clicked")}
					/>
				))}
			</div>
		</div>
	);
};

export default AllCategories;
