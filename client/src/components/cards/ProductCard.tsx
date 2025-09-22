import { ShoppingCart } from "lucide-react";
import BouncyButton from "../ui/BouncyButton";

// export interface ProductCardProps {
// 	imageSrc: string;
// 	category: string;
// 	productName: string;
// 	price: number;
// }

export interface ProductProps {
	_id?: string;
	name: string;
	price: number;
	category: string;
	imageUrl: string;
}
const ProductCard = ({ imageUrl, category, name, price }: ProductProps) => {
	return (
		<div className="w-full sm:w-[300px] lg:w-[350px] h-[350px] rounded-lg shadow-md flex flex-col gap-4 text:sm bg-[var(--color-bg-card)]">
			<div className="w-full h-[200px]">
				<img
					src={imageUrl}
					alt={name}
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<div className="px-2 w-max rounded-md bg-[var(--color-primary-lightest)] text-[var(--color-primary)] items-start ml-4 text-sm">
				{category}
			</div>
			<div className="ml-4 text-sm font-semibold">{name}</div>
			<div className="flex gap-5 justify-between items-center">
				<div className="font-semibold ml-4">Ksh. {price}</div>
				<BouncyButton
					className="bg-[var(--color-primary)] mr-5 flex items-center gap-2 text-xs"
					onClick={() => console.log("add to cart")}>
					Add To Cart
					<ShoppingCart size={16} />
				</BouncyButton>
			</div>
		</div>
	);
};

export default ProductCard;
