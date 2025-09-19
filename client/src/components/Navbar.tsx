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
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	// add/remove dark class on <html>
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<nav className="w-full flex items-center justify-between gap-1 bg-[var(--color-bg-card)] text-[var(--color-text-primary)] p-4">
			{/* Logo */}
			<div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold">
				<Package />
				<h1 className="hidden lg:block text-lg">MaliBaze</h1>
			</div>

			{/* Desktop Links */}
			<div className="hidden lg:flex items-center gap-6 text-sm">
				<NavLink
					to="/home"
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

			{/* Search */}
			<div>
				<label htmlFor="search-products" className="relative">
					<Search
						size={16}
						className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] z-1"
					/>
					<input
						type="text"
						id="search-products"
						aria-label="search products"
						placeholder="Search products"
						className="h-8 w-48 sm:w-64 py-1 pl-8 pr-8 rounded-2xl bg-[var(--color-bg)] border-none outline-none focus:ring-[var(--color-primary)] focus:ring-1 text-base"
						onFocus={() => setIsActive(true)}
						onBlur={(e) => setIsActive(e.target.value !== "")}
					/>
					<SendHorizonal
						size={18}
						className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ${
							isActive
								? "text-[var(--color-primary)]"
								: "text-[var(--color-text-secondary)]"
						}`}
					/>
				</label>
			</div>

			{/* Desktop Icons */}
			<div className="hidden md:flex items-center gap-5 px-5">
				<button
					type="button"
					onClick={() => setDarkMode(!darkMode)}
					className="w-6 h-6 flex items-center justify-center cursor-pointer">
					<AnimatePresence>
						{darkMode ? (
							<motion.div
								key="sun"
								initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
								animate={{ rotate: 0, opacity: 1, scale: 1 }}
								exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
								transition={{
									duration: 0.4,
									scale: {
										type: "spring",
										visualDuration: 0.4,
										stiffness: 300,
										damping: 20,
										bounce: 0.5,
									},
								}}>
								<Sun size={18} className="text-yellow-500" />
							</motion.div>
						) : (
							<motion.div
								key="moon"
								initial={{ rotate: 100, opacity: 0, scale: 0.5 }}
								animate={{ rotate: 0, opacity: 1, scale: 1 }}
								exit={{ rotate: -100, opacity: 0, scale: 0.5 }}
								transition={{
									duration: 0.4,
									scale: {
										type: "spring",
										visualDuration: 0.4,
										stiffness: 300,
										damping: 20,
										bounce: 0.5,
									},
								}}>
								<Moon className="text-indigo-400" size={18} />
							</motion.div>
						)}
					</AnimatePresence>
				</button>
				<Heart
					size={18}
					className="hover:text-[var(--color-primary)] cursor-pointer transition-colors duration-200"
				/>
				<NavLink
					to="/cart"
					className={({ isActive }) =>
						isActive
							? "text-[var(--color-primary)] cursor-pointer font-semibold"
							: "hover:text-[var(--color-primary)] cursor-pointer transition-colors duration-200"
					}>
					<ShoppingCart size={18} />
				</NavLink>
				<User
					size={18}
					className="hover:text-[var(--color-primary)] cursor-pointer transition-colors duration-200"
				/>
			</div>

			{/* Hamburger for Mobile */}
			<button
				type="button"
				onClick={() => setMenuOpen(!menuOpen)}
				className="lg:hidden p-2 cursor-pointer">
				{menuOpen ? <X size={22} /> : <Menu size={22} />}
			</button>

			{/* Mobile Drawer */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="fixed top-0 left-0 h-full w-2/3 sm:w-1/3 bg-[var(--color-bg-card)] flex flex-col p-6 gap-5 z-2">
						<NavLink
							to="/home"
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

						{/* Mobile Drawer Icons */}
						<div className="flex flex-col gap-4 mt-6">
							<NavLink
								to="/wishlist"
								onClick={() => setMenuOpen(false)}
								className="flex items-center gap-3 cursor-pointer hover:text-[var(--color-primary)]">
								<Heart size={18} />
								<span>Wishlist</span>
							</NavLink>
							<NavLink
								to="/cart"
								onClick={() => setMenuOpen(false)}
								className="flex items-center gap-3 cursor-pointer hover:text-[var(--color-primary)]">
								<ShoppingCart size={18} />
								<span>Cart</span>
							</NavLink>
							<div className="flex items-center gap-3 cursor-pointer hover:text-[var(--color-primary)]">
								<User size={18} />
								<span>Account</span>
							</div>
							<button
								type="button"
								onClick={() => setDarkMode(!darkMode)}
								className="flex items-center gap-3 cursor-pointer">
								<AnimatePresence>
									{darkMode ? (
										<motion.div
											key="sun-mobile"
											initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
											animate={{ rotate: 0, opacity: 1, scale: 1 }}
											exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
											transition={{
												duration: 0.4,
												scale: {
													type: "spring",
													visualDuration: 0.4,
													stiffness: 300,
													damping: 20,
													bounce: 0.5,
												},
											}}>
											<div className="flex items-center gap-2">
												<Sun size={18} className="text-yellow-500" />
												<span>Light</span>
											</div>
										</motion.div>
									) : (
										<motion.div
											key="moon-mobile"
											initial={{ rotate: 100, opacity: 0, scale: 0.5 }}
											animate={{ rotate: 0, opacity: 1, scale: 1 }}
											exit={{ rotate: -100, opacity: 0, scale: 0.5 }}
											transition={{
												duration: 0.4,
												scale: {
													type: "spring",
													visualDuration: 0.4,
													stiffness: 300,
													damping: 20,
													bounce: 0.5,
												},
											}}>
											<div className="flex items-center gap-2">
												<Moon size={18} className="text-indigo-400" />
												<span>Dark</span>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
