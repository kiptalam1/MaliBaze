interface ShopCatCardProps {
	imageSrc: string;
	category: string;
	count: number;
	onClick: () => void;
}

const ShopByCatCard = ({
	imageSrc,
	category,
	count,
	onClick,
}: ShopCatCardProps) => {
	return (
		<div
			onClick={onClick}
			className="flex flex-col items-center justify-center gap-3 py-5 px-6 bg-[var(--color-bg-card)] 
            w-full sm:w-[180px] md:w-[200px] lg:w-[240px] rounded-lg cursor-pointer shadow
            hover:shadow-lg transition-shadow">
			<div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden">
				<img
					src={imageSrc}
					alt={category}
					loading="lazy"
					className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-200"
				/>
			</div>
			<div className="flex flex-col items-center justify-center text-center">
				<h3 className="font-semibold text-base md:text-lg">{category}</h3>
				<p className="text-[var(--color-text-secondary)] text-sm md:text-base">
					{count} items
				</p>
			</div>
		</div>
	);
};

export default ShopByCatCard;
