import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const useFetch = <T = unknown,>(url: string, queryKey?: string) => {
	// const queryClient = useQueryClient();
	const query = useQuery<T, Error>({
		queryKey: [queryKey || url],
		queryFn: async () => {
			const res = await axios.get<T>(url);
			return res.data;
		},
	});

	// only fires when state changes, not on every render
	useEffect(() => {
		if (query.isError) {
			toast.error(query.error.message || "Something went wrong");
		}
	}, [query.isError, query.error]);

	return query;
};
export default useFetch;
