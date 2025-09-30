import { useState } from "react";
import BouncyButton from "../ui/BouncyButton";

const OrderInfoForm = ({ onClose }: { onClose: () => void }) => {
	const [destination, setDestination] = useState("");
	const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
		"standard"
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ destination, shippingMethod });
		// submit logic here
	};

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 flex items-center justify-center bg-black/50">
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-full sm:max-w-2/3 md:max-w-1/2 px-4 rounded-lg">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-2 rounded-lg justify-center bg-[var(--color-bg-card)] p-4">
					{/* Destination */}
					<div className="w-full flex flex-col gap-2">
						<label htmlFor="destination" className="text-sm">
							Location:
						</label>
						<input
							type="text"
							name="destination"
							id="destination"
							required
							aria-label="product destination"
							className="w-full px-4 py-2 outline-none border border-[var(--color-border)] focus:ring focus:ring-[var(--color-primary)] rounded-lg text-base bg-[var(--color-bg)]"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
						/>
					</div>

					{/* shipping method */}

					<div className="w-full flex flex-col gap-2">
						<span className="text-sm font-medium">Shipping method:</span>
						<div className="flex gap-4">
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="shippingMethod"
									value="standard"
									checked={shippingMethod === "standard"}
									onChange={() => setShippingMethod("standard")}
								/>
								<span>Standard</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="shippingMethod"
									value="express"
									checked={shippingMethod === "express"}
									onChange={() => setShippingMethod("express")}
								/>
								<span>Express</span>
							</label>
						</div>
					</div>

					{/* actions */}
					<div className="flex items-center justify-between mt-5">
						<BouncyButton
							type="button"
							onClick={onClose}
							className="border border-[var(--color-border)]">
							Cancel
						</BouncyButton>
						<BouncyButton type="submit" className="bg-[var(--color-primary)]">
							Submit
						</BouncyButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default OrderInfoForm;
