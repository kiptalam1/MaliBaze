import { Package, Eye, EyeOff } from "lucide-react";
import BouncyButton from "../ui/BouncyButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	return (
		<div className="flex flex-col gap-5 bg-[var(--color-bg-card)] shadow p-5 w-full max-w-md">
			<div className="flex flex-col items-center">
				<span className="flex items-center justify-center size-12 rounded-full bg-[var(--color-primary-lightest)] mb-5">
					<Package color="#06b6d4" />
				</span>
				<h1 className="text-2xl font-semibold">Welcome Back</h1>
				<p className="text-sm text-[var(--color-text-secondary)]">
					Sign in to your MaliBaze account
				</p>
			</div>
			<form className="flex flex-col gap-2">
				<div className="flex flex-col gap-0.5">
					<label htmlFor="email" className="text-sm">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						placeholder="Enter your email"
						className="w-full p-2 border border-[var(--color-border)] rounded-lg outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
					/>
				</div>

				<div className="flex flex-col gap-0.5">
					<label htmlFor="password" className="text-sm">
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Enter your password"
							className="w-full p-2 pr-10 border border-[var(--color-border)] rounded-lg outline-none focus:ring-1 focus:ring-[var(--color-primary)] "
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer">
							{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
						</button>
					</div>
				</div>

				<BouncyButton
					className="bg-[var(--color-primary)] mt-5"
					onClick={() => console.log("create account")}>
					Sign In
				</BouncyButton>
			</form>
			<div className="text-sm">
				Don't have an account?{" "}
				<span
					className="text-[var(--color-primary)] cursor-pointer"
					onClick={() => navigate("/auth/register")}>
					Sign Up
				</span>
			</div>
		</div>
	);
};

export default LoginForm;
