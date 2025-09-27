import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "sonner";

interface UserModalProps {
	isOpen: boolean;
	onClose: () => void;
	onNavigate: (path: string) => void;
}

const UserModal = ({ isOpen, onClose, onNavigate }: UserModalProps) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const { user, logout } = useContext(AuthContext)!;
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		// overlay: clicking the overlay closes modal
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			// prefer pointerdown so touch devices close reliably
			onPointerDown={onClose}
			aria-modal="true"
			role="dialog">
			{/* backdrop (semi-transparent) - uses CSS variables where possible */}
			<div className="absolute inset-0 bg-black/45" aria-hidden />

			{/* modal content - stopPointer so clicks inside do not close */}
			<div
				ref={modalRef}
				onPointerDown={(e) => e.stopPropagation()}
				className="relative z-10 w-full max-w-xs mx-4 rounded-lg p-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-lg">
				<h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
					Account
				</h3>

				<div className="flex flex-col text-sm text-[var(--color-text-primary)]">
					<button
						type="button"
						onClick={() => {
							onClose();

							onNavigate(user ? "/" : "/auth/login");
						}}
						className="text-left w-full px-3 py-2 rounded hover:bg-[var(--color-bg)] cursor-pointer transition-colors">
						Sign In
					</button>

					<button
						type="button"
						onClick={() => {
							onClose();
							onNavigate(user ? "/" : "/auth/register");
						}}
						className="text-left w-full px-3 py-2 rounded hover:bg-[var(--color-bg)] cursor-pointer transition-colors">
						Sign Up
					</button>

					<button
						type="button"
						onClick={() => {
							onClose();
							onNavigate("/orders");
						}}
						className="text-left w-full px-3 py-2 rounded hover:bg-[var(--color-bg)] cursor-pointer transition-colors">
						My Orders
					</button>

					{user?.role === "admin" && (
						<button
							type="button"
							onClick={() => {
								onClose();
								onNavigate("/admin");
							}}
							className="text-left w-full px-3 py-2 rounded hover:bg-[var(--color-bg)] cursor-pointer transition-colors">
							Admin Panel
						</button>
					)}

					<button
						type="submit"
						onClick={async () => {
							try {
								await logout();
								onClose();
								onNavigate("/");
							} catch (error) {
								toast.error("Logout failed");
								console.error(error);
							}
						}}
						className="text-left w-full px-3 py-2 rounded hover:bg-[var(--color-error)] transition-colors">
						Logout
					</button>
				</div>

				<button
					type="button"
					aria-label="Close account modal"
					onClick={onClose}
					className="mt-3 text-sm w-full px-3 py-2 rounded bg-[var(--color-bg)] hover:bg-[var(--color-bg-card)] cursor-pointer transition-colors">
					Close
				</button>
			</div>
		</div>
	);
};

export default UserModal;
