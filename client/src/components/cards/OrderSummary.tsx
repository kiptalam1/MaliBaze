import { useState } from "react";
import OrderInfoForm from "../forms/OrderInfoForm";
import BouncyButton from "../ui/BouncyButton";

const OrderSummary = ({
	subTotal,
	tax = 0,
}: {
	subTotal: number;
	tax: number;
}) => {
	const [isShowing, setIsShowing] = useState(false);
	const total = Number(subTotal) + Number(tax);
	return (
		<div className="w-full flex flex-col gap-5 bg-[var(--color-bg-card)] shadow-lg p-4">
			{/* modal to mount when needed */}
			{isShowing && <OrderInfoForm onClose={() => setIsShowing(false)} />}
			<h2 className="text-lg font-semibold">Order Summary</h2>
			<div className="flex items-center justify-between">
				<p className="text-sm">Subtotal</p>
				<span className="text-base font-light">KES. {subTotal}</span>
			</div>

			<div className="flex items-center justify-between">
				<p className="text-sm">Shipping</p>
				<span className="text-base font-light">Free</span>
			</div>

			<div className="flex items-center justify-between">
				<p className="text-sm">Tax</p>
				<span className="text-base font-light">{0}</span>
			</div>

			<div className="flex items-center justify-between">
				<p className="text-base font-bold">Total</p>
				<span className="text-base font-bold">KES. {total}</span>
			</div>

			<BouncyButton
				onClick={() => setIsShowing(true)}
				type="submit"
				className="bg-[var(--color-primary)]">
				Proceed to Checkout
			</BouncyButton>
		</div>
	);
};

export default OrderSummary;
