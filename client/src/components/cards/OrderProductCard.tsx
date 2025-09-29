interface OrderProductCardProps {
	imageUrl: string;
	name: string;
	quantity: number;
	price: number;
}

const OrderProductCard = ({
	imageUrl,
	name,
	quantity,
	price,
}: OrderProductCardProps) => {
	return (
		<div className="w-full flex justify-between text-sm py-4 px-2 rounded-lg">
			<div className="flex items-center gap-4">
				<div className="rounded-lg shrink-0">
					<img
						src={imageUrl}
						alt={name}
						className="w-10 h-10 object-cover rounded-lg"
					/>
				</div>
				<div className="flex flex-col gap-1 min-w-0">
					{" "}
					{/* ensures truncate works */}
					<h3 className="font-semibold truncate max-w-[120px] sm:max-w-[200px]">
						{name}
					</h3>
					<p className="text-[var(--color-text-secondary)] text-xs">
						Qty: {quantity}
					</p>
				</div>
			</div>
			<div className="shrink-0">
				<p className="font-semibold">KES. {(price * quantity).toFixed(2)}</p>
			</div>
		</div>
	);
};

export default OrderProductCard;
