import type { ReactNode } from "react";

type OverviewCardProps = {
	title: string;
	icon: ReactNode;
	number: number;
	stats: string;
};

const OverviewCard = ({ title, icon, number, stats }: OverviewCardProps) => {
	return (
		<div className="w-full max-w-80 bg-[var(--color-bg-card)] px-4 py-6 rounded-lg">
			<div className="flex items-center gap-5 justify-between mb-5">
				<h3 className="text-sm">{title}</h3>
				{icon}
			</div>
			<div className="mt-8">
				<p className="font-bold text-lg">{number}</p>
				<span className="text-xs text-[var(--color-text-secondary)]">
					{stats}
				</span>
			</div>
		</div>
	);
};

export default OverviewCard;
