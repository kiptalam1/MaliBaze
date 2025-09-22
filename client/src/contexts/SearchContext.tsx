// in SearchContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface SearchContextType {
	productSearch: string;
	setProductSearch: (q: string) => void;
	categoryFilter: string;
	setCategoryFilter: (c: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
	undefined
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
	const [productSearch, setProductSearch] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("");

	return (
		<SearchContext.Provider
			value={{
				productSearch,
				setProductSearch,
				categoryFilter,
				setCategoryFilter,
			}}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => {
	const ctx = useContext(SearchContext);
	if (!ctx) {
		throw new Error("useSearch must be used within SearchProvider");
	}
	return ctx;
};
