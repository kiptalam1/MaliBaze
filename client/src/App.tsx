import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import AdminDashboard from "./pages/AdminDashboard";
import CreateNewProduct from "./pages/CreateNewProduct";
import AdminProducts from "./subpages/AdminProducts";
import UpdateProduct from "./pages/UpdateProduct";
import AdminOverview from "./subpages/AdminOverview";
import UserOrdersPage from "./pages/UserOrdersPage";
import AdminOrders from "./subpages/AdminOrders";

function App() {
	return (
		<div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
			<Toaster richColors position="top-center" />
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/categories" element={<CategoryPage />} />
				<Route path="/auth/register" element={<RegisterPage />} />
				<Route path="/auth/login" element={<LoginPage />} />
				<Route path="/cart" element={<ShoppingCartPage />} />
				<Route path="/admin" element={<AdminDashboard />}>
					<Route index element={<AdminOverview />} />
					<Route path="products" element={<AdminProducts />} />
					<Route path="overview" element={<AdminOverview />} />
					<Route path="orders" element={<AdminOrders />} />
				</Route>
				<Route path="/admin/products/new" element={<CreateNewProduct />} />
				<Route
					path={`/admin/products/:id/update`}
					element={<UpdateProduct />}
				/>
				<Route path="/orders" element={<UserOrdersPage />} />
			</Routes>
		</div>
	);
}

export default App;
