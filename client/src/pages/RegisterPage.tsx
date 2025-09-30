import RegisterForm from "../components/forms/RegisterForm";
import BouncyButton from "../components/ui/BouncyButton";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen w-full flex flex-col items-center p-4 sm:py-6 md:py-8 ">
			<div className="flex flex-col w-full max-w-md gap-6">
				<BouncyButton
					type="button"
					onClick={() => navigate("/")}
					className="flex gap-2 items-center hover:bg-[var(--color-primary-lightest)] hover:text-black w-max">
					<ArrowLeft />
					Back to Home
				</BouncyButton>
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
