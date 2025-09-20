import { Filter, Search } from "lucide-react";
import { useState } from "react";

const CategoryPageHeader = () => {
	const [isActive, setIsActive] = useState<boolean>(false);

	return (
		<div className="flex flex-col gap-3 items-center py-5 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-10 text-center">
			<h1 className="text-3xl sm:text-4xl font-semibold sm:font-bold">
				Shop By Category
			</h1>
			<p className="text-base sm:text-[18px] text-[var(--color-text-secondary)] break-words">
				Discover products organized by category to find exactly what you're
				looking for
			</p>

			{/* Search */}
			<div>
				<label htmlFor="search-categories" className="relative">
					<Search
						size={16}
						className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] z-1"
					/>
					<input
						type="text"
						id="search-categories"
						aria-label="search categories"
						placeholder="Search categories"
						className="h-8 w-60 sm:w-72 py-1 pl-8 pr-8 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] outline-none focus:ring-[var(--color-primary)] focus:ring-1 text-base"
						onFocus={() => setIsActive(true)}
						onBlur={(e) => setIsActive(e.target.value !== "")}
					/>
					<Filter
						size={18}
						className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ${
							isActive
								? "text-[var(--color-primary)]"
								: "text-[var(--color-text-secondary)]"
						}`}
					/>
				</label>
			</div>
		</div>
	);
};

export default CategoryPageHeader;
