import { Package } from "lucide-react";
import BouncyButton from "../ui/BouncyButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../utils/api";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const RegisterForm = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = (location.state as { from?: string })?.from || "/";
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast.error("Both passwords must match");
			return;
		}

		try {
			const response = await api.post("/auth/signup", {
				email: formData.email,
				name: formData.name,
				password: formData.password,
			});
			toast.success(response.data.message || "Account created successfully");
			navigate(from, { replace: true });
		} catch (error) {
			const err = error as AxiosError<{ message?: string }>;
			toast.error(
				err.response?.data.message ||
					err.message ||
					"Sign up failed. Try again later."
			);
		}
	};

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
			<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-0.5">
					<label htmlFor="username" className="text-sm">
						Enter your Name
					</label>
					<input
						id="username"
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
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
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
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
						type="text"
						name="password"
						value={formData.password}
						onChange={handleChange}
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
						type="text"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						placeholder="confirm your password"
						className="w-full p-2 border border-[var(--color-border)] rounded-lg outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
					/>
				</div>
				<BouncyButton type="submit" className="bg-[var(--color-primary)] mt-5">
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
