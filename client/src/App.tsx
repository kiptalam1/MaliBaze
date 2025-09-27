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
				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/admin/products/new" element={<CreateNewProduct />} />
			</Routes>
		</div>
	);
}

export default App;
