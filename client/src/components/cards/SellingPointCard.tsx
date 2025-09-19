import { type ReactNode } from "react";

interface SellingPointProps {
	icon: ReactNode;
	heading: string;
	text: string;
}

const SellingPointCard = ({ icon, heading, text }: SellingPointProps) => {
	return (
		<div className="flex flex-col gap-3 items-center justify-center text-center break-words p-4">
			<div className="size-18 p-4 rounded-full bg-[var(--color-primary-lightest)] flex items-center justify-center">
				{icon}
			</div>
			<h2 className="text-sm font-semibold antialiased">{heading}</h2>
			<p className="text-sm text-[var(--color-text-secondary)] antialiased">
				{text}
			</p>
		</div>
	);
};

export default SellingPointCard;
