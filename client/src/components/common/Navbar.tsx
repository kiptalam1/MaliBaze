import {
	Heart,
	Moon,
	Package,
	Search,
	SendHorizonal,
	ShoppingCart,
	Sun,
	User,
	Menu,
	X,
	House,
	ChartBarStacked,
	Handshake,
	Store,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModal from "../ui/modals/UserModal";
import { useSearch } from "../../contexts/SearchContext";

const Navbar = () => {
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
	const { productSearch, setProductSearch } = useSearch();
	const navigate = useNavigate();

	// toggle dark mode class
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	// prevent body scroll when menu/modal open
	useEffect(() => {
		if (menuOpen || isUserModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [menuOpen, isUserModalOpen]);

	const handleUserNavigate = (path: string) => {
		setIsUserModalOpen(false);
		setMenuOpen(false);
		window.setTimeout(() => {
			navigate(path);
		}, 20);
	};

	return (
		<nav className="w-full flex items-center justify-between gap-6 lg:gap-10 bg-[var(--color-bg-card)] text-[var(--color-text-primary)] p-4">
			{/* Logo */}
			<div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold">
				<Package />
				<h1 className="hidden lg:block text-lg">MaliBaze</h1>
			</div>

			{/* Page links - visible sm and above */}
			<div className="hidden sm:flex items-center gap-4 text-sm">
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive
							? "text-base text-[var(--color-primary)] font-semibold"
							: "text-[var(--color-text-primary)]"
					}>
					Home
				</NavLink>
				<NavLink
					to="/categories"
					className={({ isActive }) =>
						isActive
							? "text-base text-[var(--color-primary)] font-semibold"
							: "text-[var(--color-text-primary)]"
					}>
					Categories
				</NavLink>
				<NavLink
					to="/deals"
					className={({ isActive }) =>
						isActive
							? "text-base text-[var(--color-primary)] font-semibold"
							: "text-[var(--color-text-primary)]"
					}>
					Deals
				</NavLink>
				<NavLink
					to="/about"
					className={({ isActive }) =>
						isActive
							? "text-base text-[var(--color-primary)] font-semibold"
							: "text-[var(--color-text-primary)]"
					}>
					About
				</NavLink>
			</div>

			{/* Search - always visible */}
			<div className="flex-1 flex justify-center px-4">
				<label
					htmlFor="search-products"
					className="relative w-full max-w-xs sm:max-w-sm">
					<Search
						size={16}
						className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
					/>
					<input
						type="text"
						id="search-products"
						aria-label="search products"
						placeholder="Search products"
						className="h-8 w-full py-1 pl-8 pr-8 rounded-2xl bg-[var(--color-bg)] border-none outline-none focus:ring-[var(--color-primary)] focus:ring-1 text-base"
						onFocus={() => setIsActive(true)}
						onBlur={(e) => setIsActive(e.target.value !== "")}
						value={productSearch}
						onChange={(e) => setProductSearch(e.target.value)}
					/>
					<SendHorizonal
						size={18}
						className={`absolute right-2 top-1/2 -translate-y-1/2 ${
							isActive
								? "text-[var(--color-primary)]"
								: "text-[var(--color-text-secondary)]"
						}`}
					/>
				</label>
			</div>

			{/* Icons - md and above */}
			<div className="hidden md:flex items-center gap-5 px-5">
				<button
					type="button"
					onClick={() => setDarkMode(!darkMode)}
					className="w-6 h-6 flex items-center justify-center">
					{darkMode ? (
						<Sun size={18} className="text-yellow-500" />
					) : (
						<Moon className="text-indigo-400" size={18} />
					)}
				</button>
				<NavLink to="/wishlist" className="hover:text-[var(--color-primary)]">
					<Heart size={18} />
				</NavLink>
				<NavLink to="/cart" className="hover:text-[var(--color-primary)]">
					<ShoppingCart size={18} />
				</NavLink>
				<button
					type="button"
					onClick={() => setIsUserModalOpen(true)}
					className="hover:text-[var(--color-primary)]"
					aria-label="Open account modal">
					<User size={18} />
				</button>
			</div>

			<UserModal
				isOpen={isUserModalOpen}
				onClose={() => setIsUserModalOpen(false)}
				onNavigate={handleUserNavigate}
			/>

			{/* Hamburger - only below md */}
			<button
				type="button"
				onClick={() => setMenuOpen(!menuOpen)}
				className="md:hidden p-2">
				{menuOpen ? <X size={22} /> : <Menu size={22} />}
			</button>

			{/* Drawer */}
			{menuOpen && (
				<div className="fixed top-0 left-0 h-full w-2/3 sm:w-1/3 bg-[var(--color-bg-card)] flex flex-col p-6 gap-5 z-40 md:hidden transition-transform duration-300">
					{/* Phone (<sm): routes + icons */}
					<div className="flex flex-col gap-4 sm:hidden">
						<NavLink
							to="/"
							onClick={() => setMenuOpen(false)}
							className="flex gap-3 items-center">
							<House size={18} /> Home
						</NavLink>
						<NavLink
							to="/categories"
							onClick={() => setMenuOpen(false)}
							className="flex gap-3 items-center">
							<ChartBarStacked size={18} /> Categories
						</NavLink>
						<NavLink
							to="/deals"
							onClick={() => setMenuOpen(false)}
							className="flex gap-3 items-center">
							<Handshake size={18} /> Deals
						</NavLink>
						<NavLink
							to="/about"
							onClick={() => setMenuOpen(false)}
							className="flex gap-3 items-center">
							<Store size={18} /> About
						</NavLink>

						<div className="mt-6 flex flex-col gap-4">
							<button
								type="button"
								onClick={() => setDarkMode(!darkMode)}
								className="flex gap-3 items-center">
								{darkMode ? <Sun size={18} /> : <Moon size={18} />} Dark Mode
							</button>
							<NavLink
								to="/wishlist"
								onClick={() => setMenuOpen(false)}
								className="flex gap-3 items-center">
								<Heart size={18} /> Wishlist
							</NavLink>
							<NavLink
								to="/cart"
								onClick={() => setMenuOpen(false)}
								className="flex gap-3 items-center">
								<ShoppingCart size={18} /> Cart
							</NavLink>
							<button
								type="button"
								onClick={() => {
									setMenuOpen(false);
									setIsUserModalOpen(true);
								}}
								className="flex gap-3 items-center">
								<User size={18} /> Account
							</button>
						</div>
					</div>

					{/* Small tablets (sm–md): icons only */}
					<div className="hidden sm:flex md:hidden flex-col gap-4">
						<button
							type="button"
							onClick={() => setDarkMode(!darkMode)}
							className="flex gap-3 items-center">
							{darkMode ? <Sun size={18} /> : <Moon size={18} />} Dark Mode
						</button>
						<NavLink
							to="/wishlist"
							onClick={() => setMenuOpen(false)}
							className="flex gap-3 items-center">
							<Heart size={18} /> Wishlist
						</NavLink>
						<NavLink
							to="/cart"
							onClick={() => setMenuOpen(false)}
							className="flex gap-3 items-center">
							<ShoppingCart size={18} /> Cart
						</NavLink>
						<button
							type="button"
							onClick={() => {
								setMenuOpen(false);
								setIsUserModalOpen(true);
							}}
							className="flex gap-3 items-center">
							<User size={18} /> Account
						</button>
					</div>

					<div className="flex-1" />
					<div className="text-xs text-[var(--color-text-secondary)]">
						© MaliBaze
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
