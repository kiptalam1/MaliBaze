import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BouncyButton from "../components/ui/BouncyButton";

const CreateNewProduct = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-6 p-4 sm:px-6 md:px-8 lg:px-10">
			<div className="w-full max-w-4xl mx-auto">
				<button
					type="button"
					onClick={() => navigate("/admin")}
					className="flex gap-1 items-center rounded-lg px-2 py-1 bg-[var(--color-primary)] cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95 ease">
					<ArrowLeft size={18} />
					Back to Admin
				</button>
			</div>
			<div className="w-full max-w-4xl mx-auto">
				<h1 className="text-2xl md:text-3xl font-semibold">Add new Product</h1>
				<p className="text-[var(--color-text-secondary)]">
					Create a new product for your store
				</p>
			</div>

			{/* product info */}
			<div className="bg-[var(--color-bg-card)] rounded-lg px-4 py-6 sm:px-6 md:p-8 w-full max-w-4xl mx-auto">
				<h2 className="text-lg font-semibold mb-5">Basic Information</h2>
				<form className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<label htmlFor="name" className="text-sm">
							Product Name *
						</label>
						<input
							type="text"
							name="name"
							id="name"
							required
							placeholder="Enter product name"
							className="w-full border border-[var(--color-border)] py-1 px-4 rounded-lg outline-none focus:ring focus:ring-[var(--color-primary)]"
						/>
					</div>
					<div>
						<label htmlFor="description" className="text-sm">
							Description *
						</label>
						<textarea
							name="description"
							id="description"
							placeholder="Enter product description"
							cols={20}
							rows={10}
							maxLength={2000}
							required
							className="w-full border border-[var(--color-border)] py-1 px-4 rounded-lg outline-none focus:ring focus:ring-[var(--color-primary)] resize-y min-h-10 max-h-72"></textarea>
					</div>
					<div className="flex flex-col sm:flex-row justify-between gap-4">
						<div className="flex flex-col gap-1">
							<label htmlFor="category" className="text-sm">
								Category *
							</label>
							<input
								type="text"
								name="category"
								id="category"
								required
								placeholder="Enter category"
								className="w-full border border-[var(--color-border)] py-1 px-4 rounded-lg outline-none focus:ring focus:ring-[var(--color-primary)]"
							/>
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="sku" className="text-sm">
								SKU
							</label>
							<input
								type="text"
								name="sku"
								id="sku"
								placeholder="Enter SKU"
								className="w-full border border-[var(--color-border)] py-1 px-4 rounded-lg outline-none focus:ring focus:ring-[var(--color-primary)]"
							/>
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="price" className="text-sm">
								Price *
							</label>
							<input
								type="number"
								name="price"
								id="price"
								min={0}
								required
								aria-label="product price"
								className="w-full border border-[var(--color-border)] py-1 px-4 rounded-lg outline-none focus:ring focus:ring-[var(--color-primary)]"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="image" className="text-sm">
							Product Image *
						</label>
						<input
							type="url"
							name="image"
							id="image"
							required
							placeholder="Enter image url"
							className="w-full border border-[var(--color-border)] py-1 px-4 rounded-lg outline-none focus:ring focus:ring-[var(--color-primary)]"
						/>
					</div>

					<BouncyButton
						type="submit"
						className="bg-[var(--color-primary)] w-fit self-center mt-5">
						Create Product
					</BouncyButton>
				</form>
			</div>
		</div>
	);
};

export default CreateNewProduct;
