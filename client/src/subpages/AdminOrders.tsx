import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type UserProps = {
	_id: string;
	email: string;
	name: string;
};

type ItemProps = {
	name: string;
	price: number;
	_id: string;
	quantity: number;
	product: {
		_id: string;
		name: string;
		price: number;
		imageUrl: string;
	};
};

type PaymentProps = {
	status: "pending" | "completed" | "failed";
};

type OrderProps = {
	destination: string;
	_id: string;
	orderNumber: string;
	items: ItemProps[];
	shippingMethod: "express" | "standard";
	trackingNumber: string;
	status: "processing" | "paid" | "shipped" | "delivered" | "cancelled";
	totalAmount: number;
	createdAt: string;
	updatedAt: string;
	user: UserProps;
	payment: PaymentProps;
};

type AdminOrdersProps = {
	orders: OrderProps[];
};

const AdminOrders = () => {
	const { data, isPending } = useFetch<AdminOrdersProps>("/orders/all-orders", [
		"allOrders",
	]);

	const statusColors: Record<OrderProps["status"], string> = {
		processing: "bg-yellow-200 text-yellow-800",
		paid: "bg-blue-200 text-blue-800",
		shipped: "bg-purple-200 text-purple-800",
		delivered: "bg-green-200 text-green-800",
		cancelled: "bg-red-200 text-red-800",
	};

	return (
		<div className="flex flex-col bg-[var(--color-bg-card)] rounded-lg px-4 sm:px-6 md:px-8 py-6 sm:py-8 gap-5">
			<div>
				<h2 className="text-lg font-semibold">All Orders</h2>
			</div>

			{/* table */}
			<div className="overflow-x-auto">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="border-b border-[var(--color-border)]">
							<th className="py-2 px-3">Order ID</th>
							<th className="hidden sm:table-cell py-2 px-3">Customer</th>
							<th className="hidden sm:table-cell py-2 px-3">Total</th>
							<th className="py-2 px-3">Status</th>
							<th className="py-2 px-3">Date</th>
						</tr>
					</thead>

					<tbody>
						{isPending && (
							<tr>
								<td colSpan={5} className="text-center py-4">
									<LoadingSpinner />
								</td>
							</tr>
						)}
						{!isPending && data?.orders?.length === 0 && (
							<tr>
								<td colSpan={5} className="text-center ">
									No orders yet
								</td>
							</tr>
						)}
						{!isPending &&
							data?.orders.map((order) => (
								<tr key={order._id} className="text-sm text-left">
									<td className="py-2 px-3 text-xs font-semibold sm:text-sm sm:font-normal">
										{order.orderNumber}
									</td>
									<td className="hidden sm:table-cell py-2 px-3">
										{order.user.name}
									</td>
									<td className="hidden sm:table-cell py-2 px-3">
										{order.totalAmount.toFixed(2)}
									</td>
									<td className="py-2 px-3">
										<span
											className={`rounded-lg py-1 px-1.5 text-xs ${
												statusColors[order.status]
											}`}>
											{order.status}
										</span>
									</td>
									<td className="py-2 px-3 text-xs sm:text-sm">
										{order.createdAt.split("T")[0]}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminOrders;
