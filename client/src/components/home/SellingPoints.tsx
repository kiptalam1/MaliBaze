import { Truck, Shield, Headphones, RotateCcw } from "lucide-react";
import SellingPointCard from "../cards/SellingPointCard";

const SellingPoints = () => {
	return (
		<section className="w-full flex flex-col sm:flex-row items-center gap-5 py-10 px-8 justify-around">
			<SellingPointCard
				icon={
					<Truck absoluteStrokeWidth className="text-[var(--color-primary)]" />
				}
				heading="Free Shipping"
				text="Free shipping on orders over Ksh. 5000"
			/>
			<SellingPointCard
				icon={
					<Shield absoluteStrokeWidth className="text-[var(--color-primary)]" />
				}
				heading="Secure Payment"
				text="100% secure payment processing"
			/>
			<SellingPointCard
				icon={
					<Headphones
						absoluteStrokeWidth
						className="text-[var(--color-primary)]"
					/>
				}
				heading="24/7 Support"
				text="Round-the-clock customer support"
			/>
			<SellingPointCard
				icon={
					<RotateCcw
						absoluteStrokeWidth
						className="text-[var(--color-primary)]"
					/>
				}
				heading="Easy Returns"
				text="30-day hassle-free returns"
			/>
		</section>
	);
};

export default SellingPoints;
