import { useNavigate } from "react-router-dom";
import BouncyButton from "../ui/BouncyButton";

const Header = () => {
	const navigate = useNavigate();
	return (
		<header className="w-full flex flex-col items-center justify-center gap-5 p-6 sm:p-10 bg-linear-to-r/oklab from-[var(--color-bg)] via-[var(--color-border)] to-[var(--color-bg-card)] text-[var(--color-text-primary)] text-center">
			<p
				className="bg-[var(--color-primary)] rounded-lg px-3 py-1 text-sm"
				role="status">
				New Collection Available
			</p>
			<h1 className="text-lg font-bold break-words sm:text-2xl md:text-3xl lg:text-5xl">
				Discover Amazing
				<br /> Products
			</h1>
			<p className="text-[var(--color-text-secondary)]text-base sm:text-lg break-words">
				Shop the latest trends and find everything you need in one place.Quality
				products, competitive prices, and exceptional service.
			</p>
			<div className="flex flex-col gap-5 sm:flex-row">
				<BouncyButton
					type="button"
					onClick={() => navigate("/categories")}
					className="bg-[var(--color-primary)]">
					Shop Now
				</BouncyButton>
				<BouncyButton
					type="button"
					onClick={() => navigate("/categories")}
					className="bg-[var(--color-bg-card)]">
					Browse Categories
				</BouncyButton>
			</div>
		</header>
	);
};

export default Header;
