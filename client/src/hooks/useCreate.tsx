import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import { toast } from "sonner";
import type { AxiosError, AxiosResponse } from "axios";

type CreateProps = {
	url: string;
	formData: {
		name: string;
		description: string;
		category: string;
		sku?: string;
		price: number;
		image: string;
	};
};

const useCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<
		AxiosResponse,
		AxiosError<{ message: string }>,
		CreateProps
	>({
		mutationFn: async ({ url, formData }: CreateProps) => {
			return await api.post(url, formData);
		},
		onError: (error) => {
			toast.error(
				error.response?.data.message ||
					error.message ||
					"Failed to create product"
			);
		},
		onSuccess: () => {
			toast("Product created successfully");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

export default useCreate;
