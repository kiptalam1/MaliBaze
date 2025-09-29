import { Plus } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full h-full flex flex-col gap-5 px-4 py-6 sm:px-8 md:px-10 sm:py-8">
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
			<div className="flex items-center gap-5 text-sm w-full sm:w-fit bg-[var(--color-bg-card)] justify-center py-2 px-6">
				<NavLink
					to="overview"
					className={({ isActive }) =>
						isActive
							? "border-b border-[var(--color-accent)] rounded-lg py-1 px-2"
							: ""
					}>
					Overview
				</NavLink>
				<NavLink
					to="products"
					className={({ isActive }) =>
						isActive
							? "border-b border-[var(--color-accent)] rounded-lg py-1 px-2"
							: ""
					}>
					Products
				</NavLink>
				<NavLink
					to="orders"
					className={({ isActive }) =>
						isActive ? "shadow-lg rounded-lg" : ""
					}>
					Orders
				</NavLink>
			</div>
			<Outlet />
		</div>
	);
};

export default AdminDashboard;
