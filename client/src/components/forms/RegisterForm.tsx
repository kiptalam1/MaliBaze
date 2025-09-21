import { Package } from "lucide-react";
import BouncyButton from "../ui/BouncyButton";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-5 bg-[var(--color-bg-card)] shadow p-5 w-full max-w-md">
			<div className="flex flex-col items-center">
				<span className="flex items-center justify-center size-12 rounded-full bg-[var(--color-primary-lightest)] mb-5">
					<Package color="#06b6d4" />
				</span>
				<h1 className="text-2xl font-semibold">Create Account</h1>
				<p className="text-sm text-[var(--color-text-secondary)]">
					Join MaliBaze and start shopping today
				</p>
			</div>
			<form className="flex flex-col gap-2">
				<div className="flex flex-col gap-0.5">
					<label htmlFor="username" className="text-sm">
						Enter your Name
					</label>
					<input
						id="username"
						placeholder="John Doe"
						className="w-full p-2 border border-[var(--color-border)] rounded-lg outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
					/>
				</div>

				<div className="flex flex-col gap-0.5">
					<label htmlFor="email" className="text-sm">
						Email Address
					</label>
					<input
						id="email"
						placeholder="john@example.com"
						className="w-full p-2 border border-[var(--color-border)] rounded-lg outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
					/>
				</div>

				<div className="flex flex-col gap-0.5">
					<label htmlFor="password" className="text-sm">
						Password
					</label>
					<input
						id="password"
						placeholder="create a strong password"
						className="w-full p-2 border border-[var(--color-border)] rounded-lg outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
					/>
				</div>

				<div className="flex flex-col gap-0.5">
					<label htmlFor="confirmPassword" className="text-sm">
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						placeholder="confirm your password"
						className="w-full p-2 border border-[var(--color-border)] rounded-lg outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
					/>
				</div>
				<BouncyButton
					className="bg-[var(--color-primary)] mt-5"
					onClick={() => console.log("create account")}>
					Create Account
				</BouncyButton>
			</form>
			<div className="text-sm">
				Already have an account?{" "}
				<span
					className="text-[var(--color-primary)] cursor-pointer"
					onClick={() => navigate("/auth/login")}>
					Sign In
				</span>
			</div>
		</div>
	);
};

export default RegisterForm;
