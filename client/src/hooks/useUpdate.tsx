import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { AxiosError } from "axios";
import { toast } from "sonner";

type AxiosResponse<T> = {
	message?: string;
	error?: string;
	data?: T;
};

type UpdateDataProps = {
	productId: string;
	formData: {
		name?: string;
		description?: string;
		category?: string;
		sku?: string;
		price?: number;
		imageUrl?: string;
	};
};

const useUpdate = <T,>(endpoint: string, invalidateKeys: string[]) => {
	const queryClient = useQueryClient();

	return useMutation<
		AxiosResponse<T>,
		AxiosError<{ message: string }>,
		UpdateDataProps
	>({
		mutationFn: async ({ productId, formData }: UpdateDataProps) => {
			return await api.patch(`${endpoint}/${productId}`, formData);
		},
		onError: (error) => {
			toast.error(
				error.response?.data.message || error.message || "Update failed"
			);
		},
		onSuccess: (data) => {
			toast.success(data.message || "Updated Successfully");
			invalidateKeys.forEach((key) =>
				queryClient.invalidateQueries({ queryKey: [key] })
			);
		},
	});
};

export default useUpdate;
