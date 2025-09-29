// import { CheckCircle } from "lucide-react";
import {
	Loader2,
	CreditCard,
	Truck,
	CheckCircle2,
	XCircle,
} from "lucide-react";
import OrderProductCard from "./OrderProductCard";
import type { JSX } from "react";

type OrderItem = {
	_id: string;
	imageUrl: string;
	name: string;
	quantity: number;
	price: number;
};

type OrderCardProps = {
	orderNumber: string;
	createdAt: string;
	status: "processing" | "paid" | "shipped" | "delivered" | "cancelled";
	totalAmount: number;
	destination: string;
	shippingMethod: "express" | "standard";
	trackingNumber: string;
	items: OrderItem[];
};

const statusStyles: Record<
	OrderCardProps["status"],
	{ text: string; bg: string; icon: JSX.Element }
> = {
	processing: {
		text: "text-yellow-700",
		bg: "bg-yellow-100",
		icon: <Loader2 size={12} className="text-yellow-700" />,
	},
	paid: {
		text: "text-blue-700",
		bg: "bg-blue-100",
		icon: <CreditCard size={12} className="text-blue-700" />,
	},
	shipped: {
		text: "text-purple-700",
		bg: "bg-purple-100",
		icon: <Truck size={12} className="text-purple-700" />,
	},
	delivered: {
		text: "text-green-700",
		bg: "bg-green-100",
		icon: <CheckCircle2 size={12} className="text-green-700" />,
	},
	cancelled: {
		text: "text-red-700",
		bg: "bg-red-100",
		icon: <XCircle size={12} className="text-red-700" />,
	},
};

const OrderCard = ({
	orderNumber,
	createdAt,
	status,
	totalAmount,
	destination,
	shippingMethod,
	trackingNumber,
	items,
}: OrderCardProps) => {
	const { text, bg, icon } = statusStyles[status];
	const formattedDate = new Date(createdAt).toISOString().split("T")[0]; //
	return (
		<div className="w-full md:max-w-3/4 flex flex-col px-4 py-6 bg-[var(--color-bg-card)] shadow-sm gap-3 rounded-lg">
			<div className="flex items-center gap-5 justify-between">
				<div>
					<h2 className="text-lg font-semibold">{orderNumber}</h2>
					<p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
						Placed on {formattedDate}
					</p>
				</div>
				<div className="sm:flex flex-row items-center gap-5">
					<p
						className={`text-xs py-1 px-2 rounded-lg flex items-center gap-1 ${text} ${bg}`}>
						{icon}
						{status}
					</p>
					<p className="mt-2 sm:mt-0 text-center sm:text-left font-semibold">
						{totalAmount.toFixed(2)}
					</p>
				</div>
			</div>

			{/* product cards */}
			<div className="flex flex-col gap-3">
				{items.map((item) => (
					<OrderProductCard
						key={item._id}
						imageUrl={item.imageUrl}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
					/>
				))}
			</div>

			<hr className="text-[var(--color-border)] my-2" />

			{/* shipping details */}

			<div className="flex flex-col gap-1">
				<div className="flex items-center justify-between flex-wrap">
					<p className="text-sm text-[var(--color-text-secondary)]">
						Shipping to:
					</p>
					<p className="text-sm">{destination}</p>
				</div>

				<div className="flex items-center justify-between flex-wrap">
					<p className="text-sm text-[var(--color-text-secondary)]">Method:</p>
					<p className="text-sm">{shippingMethod}</p>
				</div>

				<div className="flex items-center justify-between flex-wrap">
					<p className="text-sm text-[var(--color-text-secondary)]">
						Tracking:
					</p>
					<p className="text-sm">{trackingNumber}</p>
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
