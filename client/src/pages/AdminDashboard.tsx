import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full h-full flex flex-col gap-5 p-4 sm:px-8 md:px-10">
			<div className="w-full flex flex-col gap-5 sm:flex-row justify-between">
				<div>
					<h1 className="text-2xl md:text-3xl font-semibold">
						Admin Dashboard
					</h1>
					<p className="text-[var(--color-text-secondary)] text-base">
						Manage your e-commerce store
					</p>
				</div>

				<button
					type="button"
					onClick={() => navigate("/admin/products/new")}
					className="self-start flex gap-1 items-center bg-[var(--color-primary)] px-2 sm:px-3 py-1 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95 ease">
					<Plus size={18} />
					Add Product
				</button>
			</div>
		</div>
	);
};

export default AdminDashboard;
