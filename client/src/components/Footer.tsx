const Footer = () => {
	return (
		<footer className="bg-[var(--color-background-secondary)] text-sm text-[var(--color-text-secondary)] px-4 sm:px-6 lg:px-8 py-10">
			<div className="flex flex-col items-center text-center gap-4 max-w-4xl mx-auto">
				<h5 className="font-bold text-2xl text-[var(--color-text-primary)]">
					MaliBaze
				</h5>
				<p className="max-w-md leading-relaxed">
					Your trusted online shopping destination for quality products and
					exceptional service.
				</p>
			</div>

			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto text-center md:text-left">
				<div>
					<h5 className="font-semibold text-lg text-[var(--color-text-primary)] mb-4">
						Quick Links
					</h5>
					<ul className="space-y-2">
						<li>About Us</li>
						<li>Contact</li>
						<li>FAQ</li>
						<li>Shipping Info</li>
					</ul>
				</div>

				<div>
					<h5 className="font-semibold text-lg text-[var(--color-text-primary)] mb-4">
						Categories
					</h5>
					<ul className="space-y-2">
						<li>Electronics</li>
						<li>Fashion</li>
						<li>Home & Garden</li>
						<li>Sports</li>
					</ul>
				</div>

				<div>
					<h5 className="font-semibold text-lg text-[var(--color-text-primary)] mb-4">
						Customer
					</h5>
					<ul className="space-y-2">
						<li>My Account</li>
						<li>Order Tracking</li>
						<li>Returns</li>
						<li>Support</li>
					</ul>
				</div>
			</div>

			<div className="mt-10 text-center text-xs text-[var(--color-text-secondary)]">
				<p>© 2025 MaliBaze. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
