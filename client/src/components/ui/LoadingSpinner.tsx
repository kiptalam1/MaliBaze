import { LoaderPinwheel } from "lucide-react";

const LoadingSpinner = () => {
	return (
		<div className="w-full text-center py-10">
			<LoaderPinwheel
				size={32}
				className="animate-spin mx-auto text-[var(--color-primary)]"
			/>
		</div>
	);
};

export default LoadingSpinner;
