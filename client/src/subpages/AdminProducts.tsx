import {
	ChevronLeft,
	ChevronRight,
	Edit,
	LoaderCircle,
	Plus,
	Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { ProductDataProps } from "../components/categories/AllProducts";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import useDelete from "../hooks/useDelete";

const AdminProducts = () => {
	const navigate = useNavigate();
	const { productSearch } = useSearch();
	const [page, setPage] = useState(1);
	const { data, isPending } = useFetch<ProductDataProps>(
		`/products?search=${productSearch}&page=${page}`,
		["products", productSearch, String(page)]
	);

	const {
		mutate: deleteProduct,
		isPending: isDeleting,
		variables: deletingId,
	} = useDelete("/products", ["products"]);

	return (
		<div className="flex flex-col bg-[var(--color-bg-card)] rounded-lg px-4 sm:px-6 md:px-8 py-6 sm:py-8 gap-5">
			{/* Header */}
			<div className="flex items-center justify-between w-full mb-5">
				<h2 className="font-semibold text-lg">Products</h2>
				<button
					type="button"
					onClick={() => navigate("/admin/products/new")}
					className="flex items-center gap-1 bg-[var(--color-primary)] px-3 py-1 rounded-lg text-white hover:scale-105 transition-transform duration-200 active:scale-95">
					<Plus size={18} />
					Add Product
				</button>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="border-b border-[var(--color-border)]">
							<th className="px-3 py-2">Product</th>
							<th className="hidden sm:table-cell px-3 py-2">Category</th>
							<th className="px-3 py-2 text-right">Price</th>
							<th className="px-3 py-2 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{isPending && (
							<tr>
								<td colSpan={4} className="text-center py-4">
									<LoadingSpinner />
								</td>
							</tr>
						)}

						{!isPending && data?.products.length === 0 && (
							<tr>
								<td
									colSpan={4}
									className="text-sm text-[var(--color-text-secondary)] text-center py-4">
									No products to display
								</td>
							</tr>
						)}

						{!isPending &&
							data?.products.map((p) => (
								<tr
									key={p._id}
									className="border-b border-[var(--color-border)] text-sm">
									<td className="px-3 py-2 flex items-center gap-4 truncate">
										<img
											src={p.imageUrl}
											alt={p.name}
											loading="lazy"
											className="w-10 h-10 rounded-lg object-cover"
										/>
										{p.name}
									</td>
									<td className="hidden sm:table-cell px-3 py-2">
										{p.category?.name}
									</td>
									<td className="px-3 py-2 text-right">{p.price}</td>
									<td className="px-3 py-2 flex gap-3 items-center justify-around">
										<button
											type="button"
											onClick={() =>
												navigate(`/admin/products/${p._id}/update`)
											}
											className="hover:opacity-80 cursor-pointer"
											aria-label="Edit product">
											<Edit
												size={20}
												className="text-[var(--color-secondary)]"
											/>
										</button>

										<button
											type="button"
											onClick={() => deleteProduct(p._id)}
											className="hover:opacity-80 cursor-pointer"
											aria-label="Delete product">
											{isDeleting && deletingId === p._id ? (
												<LoaderCircle
													size={18}
													className="text-[var(--color-error)] animate-spin"
												/>
											) : (
												<Trash2
													size={20}
													className="text-[var(--color-error)]"
												/>
											)}
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{data && data.totalPages > 1 && (
				<div className="flex items-center justify-center gap-2 mt-8">
					<button
						type="button"
						aria-label="previous products button"
						onClick={() => setPage((p) => Math.max(p - 1, 1))}
						disabled={page <= 1}>
						<ChevronLeft
							size={30}
							className={`border border-[var(--color-border)] rounded-md p-1 transition-colors duration-200 ${
								page <= 1
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-[var(--color-border)] cursor-pointer"
							}`}
						/>
					</button>
					<span className="text-sm text-[var(--color-text-secondary)]">
						{data.page} / {data.totalPages}
					</span>
					<button
						type="button"
						aria-label="next products button"
						onClick={() => setPage((p) => Math.min(p + 1, data.totalPages))}
						disabled={page >= data.totalPages}>
						<ChevronRight
							size={30}
							className={`border border-[var(--color-border)] rounded-md p-1 transition-colors duration-200 ${
								page >= data.totalPages
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-[var(--color-border)] cursor-pointer"
							}`}
						/>
					</button>
				</div>
			)}
		</div>
	);
};

export default AdminProducts;
