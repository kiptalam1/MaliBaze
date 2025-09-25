import { LoaderCircle, Minus, Plus, Trash2 } from "lucide-react";


interface ShoppingCardProps {
	imageUrl: string;
	category: string;
	name: string;
	price: number;
	quantity: number;
	onRemove: () => void;
	onIncrease: () => void;
	onDecrease: () => void;
	loading: boolean;
}

const ShoppingCard = ({
	imageUrl,
	category,
	name,
	price,
	quantity,
	onRemove,
	onIncrease,
	onDecrease,
	loading,
}: ShoppingCardProps) => {
	const subtotal = (price * quantity).toFixed(2);

	return (
		<div className="w-full flex flex-col sm:flex-row justify-between gap-2 shadow-lg bg-[var(--color-bg-card)] px-2 py-4 md:p-4 rounded-xl">
			{/* Left - image + info */}
			<div className="flex flex-col sm:flex-row gap-4 flex-1">
				<div className="w-full sm:w-[120px] h-[150px] sm:h-[120px] shrink-0">
					<img
						src={imageUrl}
						alt={name}
						className="w-full h-full object-cover rounded-lg"
					/>
				</div>

				<div className="flex flex-col justify-between flex-1">
					<div>
						<p className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg)] w-max px-1 rounded-lg">
							{category}
						</p>
						<p className="font-medium text-[var(--color-text-primary)] line-clamp-2">
							{name}
						</p>
					</div>

					{/* Quantity control */}
					<div className="flex items-center gap-3 sm:gap-1 md:gap-2 lg:gap-3 mt-2 sm:mt-0">
						<button
							type="button"
							onClick={onDecrease}
							className="p-1 rounded hover:bg-[var(--color-border)] border-1 border-[var(--color-border)]"
							aria-label="decrease quantity">
							<Minus size={16} />
						</button>

						<input
							aria-label="quantity"
							type="number"
							min={1}
							value={quantity}
							readOnly
							className="w-12 text-center rounded-lg border border-[var(--color-border)] outline-none focus:ring focus:ring-[var(--color-primary)]"
						/>

						<button
							type="button"
							onClick={onIncrease}
							className="p-1 rounded hover:bg-[var(--color-border)] border-1 border-[var(--color-border)]"
							aria-label="increase quantity">
							<Plus size={16} />
						</button>
					</div>
				</div>
			</div>

			{/* Right - prices */}
			<div className="flex flex-row sm:flex-col justify-between items-end sm:items-end h-auto sm:h-[120px]">
				{/* Unit price (top on desktop, left on mobile) */}
				<span className="text-sm text-[var(--color-text-secondary)] sm:mb-auto sm: self-start">
					KES.{price.toFixed(2)}
				</span>

				{/* Subtotal + remove */}
				<div className="flex items-center gap-4 mt-2 sm:mt-auto">
					<span className="font-semibold text-sm">KES.{subtotal}</span>
					<button
						type="button"
						onClick={onRemove}
						className="text-red-500 hover:text-red-600"
						aria-label="remove item"
						disabled={loading}>
						{loading ? (
							<LoaderCircle size={16} className="animate-spin" />
						) : (
							<Trash2 size={18} />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCard;
