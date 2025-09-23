import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
	type: "button" | "submit" | "reset";
}

const BouncyButton = ({
	children,
	onClick,
	className = "",
	type = "button",
}: ButtonProps) => {
	return (
		<motion.button
			type={type}
			onClick={onClick}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.95 }}
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{
				duration: 0.4,
				scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
			}}
			className={`px-5 py-2 rounded-lg text-[var(--color-text-primary)] font-semibold cursor-pointer ${className}`}>
			{children}
		</motion.button>
	);
};

export default BouncyButton;
