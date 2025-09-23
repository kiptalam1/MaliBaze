import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { api } from "../utils/api.ts";

const useFetch = <T = unknown,>(url: string, queryKey?: string[]) => {
	// const queryClient = useQueryClient();
	const query = useQuery<T, AxiosError>({
		queryKey: Array.isArray(queryKey) ? queryKey : [queryKey ?? url],

		queryFn: async () => {
			const res = await api.get<T>(url);
			return res.data;
		},
	});

	// only fires when state changes, not on every render
	useEffect(() => {
		if (query.isError && query.error) {
			const err = query.error as AxiosError<{ message?: string }>;
			const backendMsg = err.response?.data?.message;
			toast.error(backendMsg || err.message || "Something went wrong");
		}
	}, [query.isError, query.error]);

	return query;
};
export default useFetch;
