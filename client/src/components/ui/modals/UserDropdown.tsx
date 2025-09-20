import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";

interface UserDropdownProps {
	isOpen: boolean;
	onClose: () => void;
}

const UserDropdown = ({ isOpen, onClose }: UserDropdownProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	// Close when clicking outside;
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={modalRef}
					className="absolute top-full right-0 mt-2 z-50"
					initial={{ opacity: 0, scale: 0.95, y: -8 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: -8 }}
					transition={{ duration: 0.15, ease: "easeOut" }}>
					<div className="flex flex-col w-40 h-auto max-h-48 text-sm border border-[var(--color-border)] p-2 bg-[var(--color-bg)] rounded-lg shadow-lg">
						<div className="w-full px-2 py-1 hover:bg-[var(--color-bg-card)] transition-colors duration-150 cursor-pointer">
							Sign In
						</div>
						<div className="w-full px-2 py-1 hover:bg-[var(--color-bg-card)] transition-colors duration-150 cursor-pointer">
							Sign Up
						</div>
						<div className="w-full px-2 py-1 hover:bg-[var(--color-bg-card)] transition-colors duration-150 cursor-pointer">
							My Orders
						</div>
						<div className="w-full px-2 py-1 hover:bg-[var(--color-bg-card)] transition-colors duration-150 cursor-pointer">
							Admin Panel
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default UserDropdown;
