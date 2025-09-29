import { ArrowRight } from "lucide-react";
import OrderCard from "../components/cards/OrderCard";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type Product = {
	_id: string;
	name: string;
	price: number;
	imageUrl: string;
};

type OrderItem = {
	_id: string;
	product: Product;
	name: string;
	price: number;
	quantity: number;
};

type Payment = {
	status: string;
};

type Order = {
	_id: string;
	orderNumber: string;
	user: string;
	items: OrderItem[];
	destination: string;
	shippingMethod: "standard" | "express";
	trackingNumber: string;
	status: "processing" | "paid" | "shipped" | "delivered" | "cancelled";
	payment: Payment;
	totalAmount: number;
	createdAt: string;
	updatedAt: string;
};

export type UserOrdersProps = {
	orders: Order[];
};

const UserOrdersPage = () => {
	const navigate = useNavigate();

	const { data, isPending } = useFetch<UserOrdersProps>("/orders/my-orders", [
		"orders",
	]);

	return (
		<div className="w-full h-full flex flex-col gap-5 px-4 py-6 sm:px-8 md:px-10 sm:py-8">
			<div className="w-full flex flex-col gap-5 sm:flex-row justify-between">
				<div>
					<h1 className="text-2xl md:text-3xl font-semibold">My Orders</h1>
					<p className="text-[var(--color-text-secondary)] text-base">
						Track and manage your order history
					</p>
				</div>

				<button
					type="button"
					onClick={() => navigate("/categories")}
					className="self-start flex gap-1 items-center bg-[var(--color-primary)] px-2 sm:px-3 py-1 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95 ease">
					Continue Shopping
					<ArrowRight size={16} />
				</button>
			</div>
			{isPending && <LoadingSpinner />}
			{!isPending && data?.orders?.length === 0 && (
				<p className="text-center text-sm ">You have not made any orders</p>
			)}

			{!isPending &&
				data &&
				data?.orders?.map((order) => (
					<OrderCard
						key={order._id}
						orderNumber={order.orderNumber}
						createdAt={order.createdAt}
						status={order.status}
						totalAmount={order.totalAmount}
						destination={order.destination}
						shippingMethod={order.shippingMethod}
						trackingNumber={order.trackingNumber}
						items={order.items.map((item) => ({
							_id: item._id,
							imageUrl: item.product?.imageUrl || "/placeholder.png",
							name: item.name || item.product?.name,
							quantity: item.quantity,
							price: item.price,
						}))}
					/>
				))}
		</div>
	);
};

export default UserOrdersPage;
