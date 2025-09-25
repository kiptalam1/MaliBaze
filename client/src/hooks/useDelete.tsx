import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiResponse<T = unknown> {
	message?: string;
	error?: string;
	data?: T;
}

const useDelete = <T = unknown,>(
	endpoint: string,
	invalidateKeys?: string[]
) => {
	const queryClient = useQueryClient();

	return useMutation<ApiResponse<T>, AxiosError<ApiResponse<T>>, string>({
		mutationFn: async (id: string) => {
			const { data } = await api.delete<ApiResponse<T>>(`${endpoint}/${id}`);
			return data;
		},
		onSuccess: (data) => {
			if (data.message) {
				toast.success(data.message || "Deletion successful");
			}
			if (data.error) {
				toast.error(data.error);
			}

			invalidateKeys?.forEach((key) => {
				queryClient.invalidateQueries({ queryKey: [key] });
			});
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "Delete failed");
		},
	});
};

export default useDelete;
